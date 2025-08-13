// Dogtor 颈椎治疗助手 - Service Worker
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

// 默认设置 - 统一状态管理
const DEFAULT_SETTINGS = {
  // 基础功能设置
  isEnabled: false,               // 插件是否启用（主开关）
  cycleDuration: 10 * 60 * 1000, // 10分钟
  rotationDuration: 30 * 1000,   // 30秒
  rotationAngle: 15,             // 15度
  showIndicator: true,

  // 运行时状态（现在统一存储在settings中）
  isActive: false,               // 定时器是否运行
  currentPhase: 'idle',          // 当前阶段: idle, left, right
  nextRotationTime: null,        // 下次旋转时间
  totalRotations: 0,             // 总旋转次数
  sessionStartTime: null,        // 会话开始时间
  activeTabId: null              // 当前活动标签页ID
};

// 遗留状态结构（仅用于兼容性，实际不再使用）
const _DEFAULT_STATE = {
  isActive: false,
  currentPhase: 'idle',
  nextRotationTime: null,
  totalRotations: 0,
  sessionStartTime: null,
  activeTabId: null
};

// 统一状态管理器
class StateManager {
  constructor() {
    this.settings = { ...DEFAULT_SETTINGS };
  }

  async initialize() {
    try {
      // 从存储中恢复设置（包含所有状态信息）
      const result = await chrome.storage.sync.get(['user_settings']);
      if (result.user_settings) {
        // 确保所有必需字段都存在，防止部分设置丢失
        this.settings = { ...DEFAULT_SETTINGS, ...result.user_settings };
        console.log('Settings loaded from storage:', this.settings);
      } else {
        console.log('No existing settings found, using defaults');
        // 首次使用，保存默认设置
        await this.saveSettings();
      }

      // 兼容性处理：从旧的local存储迁移状态到settings
      const localResult = await chrome.storage.local.get(['runtime_state']);
      if (localResult.runtime_state) {
        console.log('Migrating legacy state to unified settings...');
        const legacyState = localResult.runtime_state;

        // 将旧状态合并到settings中
        const migratedData = {
          isActive: legacyState.isActive || false,
          currentPhase: legacyState.currentPhase || 'idle',
          nextRotationTime: legacyState.nextRotationTime || null,
          totalRotations: legacyState.totalRotations || 0,
          sessionStartTime: legacyState.sessionStartTime || null,
          activeTabId: legacyState.activeTabId || null
        };

        this.settings = { ...this.settings, ...migratedData };

        // 保存迁移后的设置并清理旧存储
        await this.saveSettings();
        await chrome.storage.local.remove(['runtime_state']);
        console.log('Legacy state migration completed');
      }

      // 修复状态恢复逻辑：更加健壮的状态检查
      await this.validateAndRestoreState();

      console.log('StateManager initialized successfully:', this.settings);
    } catch (error) {
      console.error('Failed to initialize StateManager:', error);
      // 初始化失败时使用默认设置
      this.settings = { ...DEFAULT_SETTINGS };
    }
  }

  async validateAndRestoreState() {
    try {
      // 检查当前Chrome alarms状态
      const existingAlarms = await chrome.alarms.getAll();
      const rotationAlarm = existingAlarms.find(alarm => alarm.name === 'rotationCycle');
      
      console.log('Existing alarms:', existingAlarms.map(a => ({ name: a.name, scheduledTime: a.scheduledTime })));
      
      if (this.settings.isEnabled && this.settings.isActive) {
        if (rotationAlarm) {
          // 如果定时器存在，验证时间是否一致
          const alarmTime = rotationAlarm.scheduledTime;
          const settingsTime = this.settings.nextRotationTime;
          
          if (settingsTime && Math.abs(alarmTime - settingsTime) < 60000) {
            // 时间差小于1分钟，认为是一致的
            console.log('Rotation timer is consistent, keeping current state');
            return;
          } else {
            console.log('Timer time mismatch, restarting timer');
            await this.restoreRotationTimer();
          }
        } else {
          // 设置说定时器应该运行，但实际没有定时器，重新启动
          console.log('Settings indicate active timer but no alarm found, restarting');
          await this.restoreRotationTimer();
        }
      } else if (rotationAlarm) {
        // 设置说定时器不应该运行，但实际有定时器，清除它
        console.log('Unexpected alarm found, clearing it');
        await chrome.alarms.clear('rotationCycle');
        this.settings.isActive = false;
        this.settings.nextRotationTime = null;
        await this.saveSettings();
      } else {
        // 状态一致：设置说不运行，实际也没有定时器
        console.log('State is consistent: timer not active');
      }
    } catch (error) {
      console.error('Failed to validate state:', error);
      // 验证失败时重置为安全状态
      this.settings.isActive = false;
      this.settings.nextRotationTime = null;
      await this.saveSettings();
    }
  }

  async restoreRotationTimer() {
    try {
      const now = Date.now();

      if (this.settings.nextRotationTime && this.settings.nextRotationTime > now) {
        // 如果下次旋转时间还未到，恢复定时器
        const remainingTime = this.settings.nextRotationTime - now;
        const delayInMinutes = remainingTime / (1000 * 60);
        await chrome.alarms.create('rotationCycle', {
          delayInMinutes: Math.max(0.1, delayInMinutes), // 至少0.1分钟
          periodInMinutes: this.settings.cycleDuration / (1000 * 60)
        });
        console.log(`Timer restored, next rotation in ${Math.ceil(delayInMinutes)} minutes`);
      } else {
        // 如果时间已过或无效，立即开始新的周期
        const delayInMinutes = this.settings.cycleDuration / (1000 * 60);
        await chrome.alarms.create('rotationCycle', {
          delayInMinutes: delayInMinutes,
          periodInMinutes: delayInMinutes
        });
        this.settings.nextRotationTime = now + this.settings.cycleDuration;
        await this.saveSettings();
        console.log(`New timer cycle started, next rotation in ${delayInMinutes} minutes`);
      }
    } catch (error) {
      console.error('Failed to restore rotation timer:', error);
    }
  }

  async updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    await this.saveSettings();
    console.log('Settings updated:', this.settings);
  }

  // 静默更新设置（不触发日志，用于频繁更新的字段如activeTabId）
  async updateSettingsQuietly(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    // 只在内存中更新，不立即保存到存储（减少I/O）
    // 对于activeTabId这种非关键字段，可以延迟保存
  }

  // 保存关键设置（用于重要变更）
  async saveSettingsIfNeeded() {
    // 定期保存或在关键时刻保存
    return await this.saveSettings();
  }

  async saveSettings() {
    const maxRetries = 3;
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // 创建设置的深拷贝，确保数据完整性
        const settingsToSave = JSON.parse(JSON.stringify(this.settings));
        
        // 添加时间戳用于调试
        settingsToSave._lastSaved = Date.now();
        
        await chrome.storage.sync.set({ user_settings: settingsToSave });
        
        // 验证保存是否成功
        const verification = await chrome.storage.sync.get(['user_settings']);
        if (verification.user_settings && verification.user_settings._lastSaved === settingsToSave._lastSaved) {
          console.log(`Settings saved successfully on attempt ${attempt}`);
          return true;
        } else {
          throw new Error('Settings verification failed after save');
        }
      } catch (error) {
        lastError = error;
        console.warn(`Save attempt ${attempt}/${maxRetries} failed:`, error.message);
        
        if (attempt < maxRetries) {
          // 等待后重试
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    console.error('Failed to save settings after all retries:', lastError);
    return false;
  }

  // 兼容性方法：保持旧的 updateState 接口，但实际更新到 settings
  async updateState(newState) {
    console.warn('updateState is deprecated, use updateSettings instead');
    this.settings = { ...this.settings, ...newState };
    await this.saveSettings();
    console.log('State updated (via settings):', newState);
  }

  getSettings() {
    return { ...this.settings };
  }

  // 兼容性方法：从统一的 settings 中提取状态信息
  getState() {
    return {
      isActive: this.settings.isActive,
      currentPhase: this.settings.currentPhase,
      nextRotationTime: this.settings.nextRotationTime,
      totalRotations: this.settings.totalRotations,
      sessionStartTime: this.settings.sessionStartTime,
      activeTabId: this.settings.activeTabId
    };
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

      // 更新统一设置（包含状态信息）
      const nextRotationTime = Date.now() + settings.cycleDuration;
      await this.stateManager.updateSettings({
        isEnabled: true,                    // 确保插件启用
        isActive: true,                     // 定时器运行中
        nextRotationTime: nextRotationTime, // 下次旋转时间
        sessionStartTime: Date.now(),       // 会话开始时间
        currentPhase: 'idle'                // 重置阶段
      });
      
      // 确保设置已保存
      const saveResult = await this.stateManager.saveSettings();
      if (!saveResult) {
        console.warn('Failed to save settings after starting rotation cycle');
      }

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

      // 更新统一设置
      await this.stateManager.updateSettings({
        isEnabled: false,           // 插件禁用
        isActive: false,           // 定时器停止
        currentPhase: 'idle',      // 重置阶段
        nextRotationTime: null     // 清空下次旋转时间
      });
      
      // 确保设置已保存
      const saveResult = await this.stateManager.saveSettings();
      if (!saveResult) {
        console.warn('Failed to save settings after stopping rotation cycle');
      }

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
    // 如果有额外设置，先应用
    if (payload && payload.settings) {
      await this.stateManager.updateSettings(payload.settings);
    }

    // 启动旋转周期（会自动设置 isEnabled: true）
    return await this.timerManager.startRotationCycle();
  }

  async handleStopRotation() {
    // 停止旋转周期（会自动设置 isEnabled: false）
    return await this.timerManager.stopRotationCycle();
  }

  async handleGetState() {
    const settings = this.stateManager.getSettings();
    return {
      success: true,
      state: this.stateManager.getState(),  // 兼容性：提取状态信息
      settings: settings                    // 完整设置信息
    };
  }

  async handleSettingsChanged(newSettings) {
    const currentSettings = this.stateManager.getSettings();
    await this.stateManager.updateSettings(newSettings);

    // 强制保存设置
    const saveResult = await this.stateManager.saveSettings();
    if (!saveResult) {
      throw new Error('Failed to save settings to storage');
    }

    // 如果正在运行，重启定时器以应用新设置
    if (currentSettings.isActive && newSettings.isEnabled !== false) {
      console.log('Restarting rotation cycle with new settings');
      await chrome.alarms.clear('rotationCycle');

      const nextRotationTime = Date.now() + (newSettings.cycleDuration || currentSettings.cycleDuration);
      await this.stateManager.updateSettings({ nextRotationTime });

      return await this.timerManager.startRotationCycle();
    } else if (newSettings.isEnabled === false) {
      // 如果设置中禁用了插件，停止定时器
      return await this.timerManager.stopRotationCycle();
    }

    return { success: true };
  }
}

// 初始化全局实例
const stateManager = new StateManager();
const timerManager = new TimerManager(stateManager);
const messageHandler = new MessageHandler(stateManager, timerManager);

// 定期保存非关键设置变更（如activeTabId）
setInterval(async () => {
  try {
    const saveResult = await stateManager.saveSettings();
    if (saveResult) {
      console.log('Periodic settings save completed');
    } else {
      console.warn('Periodic settings save failed');
    }
  } catch (error) {
    console.error('Periodic save failed:', error);
  }
}, 30000);

// 在关键时刻强制保存设置
chrome.runtime.onSuspend?.addListener(async () => {
  console.log('Service worker suspending, saving settings...');
  try {
    await stateManager.saveSettings();
  } catch (error) {
    console.error('Failed to save settings on suspend:', error);
  }
});

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

// 页面兼容性检测
class PageCompatibilityChecker {
  static isSpecialPage(url) {
    const specialProtocols = ['chrome:', 'chrome-extension:', 'moz-extension:', 'edge:', 'about:'];
    const specialPages = ['chrome://newtab/', 'chrome://extensions/', 'chrome://settings/'];

    return specialProtocols.some(protocol => url.startsWith(protocol)) ||
           specialPages.some(page => url.includes(page));
  }

  static async checkTabCompatibility(tabId, retryOnLoading = false) {
    try {
      const tab = await chrome.tabs.get(tabId);
      if (!tab) {
        return { compatible: false, reason: 'Tab not found', tabId };
      }

      // 检查URL是否可访问
      if (!tab.url) {
        console.warn(`Tab ${tabId} has no URL (loading or restricted page)`);
        return { compatible: false, reason: 'Tab URL not accessible', tabId, status: tab.status };
      }

      // 检查标签页状态
      if (tab.status !== 'complete') {
        console.log(`Tab ${tabId} is still loading (status: ${tab.status})`);

        // 如果启用重试且页面正在加载，等待一下再检查一次
        if (retryOnLoading && tab.status === 'loading') {
          console.log(`Retrying tab ${tabId} compatibility check in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));

          try {
            const retryTab = await chrome.tabs.get(tabId);
            if (retryTab && retryTab.url && retryTab.status === 'complete') {
              console.log(`Tab ${tabId} loaded successfully on retry`);
              if (this.isSpecialPage(retryTab.url)) {
                return { compatible: false, reason: 'Special page not supported', tabId, url: retryTab.url };
              }
              return { compatible: true, tabId, url: retryTab.url, status: retryTab.status };
            }
          } catch (retryError) {
            console.warn(`Retry failed for tab ${tabId}:`, retryError.message);
          }
        }

        return { compatible: false, reason: 'Tab still loading', tabId, status: tab.status, url: tab.url };
      }

      // 检查是否为特殊页面
      if (this.isSpecialPage(tab.url)) {
        return { compatible: false, reason: 'Special page not supported', tabId, url: tab.url };
      }

      return { compatible: true, tabId, url: tab.url, status: tab.status };
    } catch (error) {
      console.error(`Error checking tab ${tabId} compatibility:`, error);
      return { compatible: false, reason: 'Tab access error', tabId, error: error.message };
    }
  }
}

// Content Script 连接管理器
class ContentScriptManager {
  static async checkContentScriptInjected(tabId) {
    try {
      const response = await chrome.tabs.sendMessage(tabId, {
        type: 'PING',
        timestamp: Date.now()
      });
      return response && response.success;
    } catch (error) {
      console.log('Content script not responding:', error.message);
      return false;
    }
  }

  static async injectContentScript(tabId) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content/content-script.js']
      });
      console.log('Content script injected successfully for tab:', tabId);
      return true;
    } catch (error) {
      console.error('Failed to inject content script:', error);
      return false;
    }
  }

  static async sendMessageWithRetry(tabId, message, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Sending message to tab ${tabId}, attempt ${attempt}:`, message.type);

        const response = await chrome.tabs.sendMessage(tabId, message);
        console.log('Message sent successfully:', response);
        return response;
      } catch (error) {
        console.warn(`Message sending failed (attempt ${attempt}/${maxRetries}):`, error.message);

        if (attempt < maxRetries) {
          // 检查是否需要重新注入Content Script
          if (error.message.includes('Could not establish connection')) {
            console.log('Attempting to re-inject content script...');
            const injected = await this.injectContentScript(tabId);
            if (injected) {
              // 等待一下让Content Script初始化
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          } else {
            // 其他错误，等待后重试
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } else {
          throw error;
        }
      }
    }
  }
}

// 定时器触发事件
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'rotationCycle') {
    console.log('Rotation alarm triggered');

    let activeTab = null;

    try {
      // 获取当前活动标签页
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs.length === 0) {
        console.log('No active tab found, skipping rotation');
        return;
      }

      activeTab = tabs[0];
      const settings = stateManager.getSettings();

      // 检查页面兼容性（启用重试以处理加载中的页面）
      const compatibility = await PageCompatibilityChecker.checkTabCompatibility(activeTab.id, true);
      if (!compatibility.compatible) {
        console.log(`Tab ${activeTab.id} not compatible for rotation:`, {
          reason: compatibility.reason,
          url: compatibility.url || 'undefined',
          status: compatibility.status || 'unknown',
          tabTitle: activeTab.title || 'unknown'
        });

        // 如果是加载中的页面，记录更详细信息以便调试
        if (compatibility.reason === 'Tab still loading' || compatibility.reason === 'Tab URL not accessible') {
          console.log(`Tab ${activeTab.id} detailed info:`, {
            url: activeTab.url,
            title: activeTab.title,
            status: activeTab.status,
            windowId: activeTab.windowId,
            incognito: activeTab.incognito
          });
        }
        return;
      }

      // 静默更新活动标签页ID，不影响倒计时
      await stateManager.updateSettingsQuietly({ activeTabId: activeTab.id });

      // 检查Content Script是否已注入
      const isInjected = await ContentScriptManager.checkContentScriptInjected(activeTab.id);
      if (!isInjected) {
        console.log('Content script not detected, attempting injection...');
        const injected = await ContentScriptManager.injectContentScript(activeTab.id);
        if (!injected) {
          console.error('Failed to inject content script, skipping rotation');
          return;
        }
        // 等待Content Script初始化
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

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

      const response = await ContentScriptManager.sendMessageWithRetry(activeTab.id, message);

      if (response && response.success) {
        // 更新统计数据和下次旋转时间
        const currentSettings = stateManager.getSettings();
        await stateManager.updateSettings({
          totalRotations: currentSettings.totalRotations + 1,
          nextRotationTime: Date.now() + settings.cycleDuration
        });
        console.log('Rotation sequence completed successfully for tab:', activeTab.id);
      } else {
        console.warn('Rotation sequence failed or returned error:', response);
      }

    } catch (error) {
      console.error('Failed to execute rotation sequence:', error);

      // 记录详细错误信息
      const errorDetails = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        tabId: activeTab ? activeTab.id : null,
        tabUrl: activeTab ? activeTab.url : null
      };
      console.error('Detailed error information:', errorDetails);
    }
  }
});

// 标签页更新监听（用于状态同步）
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const settings = stateManager.getSettings();
  if (settings.isActive) {
    // 使用静默更新，不触发日志和存储保存，避免影响倒计时
    await stateManager.updateSettingsQuietly({ activeTabId: activeInfo.tabId });
    console.log(`Tab switched to: ${activeInfo.tabId} (rotation timer continues)`);
  }
});

console.log('Dogtor Extension Service Worker loaded');
