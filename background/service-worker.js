// 颈椎治疗浏览器插件 - Service Worker
// 负责定时器管理、状态协调、消息路由和数据持久化

// 消息类型常量
const MessageTypes = {
  START_ROTATION: 'start_rotation',
  STOP_ROTATION: 'stop_rotation',
  EXECUTE_SEQUENCE: 'execute_sequence',
  UPDATE_STATUS: 'update_status',
  GET_STATE: 'get_state',
  SETTINGS_CHANGED: 'settings_changed'
};

// 默认设置
const DEFAULT_SETTINGS = {
  isEnabled: false,
  cycleDuration: 10 * 60 * 1000, // 10分钟
  rotationDuration: 30 * 1000,   // 30秒
  rotationAngle: 15,             // 15度
  showIndicator: true
};

// 默认运行状态
const DEFAULT_STATE = {
  isActive: false,
  currentPhase: 'idle', // idle, left, right
  nextRotationTime: null,
  totalRotations: 0,
  sessionStartTime: null,
  activeTabId: null
};

// 全局状态管理
class StateManager {
  constructor() {
    this.state = { ...DEFAULT_STATE };
    this.settings = { ...DEFAULT_SETTINGS };
  }

  async initialize() {
    try {
      // 从存储中恢复设置和状态
      const result = await chrome.storage.sync.get(['user_settings']);
      if (result.user_settings) {
        this.settings = { ...DEFAULT_SETTINGS, ...result.user_settings };
      }

      const localResult = await chrome.storage.local.get(['runtime_state']);
      if (localResult.runtime_state) {
        this.state = { ...DEFAULT_STATE, ...localResult.runtime_state };
      }

      console.log('StateManager initialized:', { settings: this.settings, state: this.state });
    } catch (error) {
      console.error('Failed to initialize StateManager:', error);
    }
  }

  async updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    await chrome.storage.sync.set({ user_settings: this.settings });
    console.log('Settings updated:', this.settings);
  }

  async updateState(newState) {
    this.state = { ...this.state, ...newState };
    await chrome.storage.local.set({ runtime_state: this.state });
    console.log('State updated:', this.state);
  }

  getSettings() {
    return { ...this.settings };
  }

  getState() {
    return { ...this.state };
  }
}

// 定时器管理
class TimerManager {
  constructor(stateManager) {
    this.stateManager = stateManager;
    this.alarmName = 'rotationCycle';
  }

  async startRotationCycle() {
    try {
      const settings = this.stateManager.getSettings();

      // 清除现有定时器
      await chrome.alarms.clear(this.alarmName);

      // 创建新的定时器
      const delayInMinutes = settings.cycleDuration / (1000 * 60);
      await chrome.alarms.create(this.alarmName, {
        delayInMinutes: delayInMinutes,
        periodInMinutes: delayInMinutes
      });

      // 更新状态
      const nextRotationTime = Date.now() + settings.cycleDuration;
      await this.stateManager.updateState({
        isActive: true,
        nextRotationTime: nextRotationTime,
        sessionStartTime: Date.now()
      });

      console.log(`Rotation cycle started, next rotation in ${delayInMinutes} minutes`);
      return { success: true, nextRotationTime };
    } catch (error) {
      console.error('Failed to start rotation cycle:', error);
      return { success: false, error: error.message };
    }
  }

  async stopRotationCycle() {
    try {
      await chrome.alarms.clear(this.alarmName);
      await this.stateManager.updateState({
        isActive: false,
        currentPhase: 'idle',
        nextRotationTime: null
      });

      console.log('Rotation cycle stopped');
      return { success: true };
    } catch (error) {
      console.error('Failed to stop rotation cycle:', error);
      return { success: false, error: error.message };
    }
  }
}

// 消息处理器
class MessageHandler {
  constructor(stateManager, timerManager) {
    this.stateManager = stateManager;
    this.timerManager = timerManager;
  }

  async handleMessage(message, _sender, _sendResponse) {
    console.log('Received message:', message.type, message);

    try {
      switch (message.type) {
      case MessageTypes.START_ROTATION:
        return await this.handleStartRotation(message.payload);

      case MessageTypes.STOP_ROTATION:
        return await this.handleStopRotation();

      case MessageTypes.GET_STATE:
        return await this.handleGetState();

      case MessageTypes.SETTINGS_CHANGED:
        return await this.handleSettingsChanged(message.payload);

      default:
        console.warn('Unknown message type:', message.type);
        return { success: false, error: 'Unknown message type' };
      }
    } catch (error) {
      console.error('Error handling message:', error);
      return { success: false, error: error.message };
    }
  }

  async handleStartRotation(payload) {
    if (payload && payload.settings) {
      await this.stateManager.updateSettings(payload.settings);
    }
    return await this.timerManager.startRotationCycle();
  }

  async handleStopRotation() {
    return await this.timerManager.stopRotationCycle();
  }

  async handleGetState() {
    return {
      success: true,
      state: this.stateManager.getState(),
      settings: this.stateManager.getSettings()
    };
  }

  async handleSettingsChanged(newSettings) {
    await this.stateManager.updateSettings(newSettings);

    // 如果正在运行，重启定时器以应用新设置
    const state = this.stateManager.getState();
    if (state.isActive) {
      await this.timerManager.stopRotationCycle();
      return await this.timerManager.startRotationCycle();
    }

    return { success: true };
  }
}

// 初始化全局实例
const stateManager = new StateManager();
const timerManager = new TimerManager(stateManager);
const messageHandler = new MessageHandler(stateManager, timerManager);

// Service Worker 事件监听器

// 扩展安装/启动时初始化
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Extension installed/updated:', details.reason);
  await stateManager.initialize();

  if (details.reason === 'install') {
    console.log('First time installation, setting up defaults');
  }
});

// Service Worker 启动时初始化
chrome.runtime.onStartup.addListener(async () => {
  console.log('Service Worker started');
  await stateManager.initialize();
});

// 监听来自其他组件的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 异步处理消息
  messageHandler.handleMessage(message, sender, sendResponse)
    .then(response => {
      sendResponse(response);
    })
    .catch(error => {
      console.error('Message handling error:', error);
      sendResponse({ success: false, error: error.message });
    });

  // 返回 true 表示异步响应
  return true;
});

// 定时器触发事件
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'rotationCycle') {
    console.log('Rotation alarm triggered');

    try {
      // 获取当前活动标签页
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs.length === 0) {
        console.log('No active tab found, skipping rotation');
        return;
      }

      const activeTab = tabs[0];
      const settings = stateManager.getSettings();

      // 更新活动标签页ID
      await stateManager.updateState({ activeTabId: activeTab.id });

      // 向Content Script发送执行旋转序列的消息
      const message = {
        type: MessageTypes.EXECUTE_SEQUENCE,
        payload: {
          angle: settings.rotationAngle,
          duration: settings.rotationDuration,
          showIndicator: settings.showIndicator
        },
        timestamp: Date.now()
      };

      await chrome.tabs.sendMessage(activeTab.id, message);

      // 更新统计数据
      const currentState = stateManager.getState();
      await stateManager.updateState({
        totalRotations: currentState.totalRotations + 1,
        nextRotationTime: Date.now() + settings.cycleDuration
      });

      console.log('Rotation sequence initiated for tab:', activeTab.id);
    } catch (error) {
      console.error('Failed to execute rotation sequence:', error);
    }
  }
});

// 标签页更新监听（用于状态同步）
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const state = stateManager.getState();
  if (state.isActive) {
    await stateManager.updateState({ activeTabId: activeInfo.tabId });
  }
});

console.log('Neck Therapy Extension Service Worker loaded');
