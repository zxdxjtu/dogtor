// 颈椎治疗助手 - 选项页面交互逻辑

// 消息类型常量
const MessageTypes = {
  GET_STATE: 'get_state',
  SETTINGS_CHANGED: 'settings_changed',
  GET_STATS: 'get_stats',
  RESET_STATS: 'reset_stats',
  EXPORT_STATS: 'export_stats'
};

// 默认设置
const DEFAULT_SETTINGS = {
  isEnabled: false,
  rotationAngle: 15,
  cycleDuration: 600000, // 10分钟
  rotationDuration: 30000, // 30秒
  showIndicator: true,
  soundNotification: false,
  desktopNotification: false,
  smartPause: true,
  workingHours: false,
  startTime: '09:00',
  endTime: '18:00'
};

// DOM元素引用
const elements = {
  // 基础设置
  enableReminder: document.getElementById('enableReminder'),
  rotationAngle: document.getElementById('rotationAngle'),
  angleDisplay: document.getElementById('angleDisplay'),
  reminderInterval: document.getElementById('reminderInterval'),
  intervalDisplay: document.getElementById('intervalDisplay'),
  exerciseDuration: document.getElementById('exerciseDuration'),
  durationDisplay: document.getElementById('durationDisplay'),

  // 显示设置
  showIndicator: document.getElementById('showIndicator'),
  soundNotification: document.getElementById('soundNotification'),
  desktopNotification: document.getElementById('desktopNotification'),

  // 高级设置
  smartPause: document.getElementById('smartPause'),
  workingHours: document.getElementById('workingHours'),
  timeRangeContainer: document.getElementById('timeRangeContainer'),
  startTime: document.getElementById('startTime'),
  endTime: document.getElementById('endTime'),

  // 统计信息
  totalExercises: document.getElementById('totalExercises'),
  totalTime: document.getElementById('totalTime'),
  streakDays: document.getElementById('streakDays'),
  todayExercises: document.getElementById('todayExercises'),

  // 操作按钮
  saveSettings: document.getElementById('saveSettings'),
  resetSettings: document.getElementById('resetSettings'),
  resetStats: document.getElementById('resetStats'),
  exportStats: document.getElementById('exportStats'),

  // 对话框
  confirmDialog: document.getElementById('confirmDialog'),
  dialogTitle: document.getElementById('dialogTitle'),
  dialogMessage: document.getElementById('dialogMessage'),
  dialogCancel: document.getElementById('dialogCancel'),
  dialogConfirm: document.getElementById('dialogConfirm'),

  // 通知
  notification: document.getElementById('notification'),
  notificationMessage: document.getElementById('notificationMessage'),
  notificationClose: document.getElementById('notificationClose')
};

// 应用状态
let currentSettings = { ...DEFAULT_SETTINGS };
let currentStats = {
  totalExercises: 0,
  totalTime: 0,
  streakDays: 0,
  todayExercises: 0,
  lastExerciseDate: null
};

// 选项页面应用类
class OptionsApp {
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.loadSettings();
    this.loadStats();
    this.requestNotificationPermission();
  }

  initializeElements() {
    // 设置滑块的初始值和显示
    this.updateAngleDisplay(currentSettings.rotationAngle);
    this.updateIntervalDisplay(Math.round(currentSettings.cycleDuration / 60000));
    this.updateDurationDisplay(Math.round(currentSettings.rotationDuration / 1000));
  }

  bindEvents() {
    // 基础设置事件
    elements.enableReminder.addEventListener('change', (e) => {
      currentSettings.isEnabled = e.target.checked;
      this.markSettingsChanged();
    });

    elements.rotationAngle.addEventListener('input', (e) => {
      const angle = parseInt(e.target.value);
      currentSettings.rotationAngle = angle;
      this.updateAngleDisplay(angle);
      this.markSettingsChanged();
    });

    elements.reminderInterval.addEventListener('input', (e) => {
      const interval = parseInt(e.target.value);
      currentSettings.cycleDuration = interval * 60000; // 转换为毫秒
      this.updateIntervalDisplay(interval);
      this.markSettingsChanged();
    });

    elements.exerciseDuration.addEventListener('input', (e) => {
      const duration = parseInt(e.target.value);
      currentSettings.rotationDuration = duration * 1000; // 转换为毫秒
      this.updateDurationDisplay(duration);
      this.markSettingsChanged();
    });

    // 显示设置事件
    elements.showIndicator.addEventListener('change', (e) => {
      currentSettings.showIndicator = e.target.checked;
      this.markSettingsChanged();
    });

    elements.soundNotification.addEventListener('change', (e) => {
      currentSettings.soundNotification = e.target.checked;
      this.markSettingsChanged();
    });

    elements.desktopNotification.addEventListener('change', (e) => {
      currentSettings.desktopNotification = e.target.checked;
      if (e.target.checked) {
        this.requestNotificationPermission();
      }
      this.markSettingsChanged();
    });

    // 高级设置事件
    elements.smartPause.addEventListener('change', (e) => {
      currentSettings.smartPause = e.target.checked;
      this.markSettingsChanged();
    });

    elements.workingHours.addEventListener('change', (e) => {
      currentSettings.workingHours = e.target.checked;
      elements.timeRangeContainer.style.display = e.target.checked ? 'flex' : 'none';
      this.markSettingsChanged();
    });

    elements.startTime.addEventListener('change', (e) => {
      currentSettings.startTime = e.target.value;
      this.markSettingsChanged();
    });

    elements.endTime.addEventListener('change', (e) => {
      currentSettings.endTime = e.target.value;
      this.markSettingsChanged();
    });

    // 操作按钮事件
    elements.saveSettings.addEventListener('click', () => {
      this.saveSettings();
    });

    elements.resetSettings.addEventListener('click', () => {
      this.showConfirmDialog(
        '重置设置',
        '您确定要将所有设置恢复为默认值吗？此操作不可撤销。',
        () => this.resetSettings()
      );
    });

    elements.resetStats.addEventListener('click', () => {
      this.showConfirmDialog(
        '重置统计',
        '您确定要清除所有使用统计数据吗？此操作不可撤销。',
        () => this.resetStats()
      );
    });

    elements.exportStats.addEventListener('click', () => {
      this.exportStats();
    });

    // 对话框事件
    elements.dialogCancel.addEventListener('click', () => {
      this.hideConfirmDialog();
    });

    elements.confirmDialog.addEventListener('click', (e) => {
      if (e.target === elements.confirmDialog) {
        this.hideConfirmDialog();
      }
    });

    // 通知事件
    elements.notificationClose.addEventListener('click', () => {
      this.hideNotification();
    });

    // 键盘事件
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideConfirmDialog();
        this.hideNotification();
      }
    });
  }

  async loadSettings() {
    try {
      const response = await this.sendMessage({ type: MessageTypes.GET_STATE });

      if (response && response.success && response.settings) {
        currentSettings = { ...DEFAULT_SETTINGS, ...response.settings };

        // 转换时间格式
        if (currentSettings.cycleDuration) {
          currentSettings.cycleDuration = Math.max(60000, currentSettings.cycleDuration);
        }
        if (currentSettings.rotationDuration) {
          currentSettings.rotationDuration = Math.max(15000, currentSettings.rotationDuration);
        }

        this.updateUI();
        console.log('Settings loaded:', currentSettings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      this.showNotification('加载设置失败', 'error');
    }
  }

  async loadStats() {
    try {
      const response = await this.sendMessage({ type: MessageTypes.GET_STATS });

      if (response && response.success && response.stats) {
        currentStats = { ...currentStats, ...response.stats };
        this.updateStatsDisplay();
        console.log('Stats loaded:', currentStats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
      this.showNotification('加载统计数据失败', 'error');
    }
  }

  updateUI() {
    // 更新基础设置
    elements.enableReminder.checked = currentSettings.isEnabled;
    elements.rotationAngle.value = currentSettings.rotationAngle;
    elements.reminderInterval.value = Math.round(currentSettings.cycleDuration / 60000);
    elements.exerciseDuration.value = Math.round(currentSettings.rotationDuration / 1000);

    // 更新显示设置
    elements.showIndicator.checked = currentSettings.showIndicator;
    elements.soundNotification.checked = currentSettings.soundNotification;
    elements.desktopNotification.checked = currentSettings.desktopNotification;

    // 更新高级设置
    elements.smartPause.checked = currentSettings.smartPause;
    elements.workingHours.checked = currentSettings.workingHours;
    elements.startTime.value = currentSettings.startTime;
    elements.endTime.value = currentSettings.endTime;

    // 更新时间范围显示
    elements.timeRangeContainer.style.display = currentSettings.workingHours ? 'flex' : 'none';

    // 更新显示值
    this.updateAngleDisplay(currentSettings.rotationAngle);
    this.updateIntervalDisplay(Math.round(currentSettings.cycleDuration / 60000));
    this.updateDurationDisplay(Math.round(currentSettings.rotationDuration / 1000));

    // 重置保存按钮状态
    this.resetSaveButton();
  }

  updateStatsDisplay() {
    elements.totalExercises.textContent = currentStats.totalExercises || 0;
    elements.totalTime.textContent = `${Math.round((currentStats.totalTime || 0) / 60000)}分钟`;
    elements.streakDays.textContent = `${currentStats.streakDays || 0}天`;
    elements.todayExercises.textContent = currentStats.todayExercises || 0;
  }

  updateAngleDisplay(angle) {
    elements.angleDisplay.textContent = `${angle}°`;
  }

  updateIntervalDisplay(interval) {
    elements.intervalDisplay.textContent = `${interval}分钟`;
  }

  updateDurationDisplay(duration) {
    elements.durationDisplay.textContent = `${duration}秒`;
  }

  markSettingsChanged() {
    elements.saveSettings.textContent = '保存设置 *';
    elements.saveSettings.classList.add('btn-warning');
    elements.saveSettings.classList.remove('btn-primary');
  }

  resetSaveButton() {
    elements.saveSettings.textContent = '保存设置';
    elements.saveSettings.classList.remove('btn-warning');
    elements.saveSettings.classList.add('btn-primary');
  }

  async saveSettings() {
    try {
      elements.saveSettings.disabled = true;
      elements.saveSettings.textContent = '保存中...';

      const response = await this.sendMessage({
        type: MessageTypes.SETTINGS_CHANGED,
        payload: currentSettings
      });

      if (response && response.success) {
        this.showNotification('设置已保存', 'success');
        this.resetSaveButton();
        console.log('Settings saved successfully');
      } else {
        throw new Error(response?.error || '保存失败');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      this.showNotification('保存设置失败: ' + error.message, 'error');
    } finally {
      elements.saveSettings.disabled = false;
      if (elements.saveSettings.textContent === '保存中...') {
        elements.saveSettings.textContent = '保存设置';
      }
    }
  }

  async resetSettings() {
    try {
      currentSettings = { ...DEFAULT_SETTINGS };
      this.updateUI();
      await this.saveSettings();
      this.showNotification('设置已重置为默认值', 'success');
    } catch (error) {
      console.error('Failed to reset settings:', error);
      this.showNotification('重置设置失败', 'error');
    }
  }

  async resetStats() {
    try {
      const response = await this.sendMessage({ type: MessageTypes.RESET_STATS });

      if (response && response.success) {
        currentStats = {
          totalExercises: 0,
          totalTime: 0,
          streakDays: 0,
          todayExercises: 0,
          lastExerciseDate: null
        };
        this.updateStatsDisplay();
        this.showNotification('统计数据已重置', 'success');
      } else {
        throw new Error(response?.error || '重置失败');
      }
    } catch (error) {
      console.error('Failed to reset stats:', error);
      this.showNotification('重置统计数据失败', 'error');
    }
  }

  async exportStats() {
    try {
      const response = await this.sendMessage({ type: MessageTypes.EXPORT_STATS });

      if (response && response.success && response.data) {
        const dataStr = JSON.stringify(response.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `neck-therapy-stats-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(link.href);
        this.showNotification('统计数据已导出', 'success');
      } else {
        throw new Error(response?.error || '导出失败');
      }
    } catch (error) {
      console.error('Failed to export stats:', error);
      this.showNotification('导出统计数据失败', 'error');
    }
  }

  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          elements.desktopNotification.checked = false;
          currentSettings.desktopNotification = false;
          this.showNotification('需要通知权限才能启用桌面通知', 'warning');
        }
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    }
  }

  showConfirmDialog(title, message, onConfirm) {
    elements.dialogTitle.textContent = title;
    elements.dialogMessage.textContent = message;
    elements.confirmDialog.style.display = 'flex';

    // 移除之前的事件监听器
    const newConfirmButton = elements.dialogConfirm.cloneNode(true);
    elements.dialogConfirm.parentNode.replaceChild(newConfirmButton, elements.dialogConfirm);
    elements.dialogConfirm = newConfirmButton;

    // 添加新的事件监听器
    elements.dialogConfirm.addEventListener('click', () => {
      this.hideConfirmDialog();
      onConfirm();
    });
  }

  hideConfirmDialog() {
    elements.confirmDialog.style.display = 'none';
  }

  showNotification(message, type = 'info') {
    elements.notificationMessage.textContent = message;
    elements.notification.className = `notification ${type}`;
    elements.notification.style.display = 'block';

    // 自动隐藏
    setTimeout(() => {
      this.hideNotification();
    }, type === 'error' ? 5000 : 3000);
  }

  hideNotification() {
    elements.notification.style.display = 'none';
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
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('Options page loaded, initializing app...');
  new OptionsApp();
});

// 处理页面卸载
window.addEventListener('beforeunload', (e) => {
  // 检查是否有未保存的更改
  if (elements.saveSettings.textContent.includes('*')) {
    e.preventDefault();
    e.returnValue = '您有未保存的设置更改，确定要离开吗？';
    return e.returnValue;
  }
});
