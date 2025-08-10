// Dogtor 颈椎治疗助手 - 常量定义

// 消息类型常量
export const MessageTypes = {
  // 核心功能消息
  START_ROTATION: 'start_rotation',
  STOP_ROTATION: 'stop_rotation',
  EXECUTE_SEQUENCE: 'execute_sequence',
  UPDATE_STATUS: 'update_status',
  GET_STATE: 'get_state',
  SETTINGS_CHANGED: 'settings_changed',

  // 统计相关消息
  GET_STATS: 'get_stats',
  UPDATE_STATS: 'update_stats',
  RESET_STATS: 'reset_stats',
  EXPORT_STATS: 'export_stats',

  // 系统消息
  EXTENSION_INSTALLED: 'extension_installed',
  EXTENSION_UPDATED: 'extension_updated',
  TAB_ACTIVATED: 'tab_activated',
  TAB_UPDATED: 'tab_updated',

  // 错误和调试
  ERROR_OCCURRED: 'error_occurred',
  DEBUG_INFO: 'debug_info'
};

// 旋转状态常量
export const RotationStates = {
  IDLE: 'idle',
  PREPARING: 'preparing',
  ROTATING_LEFT: 'rotating_left',
  ROTATING_RIGHT: 'rotating_right',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ERROR: 'error'
};

// 动画类型常量
export const AnimationTypes = {
  SMOOTH: 'smooth',
  ELASTIC: 'elastic',
  BOUNCE: 'bounce',
  LINEAR: 'linear'
};

// 存储键名常量
export const StorageKeys = {
  // 用户设置
  USER_SETTINGS: 'user_settings',

  // 运行时状态
  RUNTIME_STATE: 'runtime_state',

  // 统计数据
  EXERCISE_STATS: 'exercise_stats',
  DAILY_STATS: 'daily_stats',

  // 缓存数据
  LAST_ROTATION_TIME: 'last_rotation_time',
  NEXT_ROTATION_TIME: 'next_rotation_time',

  // 调试信息
  DEBUG_LOGS: 'debug_logs',
  ERROR_LOGS: 'error_logs'
};

// 默认设置常量
export const DEFAULT_SETTINGS = {
  // 基础功能设置
  isEnabled: false,
  rotationAngle: 15, // 度
  cycleDuration: 600000, // 10分钟（毫秒）
  rotationDuration: 30000, // 30秒（毫秒）

  // 显示设置
  showIndicator: true,
  indicatorPosition: 'top-right',
  indicatorSize: 'medium',

  // 通知设置
  soundNotification: false,
  desktopNotification: false,
  vibrationNotification: false,

  // 高级设置
  smartPause: true,
  workingHours: false,
  startTime: '09:00',
  endTime: '18:00',

  // 动画设置
  animationType: AnimationTypes.SMOOTH,
  animationSpeed: 1.0,

  // 兼容性设置
  skipVideoSites: true,
  skipGameSites: true,
  skipFullscreenMode: true,

  // 调试设置
  debugMode: false,
  logLevel: 'info'
};

// 默认统计数据
export const DEFAULT_STATS = {
  totalExercises: 0,
  totalTime: 0, // 毫秒
  streakDays: 0,
  todayExercises: 0,
  lastExerciseDate: null,
  weeklyExercises: 0,
  monthlyExercises: 0,
  averageAngle: 0,
  averageDuration: 0,
  installDate: Date.now(),
  lastActiveDate: Date.now()
};

// 默认运行时状态
export const DEFAULT_RUNTIME_STATE = {
  isActive: false,
  currentState: RotationStates.IDLE,
  nextRotationTime: null,
  lastRotationTime: null,
  currentTabId: null,
  isPaused: false,
  pauseReason: null,
  errorCount: 0,
  lastError: null
};

// 时间常量
export const TimeConstants = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,

  // 最小/最大值
  MIN_CYCLE_DURATION: 60 * 1000, // 1分钟
  MAX_CYCLE_DURATION: 120 * 60 * 1000, // 2小时
  MIN_ROTATION_DURATION: 15 * 1000, // 15秒
  MAX_ROTATION_DURATION: 300 * 1000, // 5分钟
  MIN_ROTATION_ANGLE: 5, // 5度
  MAX_ROTATION_ANGLE: 45, // 45度

  // 超时设置
  MESSAGE_TIMEOUT: 5 * 1000, // 5秒
  ANIMATION_TIMEOUT: 60 * 1000, // 1分钟
  STATE_SYNC_INTERVAL: 30 * 1000, // 30秒
  STATS_SAVE_INTERVAL: 5 * 60 * 1000 // 5分钟
};

// 错误代码常量
export const ErrorCodes = {
  // 通用错误
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INVALID_PARAMETER: 'INVALID_PARAMETER',
  OPERATION_FAILED: 'OPERATION_FAILED',

  // 存储错误
  STORAGE_READ_ERROR: 'STORAGE_READ_ERROR',
  STORAGE_WRITE_ERROR: 'STORAGE_WRITE_ERROR',
  STORAGE_QUOTA_EXCEEDED: 'STORAGE_QUOTA_EXCEEDED',

  // 消息传递错误
  MESSAGE_SEND_FAILED: 'MESSAGE_SEND_FAILED',
  MESSAGE_TIMEOUT: 'MESSAGE_TIMEOUT',
  INVALID_MESSAGE_TYPE: 'INVALID_MESSAGE_TYPE',

  // 动画错误
  ANIMATION_FAILED: 'ANIMATION_FAILED',
  DOM_NOT_READY: 'DOM_NOT_READY',
  ELEMENT_NOT_FOUND: 'ELEMENT_NOT_FOUND',

  // 权限错误
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOTIFICATION_BLOCKED: 'NOTIFICATION_BLOCKED',

  // 兼容性错误
  BROWSER_NOT_SUPPORTED: 'BROWSER_NOT_SUPPORTED',
  FEATURE_NOT_AVAILABLE: 'FEATURE_NOT_AVAILABLE',

  // 定时器错误
  ALARM_CREATE_FAILED: 'ALARM_CREATE_FAILED',
  ALARM_CLEAR_FAILED: 'ALARM_CLEAR_FAILED'
};

// 网站类型常量
export const SiteTypes = {
  VIDEO: 'video',
  GAME: 'game',
  SOCIAL: 'social',
  WORK: 'work',
  SHOPPING: 'shopping',
  NEWS: 'news',
  EDUCATION: 'education',
  OTHER: 'other'
};

// 视频网站列表
export const VIDEO_SITES = [
  'youtube.com',
  'youtu.be',
  'netflix.com',
  'hulu.com',
  'amazon.com/prime',
  'disneyplus.com',
  'twitch.tv',
  'vimeo.com',
  'dailymotion.com',
  'bilibili.com',
  'iqiyi.com',
  'youku.com',
  'qq.com/v',
  'v.qq.com'
];

// 游戏网站列表
export const GAME_SITES = [
  'steam.com',
  'epicgames.com',
  'battle.net',
  'origin.com',
  'uplay.com',
  'gog.com',
  'itch.io',
  'miniclip.com',
  'kongregate.com',
  'armor.games',
  '4399.com',
  '7k7k.com',
  'qq.com/games'
];

// CSS选择器常量
export const CSS_SELECTORS = {
  // 视频元素
  VIDEO_ELEMENTS: 'video, iframe[src*="youtube"], iframe[src*="vimeo"], iframe[src*="twitch"]',

  // 游戏元素
  GAME_ELEMENTS: 'canvas, embed[type*="flash"], object[type*="flash"]',

  // 输入元素
  INPUT_ELEMENTS: 'input, textarea, [contenteditable="true"]',

  // 全屏元素
  FULLSCREEN_ELEMENTS: ':fullscreen, :-webkit-full-screen, :-moz-full-screen',

  // 状态指示器
  STATUS_INDICATOR: '.neck-therapy-indicator',

  // 动画容器
  ANIMATION_CONTAINER: '.neck-therapy-animation'
};

// 动画配置常量
export const ANIMATION_CONFIG = {
  // 缓动函数
  EASING: {
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    ELASTIC: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },

  // 持续时间
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000
  },

  // 延迟
  DELAY: {
    SHORT: 100,
    NORMAL: 200,
    LONG: 500
  }
};

// 调试级别常量
export const LogLevels = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

// 扩展信息常量
export const EXTENSION_INFO = {
  NAME: 'Dogtor',
  SUBTITLE: '颈椎治疗助手',
  VERSION: '1.0.0',
  DESCRIPTION: 'Dogtor - 专业的颈椎健康管理工具',
  AUTHOR: 'Dogtor Health',
  HOMEPAGE: 'https://github.com/dogtor-health/neck-therapy-extension',
  SUPPORT_EMAIL: 'support@dogtor.health'
};

// 导出所有常量
export default {
  MessageTypes,
  RotationStates,
  AnimationTypes,
  StorageKeys,
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
  DEFAULT_RUNTIME_STATE,
  TimeConstants,
  ErrorCodes,
  SiteTypes,
  VIDEO_SITES,
  GAME_SITES,
  CSS_SELECTORS,
  ANIMATION_CONFIG,
  LogLevels,
  EXTENSION_INFO
};
