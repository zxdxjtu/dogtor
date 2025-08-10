// Dogtor 颈椎治疗助手 - 国际化文本管理系统
// 支持中英双语切换

// 多语言文本配置
const translations = {
  zh: {
    // Popup界面
    appTitle: 'Dogtor',
    appSubtitle: '颈椎健康提醒助手',
    autoRotationTitle: '自动旋转提醒',
    rotationAngleTitle: '旋转角度',
    rotationCycleTitle: '旋转周期',
    rotationCycleText: '每隔 {minutes} 分钟',
    statusNextReminder: '下次提醒: {time}',
    statusPluginEnabled: '插件已启用，等待开始...',
    statusStartingSoon: '即将开始下次提醒...',

    // 时间单位
    minutes: '分钟',
    seconds: '秒',
    hours: '小时',
    minutesShort: '分钟',
    hoursMinutes: '{hours}小时{minutes}分钟后',
    minutesOnly: '{minutes}分钟后',

    // Options设置页面
    optionsTitle: 'Dogtor - 颈椎治疗助手 设置',
    optionsSubtitle: '颈椎治疗助手 - 专业的颈椎健康管理工具',

    // 基础设置
    basicSettingsTitle: '基础设置',
    enableReminderLabel: '启用自动提醒',
    enableReminderDesc: '开启后将按设定的时间间隔自动提醒您进行颈椎旋转运动',
    rotationAngleLabel: '旋转角度',
    rotationAngleDesc: '设置颈椎左右旋转的最大角度，建议范围5°-45°',
    reminderIntervalLabel: '提醒间隔',
    reminderIntervalDesc: '设置自动提醒的时间间隔',
    exerciseDurationLabel: '运动持续时间',
    exerciseDurationDesc: '设置每次颈椎运动的持续时间',

    // 显示设置
    displaySettingsTitle: '显示设置',
    showIndicatorLabel: '显示状态指示器',
    showIndicatorDesc: '在页面上显示运动状态和倒计时指示器',
    soundNotificationLabel: '声音提醒',
    soundNotificationDesc: '运动开始和结束时播放提示音',
    desktopNotificationLabel: '桌面通知',
    desktopNotificationDesc: '通过系统通知提醒您进行颈椎运动',

    // 高级设置
    advancedSettingsTitle: '高级设置',
    smartPauseLabel: '智能暂停',
    smartPauseDesc: '检测到用户正在输入或观看视频时自动暂停提醒',
    workingHoursLabel: '工作时间模式',
    workingHoursDesc: '仅在指定的工作时间内启用提醒功能',
    startTimeLabel: '开始时间',
    endTimeLabel: '结束时间',

    // 统计信息
    statisticsTitle: '使用统计',
    totalExercisesLabel: '总运动次数',
    totalTimeLabel: '总运动时间',
    streakDaysLabel: '连续使用天数',
    todayExercisesLabel: '今日运动次数',
    resetStatsButton: '重置统计',
    exportStatsButton: '导出数据',

    // 底部按钮
    saveSettingsButton: '保存设置',
    resetSettingsButton: '恢复默认',
    footerInfo: '颈椎治疗助手 v1.0.0 | 关爱您的颈椎健康',

    // 对话框
    confirmOperationTitle: '确认操作',
    confirmOperationMessage: '您确定要执行此操作吗？',
    cancelButton: '取消',
    confirmButton: '确认',

    // Content Script 提示信息
    exerciseStarting: '颈椎锻炼开始...',
    rotateLeft: '向左旋转 {angle}°',
    rotateRight: '向右旋转 {angle}°',
    restorePosition: '恢复正常位置',
    exerciseComplete: '颈椎锻炼完成！',
    exerciseInProgress: '颈椎锻炼进行中... {time}',
    exerciseError: '锻炼过程出现错误',

    // 成功和错误消息
    settingsSaved: '设置已保存',
    settingsUpdateFailed: '设置更新失败',
    loadSettingsFailed: '加载设置失败',
    rotationStartFailed: '启动失败',
    rotationStopFailed: '停止失败',

    // 语言切换
    languageToggleTitle: '切换语言 / Switch Language'
  },

  en: {
    // Popup界面
    appTitle: 'Dogtor',
    appSubtitle: 'Cervical Spine Health',
    autoRotationTitle: 'Auto Rotation Reminder',
    rotationAngleTitle: 'Rotation Angle',
    rotationCycleTitle: 'Rotation Cycle',
    rotationCycleText: 'Every {minutes} minutes',
    statusNextReminder: 'Next reminder: {time}',
    statusPluginEnabled: 'Plugin enabled, waiting to start...',
    statusStartingSoon: 'Next reminder starting soon...',

    // 时间单位
    minutes: 'minutes',
    seconds: 'seconds',
    hours: 'hours',
    minutesShort: 'min',
    hoursMinutes: 'in {hours}h {minutes}min',
    minutesOnly: 'in {minutes} min',

    // Options设置页面
    optionsTitle: 'Dogtor - Cervical Spine Health Assistant Settings',
    optionsSubtitle: 'Cervical Spine Health Assistant - Professional cervical health management tool',

    // 基础设置
    basicSettingsTitle: 'Basic Settings',
    enableReminderLabel: 'Enable Auto Reminder',
    enableReminderDesc: 'When enabled, automatically reminds you to perform cervical rotation exercises at set intervals',
    rotationAngleLabel: 'Rotation Angle',
    rotationAngleDesc: 'Set the maximum angle for left and right cervical rotation, recommended range 5°-45°',
    reminderIntervalLabel: 'Reminder Interval',
    reminderIntervalDesc: 'Set the time interval for automatic reminders',
    exerciseDurationLabel: 'Exercise Duration',
    exerciseDurationDesc: 'Set the duration of each cervical exercise',

    // 显示设置
    displaySettingsTitle: 'Display Settings',
    showIndicatorLabel: 'Show Status Indicator',
    showIndicatorDesc: 'Display exercise status and countdown indicator on the page',
    soundNotificationLabel: 'Sound Notification',
    soundNotificationDesc: 'Play notification sounds when exercise starts and ends',
    desktopNotificationLabel: 'Desktop Notification',
    desktopNotificationDesc: 'Remind you to perform cervical exercises through system notifications',

    // 高级设置
    advancedSettingsTitle: 'Advanced Settings',
    smartPauseLabel: 'Smart Pause',
    smartPauseDesc: 'Automatically pause reminders when user input or video playback is detected',
    workingHoursLabel: 'Working Hours Mode',
    workingHoursDesc: 'Enable reminders only during specified working hours',
    startTimeLabel: 'Start Time',
    endTimeLabel: 'End Time',

    // 统计信息
    statisticsTitle: 'Usage Statistics',
    totalExercisesLabel: 'Total Exercises',
    totalTimeLabel: 'Total Exercise Time',
    streakDaysLabel: 'Consecutive Days',
    todayExercisesLabel: 'Today\'s Exercises',
    resetStatsButton: 'Reset Statistics',
    exportStatsButton: 'Export Data',

    // 底部按钮
    saveSettingsButton: 'Save Settings',
    resetSettingsButton: 'Reset to Default',
    footerInfo: 'Cervical Health Assistant v1.0.0 | Care for Your Cervical Health',

    // 对话框
    confirmOperationTitle: 'Confirm Operation',
    confirmOperationMessage: 'Are you sure you want to perform this operation?',
    cancelButton: 'Cancel',
    confirmButton: 'Confirm',

    // Content Script 提示信息
    exerciseStarting: 'Cervical exercise starting...',
    rotateLeft: 'Rotate left {angle}°',
    rotateRight: 'Rotate right {angle}°',
    restorePosition: 'Restore to normal position',
    exerciseComplete: 'Cervical exercise completed!',
    exerciseInProgress: 'Cervical exercise in progress... {time}',
    exerciseError: 'Error occurred during exercise',

    // 成功和错误消息
    settingsSaved: 'Settings saved',
    settingsUpdateFailed: 'Settings update failed',
    loadSettingsFailed: 'Failed to load settings',
    rotationStartFailed: 'Failed to start',
    rotationStopFailed: 'Failed to stop',

    // 语言切换
    languageToggleTitle: '切换语言 / Switch Language'
  }
};

// 国际化管理类
class I18nManager {
  constructor() {
    this.currentLanguage = 'en'; // 默认英文
    this.translations = translations;
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) {
      return;
    }
    console.log('Initializing i18n system...');
    // 从存储中加载语言设置
    await this.loadLanguage();
    this.isInitialized = true;
    console.log('I18n system initialized, current language:', this.currentLanguage);
  }

  async loadLanguage() {
    try {
      const result = await chrome.storage.sync.get(['language']);
      this.currentLanguage = result.language || 'en'; // 默认英文
      console.log('Loaded language preference:', this.currentLanguage);
    } catch (error) {
      console.warn('Failed to load language preference:', error);
      this.currentLanguage = 'en';
    }
  }

  async saveLanguage(language) {
    try {
      await chrome.storage.sync.set({ language });
      this.currentLanguage = language;
      console.log('Language preference saved:', language);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }

  t(key, params = {}) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (translation && typeof translation === 'object') {
        translation = translation[k];
      } else {
        break;
      }
    }

    // 如果当前语言没有翻译，回退到英文
    if (!translation) {
      translation = this.translations.en;
      for (const k of keys) {
        if (translation && typeof translation === 'object') {
          translation = translation[k];
        } else {
          break;
        }
      }
    }

    // 如果还是没有翻译，返回key
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    // 参数替换
    if (typeof translation === 'string' && Object.keys(params).length > 0) {
      return translation.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param] !== undefined ? params[param] : match;
      });
    }

    return translation;
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  async switchLanguage(language) {
    if (language !== this.currentLanguage) {
      await this.saveLanguage(language);
      return true; // 需要刷新界面
    }
    return false;
  }

  getAvailableLanguages() {
    return [
      { code: 'zh', name: '中文', nativeName: '中文' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ];
  }
}

// 导出全局实例
window.i18n = new I18nManager();

// 工具函数
window.t = (key, params) => window.i18n.t(key, params);

// DOM更新工具函数
window.updateI18nDOM = () => {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const params = element.getAttribute('data-i18n-params');

    let parsedParams = {};
    if (params) {
      try {
        parsedParams = JSON.parse(params);
      } catch (e) {
        console.warn('Invalid i18n params:', params);
      }
    }

    const translation = window.i18n.t(key, parsedParams);

    // 根据元素类型更新文本
    if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
      element.value = translation;
    } else if (element.hasAttribute('placeholder')) {
      element.placeholder = translation;
    } else if (element.hasAttribute('title')) {
      element.title = translation;
    } else {
      element.textContent = translation;
    }
  });
};

console.log('I18n system loaded');
