// 颈椎治疗助手 - 工具函数

import {
  TimeConstants,
  ErrorCodes,
  VIDEO_SITES,
  GAME_SITES
} from './constants.js';

// 时间工具函数
export const TimeUtils = {
  /**
   * 格式化时间显示
   * @param {number} milliseconds - 毫秒数
   * @param {string} format - 格式类型 ('short', 'long', 'precise')
   * @returns {string} 格式化后的时间字符串
   */
  formatDuration(milliseconds, format = 'short') {
    if (!milliseconds || milliseconds < 0) {
      return '0秒';
    }

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    switch (format) {
    case 'precise':
      if (days > 0) {
        return `${days}天${hours % 24}小时${minutes % 60}分钟`;
      }
      if (hours > 0) {
        return `${hours}小时${minutes % 60}分钟${seconds % 60}秒`;
      }
      if (minutes > 0) {
        return `${minutes}分钟${seconds % 60}秒`;
      }
      return `${seconds}秒`;

    case 'long':
      if (days > 0) {
        return `${days}天${hours % 24}小时`;
      }
      if (hours > 0) {
        return `${hours}小时${minutes % 60}分钟`;
      }
      if (minutes > 0) {
        return `${minutes}分钟`;
      }
      return `${seconds}秒`;

    case 'short':
    default:
      if (days > 0) {
        return `${days}天`;
      }
      if (hours > 0) {
        return `${hours}小时`;
      }
      if (minutes > 0) {
        return `${minutes}分钟`;
      }
      return `${seconds}秒`;
    }
  },

  /**
   * 格式化倒计时显示
   * @param {number} targetTime - 目标时间戳
   * @returns {string} 倒计时字符串
   */
  formatCountdown(targetTime) {
    const now = Date.now();
    const remaining = targetTime - now;

    if (remaining <= 0) {
      return '即将开始';
    }

    const minutes = Math.ceil(remaining / TimeConstants.MINUTE);
    if (minutes < 60) {
      return `${minutes}分钟后`;
    }

    const hours = Math.ceil(remaining / TimeConstants.HOUR);
    if (hours < 24) {
      return `${hours}小时后`;
    }

    const days = Math.ceil(remaining / TimeConstants.DAY);
    return `${days}天后`;
  },

  /**
   * 检查是否在工作时间内
   * @param {string} startTime - 开始时间 (HH:MM)
   * @param {string} endTime - 结束时间 (HH:MM)
   * @returns {boolean} 是否在工作时间内
   */
  isWithinWorkingHours(startTime, endTime) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    // 处理跨天的情况
    if (start > end) {
      return currentTime >= start || currentTime <= end;
    }

    return currentTime >= start && currentTime <= end;
  },

  /**
   * 获取下一个工作日的开始时间
   * @param {string} startTime - 工作开始时间 (HH:MM)
   * @returns {number} 下一个工作日开始时间的时间戳
   */
  getNextWorkingDayStart(startTime) {
    const [hour, minute] = startTime.split(':').map(Number);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(hour, minute, 0, 0);
    return tomorrow.getTime();
  }
};

// 存储工具函数
export const StorageUtils = {
  /**
   * 安全地从Chrome存储中读取数据
   * @param {string} key - 存储键名
   * @param {any} defaultValue - 默认值
   * @param {string} area - 存储区域 ('sync' 或 'local')
   * @returns {Promise<any>} 存储的值或默认值
   */
  async get(key, defaultValue = null, area = 'sync') {
    try {
      const result = await chrome.storage[area].get(key);
      return result[key] !== undefined ? result[key] : defaultValue;
    } catch (error) {
      console.error(`Storage get error for key ${key}:`, error);
      return defaultValue;
    }
  },

  /**
   * 安全地向Chrome存储中写入数据
   * @param {string} key - 存储键名
   * @param {any} value - 要存储的值
   * @param {string} area - 存储区域 ('sync' 或 'local')
   * @returns {Promise<boolean>} 是否成功
   */
  async set(key, value, area = 'sync') {
    try {
      await chrome.storage[area].set({ [key]: value });
      return true;
    } catch (error) {
      console.error(`Storage set error for key ${key}:`, error);
      return false;
    }
  },

  /**
   * 安全地从Chrome存储中删除数据
   * @param {string|string[]} keys - 要删除的键名
   * @param {string} area - 存储区域 ('sync' 或 'local')
   * @returns {Promise<boolean>} 是否成功
   */
  async remove(keys, area = 'sync') {
    try {
      await chrome.storage[area].remove(keys);
      return true;
    } catch (error) {
      console.error(`Storage remove error for keys ${keys}:`, error);
      return false;
    }
  },

  /**
   * 清空指定存储区域
   * @param {string} area - 存储区域 ('sync' 或 'local')
   * @returns {Promise<boolean>} 是否成功
   */
  async clear(area = 'sync') {
    try {
      await chrome.storage[area].clear();
      return true;
    } catch (error) {
      console.error(`Storage clear error for area ${area}:`, error);
      return false;
    }
  }
};

// 消息传递工具函数
export const MessageUtils = {
  /**
   * 发送消息到指定标签页
   * @param {number} tabId - 标签页ID
   * @param {object} message - 消息对象
   * @param {number} timeout - 超时时间（毫秒）
   * @returns {Promise<any>} 响应结果
   */
  async sendToTab(tabId, message, timeout = TimeConstants.MESSAGE_TIMEOUT) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve({ success: false, error: ErrorCodes.MESSAGE_TIMEOUT });
      }, timeout);

      try {
        chrome.tabs.sendMessage(tabId, message, (response) => {
          clearTimeout(timer);
          if (chrome.runtime.lastError) {
            resolve({ success: false, error: chrome.runtime.lastError.message });
          } else {
            resolve(response || { success: true });
          }
        });
      } catch (error) {
        clearTimeout(timer);
        resolve({ success: false, error: error.message });
      }
    });
  },

  /**
   * 发送消息到Service Worker
   * @param {object} message - 消息对象
   * @param {number} timeout - 超时时间（毫秒）
   * @returns {Promise<any>} 响应结果
   */
  async sendToBackground(message, timeout = TimeConstants.MESSAGE_TIMEOUT) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve({ success: false, error: ErrorCodes.MESSAGE_TIMEOUT });
      }, timeout);

      try {
        chrome.runtime.sendMessage(message, (response) => {
          clearTimeout(timer);
          if (chrome.runtime.lastError) {
            resolve({ success: false, error: chrome.runtime.lastError.message });
          } else {
            resolve(response || { success: true });
          }
        });
      } catch (error) {
        clearTimeout(timer);
        resolve({ success: false, error: error.message });
      }
    });
  },

  /**
   * 广播消息到所有标签页
   * @param {object} message - 消息对象
   * @returns {Promise<object[]>} 所有响应结果
   */
  async broadcast(message) {
    try {
      const tabs = await chrome.tabs.query({});
      const promises = tabs.map(tab => this.sendToTab(tab.id, message));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Broadcast error:', error);
      return [];
    }
  }
};

// 网站检测工具函数
export const SiteUtils = {
  /**
   * 检测当前网站类型
   * @param {string} url - 网站URL
   * @returns {string} 网站类型
   */
  detectSiteType(url) {
    if (!url) {
      return 'other';
    }

    const hostname = new URL(url).hostname.toLowerCase();

    if (VIDEO_SITES.some(site => hostname.includes(site))) {
      return 'video';
    }

    if (GAME_SITES.some(site => hostname.includes(site))) {
      return 'game';
    }

    // 其他类型检测
    if (hostname.includes('github.com') || hostname.includes('stackoverflow.com')) {
      return 'work';
    }

    if (hostname.includes('facebook.com') || hostname.includes('twitter.com') || hostname.includes('instagram.com')) {
      return 'social';
    }

    return 'other';
  },

  /**
   * 检查是否应该跳过当前页面
   * @param {string} url - 页面URL
   * @param {object} settings - 用户设置
   * @returns {boolean} 是否应该跳过
   */
  shouldSkipPage(url, settings) {
    const siteType = this.detectSiteType(url);

    if (settings.skipVideoSites && siteType === 'video') {
      return true;
    }

    if (settings.skipGameSites && siteType === 'game') {
      return true;
    }

    return false;
  },

  /**
   * 检查页面是否处于全屏模式
   * @returns {boolean} 是否全屏
   */
  isFullscreen() {
    return !!(document.fullscreenElement ||
             document.webkitFullscreenElement ||
             document.mozFullScreenElement ||
             document.msFullscreenElement);
  },

  /**
   * 检查用户是否正在输入
   * @returns {boolean} 是否正在输入
   */
  isUserTyping() {
    const activeElement = document.activeElement;
    if (!activeElement) {
      return false;
    }

    const tagName = activeElement.tagName.toLowerCase();
    const isInput = tagName === 'input' || tagName === 'textarea';
    const isContentEditable = activeElement.contentEditable === 'true';

    return isInput || isContentEditable;
  },

  /**
   * 检查页面是否有正在播放的视频
   * @returns {boolean} 是否有视频播放
   */
  hasPlayingVideo() {
    const videos = document.querySelectorAll('video');
    return Array.from(videos).some(video => !video.paused && !video.ended);
  }
};

// DOM工具函数
export const DOMUtils = {
  /**
   * 安全地创建DOM元素
   * @param {string} tagName - 标签名
   * @param {object} attributes - 属性对象
   * @param {string} textContent - 文本内容
   * @returns {HTMLElement} 创建的元素
   */
  createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else {
        element.setAttribute(key, value);
      }
    });

    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  },

  /**
   * 安全地移除DOM元素
   * @param {HTMLElement|string} element - 元素或选择器
   */
  removeElement(element) {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  },

  /**
   * 检查元素是否在视口中
   * @param {HTMLElement} element - 要检查的元素
   * @returns {boolean} 是否在视口中
   */
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * 获取元素的绝对位置
   * @param {HTMLElement} element - 目标元素
   * @returns {object} 位置信息 {top, left, width, height}
   */
  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height
    };
  },

  /**
   * 等待DOM准备就绪
   * @returns {Promise<void>} Promise对象
   */
  waitForDOMReady() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      } else {
        resolve();
      }
    });
  }
};

// 动画工具函数
export const AnimationUtils = {
  /**
   * 创建CSS动画
   * @param {HTMLElement} element - 目标元素
   * @param {object} keyframes - 关键帧
   * @param {object} options - 动画选项
   * @returns {Animation} 动画对象
   */
  animate(element, keyframes, options = {}) {
    const defaultOptions = {
      duration: 300,
      easing: 'ease-in-out',
      fill: 'forwards'
    };

    return element.animate(keyframes, { ...defaultOptions, ...options });
  },

  /**
   * 淡入动画
   * @param {HTMLElement} element - 目标元素
   * @param {number} duration - 持续时间
   * @returns {Promise<void>} 动画完成Promise
   */
  fadeIn(element, duration = 300) {
    return new Promise((resolve) => {
      const animation = this.animate(element, [
        { opacity: 0 },
        { opacity: 1 }
      ], { duration });

      animation.addEventListener('finish', resolve, { once: true });
    });
  },

  /**
   * 淡出动画
   * @param {HTMLElement} element - 目标元素
   * @param {number} duration - 持续时间
   * @returns {Promise<void>} 动画完成Promise
   */
  fadeOut(element, duration = 300) {
    return new Promise((resolve) => {
      const animation = this.animate(element, [
        { opacity: 1 },
        { opacity: 0 }
      ], { duration });

      animation.addEventListener('finish', resolve, { once: true });
    });
  },

  /**
   * 滑入动画
   * @param {HTMLElement} element - 目标元素
   * @param {string} direction - 方向 ('up', 'down', 'left', 'right')
   * @param {number} duration - 持续时间
   * @returns {Promise<void>} 动画完成Promise
   */
  slideIn(element, direction = 'up', duration = 300) {
    const transforms = {
      up: ['translateY(100%)', 'translateY(0)'],
      down: ['translateY(-100%)', 'translateY(0)'],
      left: ['translateX(100%)', 'translateX(0)'],
      right: ['translateX(-100%)', 'translateX(0)']
    };

    return new Promise((resolve) => {
      const animation = this.animate(element, [
        { transform: transforms[direction][0], opacity: 0 },
        { transform: transforms[direction][1], opacity: 1 }
      ], { duration });

      animation.addEventListener('finish', resolve, { once: true });
    });
  }
};

// 日志工具函数
export const LogUtils = {
  /**
   * 格式化日志消息
   * @param {string} level - 日志级别
   * @param {string} message - 消息内容
   * @param {any} data - 附加数据
   * @returns {string} 格式化后的日志
   */
  formatLog(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}] [NeckTherapy]`;

    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data)}`;
    }

    return `${prefix} ${message}`;
  },

  /**
   * 安全的控制台输出
   * @param {string} level - 日志级别
   * @param {string} message - 消息内容
   * @param {any} data - 附加数据
   */
  log(level, message, data = null) {
    const formattedMessage = this.formatLog(level, message, data);

    switch (level) {
    case 'error':
      console.error(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'info':
      console.info(formattedMessage);
      break;
    case 'debug':
    default:
      console.log(formattedMessage);
      break;
    }
  }
};

// 验证工具函数
export const ValidationUtils = {
  /**
   * 验证旋转角度
   * @param {number} angle - 角度值
   * @returns {boolean} 是否有效
   */
  isValidAngle(angle) {
    return typeof angle === 'number' &&
           angle >= TimeConstants.MIN_ROTATION_ANGLE &&
           angle <= TimeConstants.MAX_ROTATION_ANGLE;
  },

  /**
   * 验证周期时长
   * @param {number} duration - 时长（毫秒）
   * @returns {boolean} 是否有效
   */
  isValidCycleDuration(duration) {
    return typeof duration === 'number' &&
           duration >= TimeConstants.MIN_CYCLE_DURATION &&
           duration <= TimeConstants.MAX_CYCLE_DURATION;
  },

  /**
   * 验证旋转时长
   * @param {number} duration - 时长（毫秒）
   * @returns {boolean} 是否有效
   */
  isValidRotationDuration(duration) {
    return typeof duration === 'number' &&
           duration >= TimeConstants.MIN_ROTATION_DURATION &&
           duration <= TimeConstants.MAX_ROTATION_DURATION;
  },

  /**
   * 验证时间格式
   * @param {string} time - 时间字符串 (HH:MM)
   * @returns {boolean} 是否有效
   */
  isValidTimeFormat(time) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return typeof time === 'string' && timeRegex.test(time);
  }
};

// 导出所有工具函数
export default {
  TimeUtils,
  StorageUtils,
  MessageUtils,
  SiteUtils,
  DOMUtils,
  AnimationUtils,
  LogUtils,
  ValidationUtils
};
