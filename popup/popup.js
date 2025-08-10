// Dogtor 颈椎治疗助手 - Popup交互逻辑

// 消息类型常量
const MessageTypes = {
  START_ROTATION: 'start_rotation',
  STOP_ROTATION: 'stop_rotation',
  EXECUTE_SEQUENCE: 'execute_sequence',
  UPDATE_STATUS: 'update_status',
  GET_STATE: 'get_state',
  SETTINGS_CHANGED: 'settings_changed'
};

// DOM元素引用 - 延迟初始化
let elements = {};

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
    this.initializeI18n();
  }

  async initializeI18n() {
    try {
      // 初始化DOM元素引用
      this.initializeDOMElements();

      // 确保i18n系统可用
      if (!window.i18n) {
        console.error('i18n system not available!');
        return;
      }

      // 等待国际化系统初始化
      await window.i18n.init();

      this.updateLanguageDisplay();
      this.updateI18nContent();
      this.initializeElements();
      this.bindEvents();
      this.loadState();
      this.startStatusUpdater();
    } catch (error) {
      console.error('App initialization failed:', error);
    }
  }

  initializeDOMElements() {
    elements = {
      enableSwitch: document.getElementById('enableSwitch'),
      angleSlider: document.getElementById('angleSlider'),
      angleValue: document.getElementById('angleValue'),
      angleLine: document.getElementById('angleLine'),
      frequencySlider: document.getElementById('frequencySlider'),
      frequencyText: document.getElementById('frequencyText'),
      statusSection: document.getElementById('statusSection'),
      statusText: document.getElementById('statusText'),
      languageToggle: document.getElementById('languageToggle'),
      currentLang: document.getElementById('currentLang')
    };

    // 验证关键元素是否存在
    if (!elements.languageToggle) {
      console.error('Language toggle button not found!');
    }
    if (!elements.currentLang) {
      console.error('Current language display not found!');
    }
  }

  initializeElements() {
    // 设置初始值
    elements.angleSlider.value = appState.rotationAngle;
    elements.angleValue.textContent = `${appState.rotationAngle}°`;
    elements.frequencySlider.value = appState.cycleDuration;

    // 更新角度线和频率文本
    this.updateAngleLine(appState.rotationAngle);
    this.updateFrequencyText(appState.cycleDuration);
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

    // 语言切换事件
    if (elements.languageToggle) {
      elements.languageToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleLanguageToggle();
      });
    } else {
      console.error('Language toggle button not found, cannot bind event');
    }
  }

  async loadState() {
    try {
      const response = await this.sendMessage({ type: MessageTypes.GET_STATE });

      if (response && response.success) {
        const { settings } = response; // 现在所有状态都在 settings 中

        // 更新应用状态 - 统一从 settings 获取
        appState = {
          isEnabled: settings.isEnabled || false,                    // 主开关状态
          rotationAngle: settings.rotationAngle || 15,               // 旋转角度
          cycleDuration: Math.round((settings.cycleDuration || 600000) / 60000), // 周期（分钟）
          isActive: settings.isActive || false,                      // 定时器运行状态
          nextRotationTime: settings.nextRotationTime || null        // 下次旋转时间
        };

        // 状态一致性检查和修复
        if (settings.isActive && !settings.isEnabled) {
          console.warn('State inconsistency detected: timer active but plugin disabled');
          // 如果定时器运行但插件未启用，以定时器状态为准
          appState.isEnabled = true;
        } else if (!settings.isActive && settings.isEnabled) {
          console.warn('State inconsistency detected: plugin enabled but timer not active');
          // 这种情况可能是正常的（插件启用但定时器暂停）
        }

        // 静默更新UI（不触发动画）
        this.updateUIWithoutAnimation();
        console.log('Unified state loaded:', appState);
      } else {
        throw new Error(response?.error || '获取状态失败');
      }
    } catch (error) {
      console.error('Failed to load state:', error);
      this.showError('加载设置失败: ' + error.message);

      // 加载失败时使用默认状态
      appState = {
        isEnabled: false,
        rotationAngle: 15,
        cycleDuration: 10,
        isActive: false,
        nextRotationTime: null
      };
      this.updateUIWithoutAnimation();
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
    this.updateFrequencyText(appState.cycleDuration);

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
    this.updateFrequencyText(appState.cycleDuration);

    // 更新状态显示
    this.updateStatusDisplay();
  }

  updateAngleLine(angle) {
    if (!elements.angleLine) {
      console.error('Angle line element not found');
      return;
    }

    // SVG坐标系：中心点(96, 80)，半径70
    // 角度从垂直向上开始，正值顺时针
    const radian = (angle * Math.PI) / 180;
    const centerX = 96;
    const centerY = 80;
    const radius = 70;

    // 计算角度线终点：0度指向正上方，正值顺时针旋转
    const x = centerX + radius * Math.sin(radian);
    const y = centerY - radius * Math.cos(radian);

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

    // 更新频率显示文本
    this.updateFrequencyText(frequency);

    // 如果正在运行，更新设置
    if (appState.isEnabled) {
      await this.updateSettings();
    }
  }

  updateFrequencyText(frequency) {
    elements.frequencyText.textContent = window.t('rotationCycleText', { minutes: frequency });
  }

  async handleLanguageToggle() {
    const currentLang = window.i18n.getCurrentLanguage();
    const newLang = currentLang === 'zh' ? 'en' : 'zh';

    await window.i18n.switchLanguage(newLang);
    this.updateLanguageDisplay();
    this.updateI18nContent();
    this.updateFrequencyText(appState.cycleDuration);
  }

  updateLanguageDisplay() {
    const currentLang = window.i18n.getCurrentLanguage();
    elements.currentLang.textContent = currentLang.toUpperCase();

    // 更新页面语言属性
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
  }

  updateI18nContent() {
    // 使用工具函数更新所有带有data-i18n属性的元素
    window.updateI18nDOM();
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
    // 统一状态显示逻辑
    if (appState.isEnabled && appState.isActive && appState.nextRotationTime) {
      const now = Date.now();
      const timeRemaining = appState.nextRotationTime - now;

      if (timeRemaining > 0) {
        const minutes = Math.ceil(timeRemaining / 60000);
        const hours = Math.floor(minutes / 60);

        let timeText;
        if (hours > 0) {
          timeText = window.t('hoursMinutes', { hours, minutes: minutes % 60 });
        } else {
          timeText = window.t('minutesOnly', { minutes });
        }

        elements.statusText.textContent = window.t('statusNextReminder', { time: timeText });
        elements.statusSection.style.display = 'block';

        // 添加活动状态指示器
        const indicator = elements.statusSection.querySelector('.status-indicator');
        if (indicator) {
          indicator.classList.add('active');
        }
      } else {
        elements.statusText.textContent = window.t('statusStartingSoon');
        elements.statusSection.style.display = 'block';
      }
    } else if (appState.isEnabled && !appState.isActive) {
      // 插件启用但定时器未运行
      elements.statusText.textContent = window.t('statusPluginEnabled');
      elements.statusSection.style.display = 'block';

      const indicator = elements.statusSection.querySelector('.status-indicator');
      if (indicator) {
        indicator.classList.remove('active');
      }
    } else {
      // 插件未启用
      elements.statusSection.style.display = 'none';
    }
  }

  startStatusUpdater() {
    // 每秒更新倒计时显示（基于时间计算，不依赖状态重载）
    setInterval(() => {
      if (appState.isEnabled && appState.isActive && appState.nextRotationTime) {
        this.updateStatusDisplay();
      }
    }, 1000);

    // 每2分钟轻量级状态同步（不会重置倒计时）
    setInterval(() => {
      this.syncState();
    }, 120000);

    // 每10分钟完整重新加载状态（用于确保长期一致性）
    setInterval(() => {
      this.loadState();
    }, 600000);
  }

  // 轻量级状态同步（保持倒计时连续性）
  async syncState() {
    try {
      const response = await this.sendMessage({ type: MessageTypes.GET_STATE });
      if (response && response.success) {
        const { settings } = response;

        // 只更新关键状态，保持倒计时连续性
        const wasActive = appState.isActive;
        const oldNextTime = appState.nextRotationTime;

        appState.isEnabled = settings.isEnabled || false;
        appState.isActive = settings.isActive || false;

        // 只在必要时更新下次旋转时间
        if (settings.nextRotationTime && settings.nextRotationTime !== oldNextTime) {
          appState.nextRotationTime = settings.nextRotationTime;
        }

        // 如果状态发生重要变化，更新UI
        if (wasActive !== appState.isActive) {
          this.updateStatusDisplay();
        }
      }
    } catch (error) {
      console.log('Sync state failed (non-critical):', error.message);
    }
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
