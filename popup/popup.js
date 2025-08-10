// 颈椎治疗助手 - Popup交互逻辑

// 消息类型常量
const MessageTypes = {
  START_ROTATION: 'start_rotation',
  STOP_ROTATION: 'stop_rotation',
  EXECUTE_SEQUENCE: 'execute_sequence',
  UPDATE_STATUS: 'update_status',
  GET_STATE: 'get_state',
  SETTINGS_CHANGED: 'settings_changed'
};

// DOM元素引用
const elements = {
  enableSwitch: document.getElementById('enableSwitch'),
  angleSlider: document.getElementById('angleSlider'),
  angleValue: document.getElementById('angleValue'),
  angleLine: document.getElementById('angleLine'),
  frequencySlider: document.getElementById('frequencySlider'),
  frequencyValue: document.getElementById('frequencyValue'),
  statusSection: document.getElementById('statusSection'),
  statusText: document.getElementById('statusText')
};

// 应用状态
let appState = {
  isEnabled: false,
  rotationAngle: 15,
  cycleDuration: 10, // 分钟
  isActive: false,
  nextRotationTime: null
};

// 初始化应用
class PopupApp {
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.loadState();
    this.startStatusUpdater();
  }

  initializeElements() {
    // 设置初始值
    elements.angleSlider.value = appState.rotationAngle;
    elements.angleValue.textContent = `${appState.rotationAngle}°`;
    elements.frequencySlider.value = appState.cycleDuration;
    elements.frequencyValue.textContent = appState.cycleDuration;

    // 更新角度线
    this.updateAngleLine(appState.rotationAngle);
  }

  bindEvents() {
    // 开关切换事件
    elements.enableSwitch.addEventListener('change', (e) => {
      this.handleToggleChange(e.target.checked);
    });

    // 角度滑块事件
    elements.angleSlider.addEventListener('input', (e) => {
      const angle = parseInt(e.target.value);
      this.handleAngleChange(angle);
    });

    // 频率滑块事件
    elements.frequencySlider.addEventListener('input', (e) => {
      const frequency = parseInt(e.target.value);
      this.handleFrequencyChange(frequency);
    });
  }

  async loadState() {
    try {
      const response = await this.sendMessage({ type: MessageTypes.GET_STATE });

      if (response && response.success) {
        const { state, settings } = response;

        // 更新应用状态
        appState = {
          isEnabled: settings.isEnabled || false,
          rotationAngle: settings.rotationAngle || 15,
          cycleDuration: Math.round((settings.cycleDuration || 600000) / 60000), // 转换为分钟
          isActive: state.isActive || false,
          nextRotationTime: state.nextRotationTime
        };

        // 静默更新UI（不触发动画）
        this.updateUIWithoutAnimation();
        console.log('State loaded:', appState);
      }
    } catch (error) {
      console.error('Failed to load state:', error);
      this.showError('加载设置失败');
    }
  }

  updateUI() {
    // 更新开关
    elements.enableSwitch.checked = appState.isEnabled;

    // 更新角度
    elements.angleSlider.value = appState.rotationAngle;
    elements.angleValue.textContent = `${appState.rotationAngle}°`;
    this.updateAngleLine(appState.rotationAngle);

    // 更新频率
    elements.frequencySlider.value = appState.cycleDuration;
    elements.frequencyValue.textContent = appState.cycleDuration;

    // 更新状态显示
    this.updateStatusDisplay();
  }

  updateUIWithoutAnimation() {
    // 临时禁用CSS过渡动画
    const switchElement = elements.enableSwitch;
    const originalTransition = switchElement.style.transition;
    switchElement.style.transition = 'none';
    
    // 更新开关状态（无动画）
    switchElement.checked = appState.isEnabled;
    
    // 强制重绘
    switchElement.offsetHeight;
    
    // 恢复CSS过渡动画
    setTimeout(() => {
      switchElement.style.transition = originalTransition;
    }, 0);
    
    // 更新其他UI元素
    elements.angleSlider.value = appState.rotationAngle;
    elements.angleValue.textContent = `${appState.rotationAngle}°`;
    this.updateAngleLine(appState.rotationAngle);
    
    elements.frequencySlider.value = appState.cycleDuration;
    elements.frequencyValue.textContent = appState.cycleDuration;
    
    // 更新状态显示
    this.updateStatusDisplay();
  }

  updateAngleLine(angle) {
    // 计算角度线的位置
    const radian = (angle * Math.PI) / 180;
    const x = 96 + 70 * Math.cos(Math.PI - radian);
    const y = 80 - 70 * Math.sin(Math.PI - radian);

    elements.angleLine.setAttribute('x2', x);
    elements.angleLine.setAttribute('y2', y);
  }

  async handleToggleChange(enabled) {
    try {
      if (enabled) {
        // 启动旋转
        const settings = {
          isEnabled: true,
          rotationAngle: appState.rotationAngle,
          cycleDuration: appState.cycleDuration * 60000, // 转换为毫秒
          rotationDuration: 30000, // 30秒
          showIndicator: true
        };

        const response = await this.sendMessage({
          type: MessageTypes.START_ROTATION,
          payload: { settings }
        });

        if (response && response.success) {
          appState.isEnabled = true;
          appState.isActive = true;
          appState.nextRotationTime = response.nextRotationTime;
          this.updateStatusDisplay();
          console.log('Rotation started successfully');
        } else {
          throw new Error(response?.error || '启动失败');
        }
      } else {
        // 停止旋转
        const response = await this.sendMessage({
          type: MessageTypes.STOP_ROTATION
        });

        if (response && response.success) {
          appState.isEnabled = false;
          appState.isActive = false;
          appState.nextRotationTime = null;
          this.updateStatusDisplay();
          console.log('Rotation stopped successfully');
        } else {
          throw new Error(response?.error || '停止失败');
        }
      }
    } catch (error) {
      console.error('Toggle change failed:', error);
      this.showError(error.message);
      // 回滚开关状态
      elements.enableSwitch.checked = !enabled;
      appState.isEnabled = !enabled;
      // 重新加载状态以确保同步
      setTimeout(() => this.loadState(), 100);
    }
  }

  async handleAngleChange(angle) {
    appState.rotationAngle = angle;
    elements.angleValue.textContent = `${angle}°`;
    this.updateAngleLine(angle);

    // 如果正在运行，更新设置
    if (appState.isEnabled) {
      await this.updateSettings();
    }
  }

  async handleFrequencyChange(frequency) {
    appState.cycleDuration = frequency;
    elements.frequencyValue.textContent = frequency;

    // 如果正在运行，更新设置
    if (appState.isEnabled) {
      await this.updateSettings();
    }
  }

  async updateSettings() {
    try {
      const settings = {
        isEnabled: appState.isEnabled,
        rotationAngle: appState.rotationAngle,
        cycleDuration: appState.cycleDuration * 60000,
        rotationDuration: 30000,
        showIndicator: true
      };

      const response = await this.sendMessage({
        type: MessageTypes.SETTINGS_CHANGED,
        payload: settings
      });

      if (response && response.success) {
        if (response.nextRotationTime) {
          appState.nextRotationTime = response.nextRotationTime;
          this.updateStatusDisplay();
        }
        console.log('Settings updated successfully');
        // 显示成功提示
        this.showSuccess('设置已保存');
      } else {
        throw new Error(response?.error || '设置更新失败');
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
      this.showError('设置更新失败');
      // 重新加载状态以确保同步
      setTimeout(() => this.loadState(), 100);
    }
  }

  updateStatusDisplay() {
    if (appState.isEnabled && appState.isActive && appState.nextRotationTime) {
      const now = Date.now();
      const timeRemaining = appState.nextRotationTime - now;

      if (timeRemaining > 0) {
        const minutes = Math.ceil(timeRemaining / 60000);
        elements.statusText.textContent = `下次提醒: ${minutes}分钟后`;
        elements.statusSection.style.display = 'block';

        // 添加活动状态指示器
        const indicator = elements.statusSection.querySelector('.status-indicator');
        if (indicator) {
          indicator.classList.add('active');
        }
      } else {
        elements.statusText.textContent = '即将开始下次提醒...';
        elements.statusSection.style.display = 'block';
      }
    } else {
      elements.statusSection.style.display = 'none';
    }
  }

  startStatusUpdater() {
    // 每30秒更新一次状态
    setInterval(() => {
      if (appState.isEnabled && appState.isActive) {
        this.updateStatusDisplay();
      }
    }, 30000);

    // 每5分钟重新加载状态
    setInterval(() => {
      this.loadState();
    }, 300000);
  }

  async sendMessage(message) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Message sending failed:', chrome.runtime.lastError);
          resolve({ success: false, error: chrome.runtime.lastError.message });
        } else {
          resolve(response);
        }
      });
    });
  }

  showError(message) {
    // 创建临时错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: #fef2f2;
      color: #dc2626;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 1000;
      border: 1px solid #fecaca;
    `;

    document.body.appendChild(errorDiv);

    // 3秒后自动移除
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 3000);
  }

  showSuccess(message) {
    // 创建临时成功提示
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: #f0fdf4;
      color: #16a34a;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 1000;
      border: 1px solid #bbf7d0;
    `;

    document.body.appendChild(successDiv);

    // 2秒后自动移除
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 2000);
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup loaded, initializing app...');
  new PopupApp();
});

// 处理页面卸载
window.addEventListener('beforeunload', () => {
  console.log('Popup closing');
});
