// 颈椎治疗浏览器插件 - Content Script
// 负责DOM操作、旋转动画、状态指示器和事件监听

// 消息类型常量
const MessageTypes = {
  START_ROTATION: 'start_rotation',
  STOP_ROTATION: 'stop_rotation',
  EXECUTE_SEQUENCE: 'execute_sequence',
  UPDATE_STATUS: 'update_status',
  GET_STATE: 'get_state',
  SETTINGS_CHANGED: 'settings_changed'
};

// 动画管理器
class AnimationManager {
  constructor() {
    this.targetElement = document.documentElement;
    this.isAnimating = false;
    this.currentAngle = 0;
    this.setupTransition();
  }

  setupTransition() {
    // 应用平滑过渡效果
    this.targetElement.style.transition = 'transform 2s ease-in-out';
    this.targetElement.style.transformOrigin = 'center center';
  }

  rotateToAngle(angle) {
    return new Promise((resolve) => {
      if (this.isAnimating) {
        console.log('Animation already in progress, skipping');
        resolve();
        return;
      }

      this.isAnimating = true;
      this.currentAngle = angle;
      this.targetElement.style.transform = `rotate(${angle}deg)`;

      // 监听过渡完成事件
      const handleTransitionEnd = (event) => {
        if (event.target === this.targetElement && event.propertyName === 'transform') {
          this.targetElement.removeEventListener('transitionend', handleTransitionEnd);
          this.isAnimating = false;
          resolve();
        }
      };

      this.targetElement.addEventListener('transitionend', handleTransitionEnd);

      // 备用超时机制
      setTimeout(() => {
        if (this.isAnimating) {
          this.targetElement.removeEventListener('transitionend', handleTransitionEnd);
          this.isAnimating = false;
          resolve();
        }
      }, 3000); // 3秒超时
    });
  }

  reset() {
    return this.rotateToAngle(0);
  }

  getCurrentAngle() {
    return this.currentAngle;
  }
}

// 状态指示器
class StatusIndicator {
  constructor() {
    this.indicator = null;
    this.countdown = null;
    this.isVisible = false;
  }

  createIndicator() {
    if (this.indicator) {
      return this.indicator;
    }

    const indicator = document.createElement('div');
    indicator.id = 'neck-therapy-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      display: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      min-width: 200px;
      text-align: center;
    `;

    // 添加到页面
    document.body.appendChild(indicator);
    this.indicator = indicator;

    // 添加鼠标悬停事件
    indicator.addEventListener('mouseenter', () => {
      this.showDetailedInfo();
    });

    indicator.addEventListener('mouseleave', () => {
      this.hideDetailedInfo();
    });

    return indicator;
  }

  show(message, duration = null) {
    const indicator = this.createIndicator();
    indicator.innerHTML = message;
    indicator.style.display = 'block';
    this.isVisible = true;

    if (duration) {
      this.startCountdown(duration);
    }
  }

  hide() {
    if (this.indicator) {
      this.indicator.style.display = 'none';
      this.isVisible = false;
    }
    this.clearCountdown();
  }

  startCountdown(duration) {
    this.clearCountdown();

    let remaining = Math.ceil(duration / 1000);

    this.countdown = setInterval(() => {
      if (remaining <= 0) {
        this.clearCountdown();
        return;
      }

      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      const timeStr = minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;

      this.show(`颈椎锻炼进行中... ${timeStr}`);
      remaining--;
    }, 1000);
  }

  clearCountdown() {
    if (this.countdown) {
      clearInterval(this.countdown);
      this.countdown = null;
    }
  }

  showDetailedInfo() {
    // 显示详细信息的悬停效果
    if (this.indicator) {
      this.indicator.style.minWidth = '250px';
      this.indicator.innerHTML += '<br><small>悬停查看详情</small>';
    }
  }

  hideDetailedInfo() {
    // 隐藏详细信息
    if (this.indicator) {
      this.indicator.style.minWidth = '200px';
    }
  }

  remove() {
    this.clearCountdown();
    if (this.indicator && this.indicator.parentNode) {
      this.indicator.parentNode.removeChild(this.indicator);
      this.indicator = null;
      this.isVisible = false;
    }
  }
}

// 旋转控制器
class RotationController {
  constructor() {
    this.animationManager = new AnimationManager();
    this.statusIndicator = new StatusIndicator();
    this.isActive = false;
    this.currentPhase = 'idle'; // idle, left, right
    this.settings = {
      rotationAngle: 15,
      rotationDuration: 30000,
      showIndicator: true
    };
  }

  async executeRotationSequence(payload) {
    if (this.isActive) {
      console.log('Rotation sequence already active, skipping');
      return { success: false, message: 'Already active' };
    }

    try {
      this.isActive = true;

      // 更新设置
      if (payload) {
        this.settings = { ...this.settings, ...payload };
      }

      const { rotationAngle, rotationDuration, showIndicator } = this.settings;
      const stepDuration = rotationDuration / 3; // 每个步骤的时长

      console.log('Starting rotation sequence:', this.settings);

      // 显示状态指示器
      if (showIndicator) {
        this.statusIndicator.show('颈椎锻炼开始...', rotationDuration);
      }

      // 步骤1: 左旋转
      this.currentPhase = 'left';
      if (showIndicator) {
        this.statusIndicator.show(`向左旋转 ${rotationAngle}°`, stepDuration);
      }
      await this.animationManager.rotateToAngle(-rotationAngle);
      await this.delay(stepDuration);

      // 步骤2: 右旋转
      this.currentPhase = 'right';
      if (showIndicator) {
        this.statusIndicator.show(`向右旋转 ${rotationAngle}°`, stepDuration);
      }
      await this.animationManager.rotateToAngle(rotationAngle);
      await this.delay(stepDuration);

      // 步骤3: 恢复正常
      this.currentPhase = 'reset';
      if (showIndicator) {
        this.statusIndicator.show('恢复正常位置', stepDuration);
      }
      await this.animationManager.reset();
      await this.delay(stepDuration);

      // 完成
      this.currentPhase = 'idle';
      this.isActive = false;

      if (showIndicator) {
        this.statusIndicator.show('颈椎锻炼完成！', 2000);
        setTimeout(() => {
          this.statusIndicator.hide();
        }, 2000);
      }

      console.log('Rotation sequence completed successfully');
      return {
        success: true,
        currentAngle: this.animationManager.getCurrentAngle(),
        phase: this.currentPhase
      };

    } catch (error) {
      console.error('Rotation sequence failed:', error);
      this.isActive = false;
      this.currentPhase = 'idle';

      if (this.settings.showIndicator) {
        this.statusIndicator.show('锻炼过程出现错误', 3000);
        setTimeout(() => {
          this.statusIndicator.hide();
        }, 3000);
      }

      return { success: false, error: error.message };
    }
  }

  async stop() {
    this.isActive = false;
    this.currentPhase = 'idle';
    this.statusIndicator.hide();
    await this.animationManager.reset();
    console.log('Rotation stopped and reset');
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStatus() {
    return {
      isActive: this.isActive,
      currentPhase: this.currentPhase,
      currentAngle: this.animationManager.getCurrentAngle()
    };
  }
}

// 兼容性检测
class CompatibilityHandler {
  static checkCompatibility() {
    // 检查CSS Transform支持
    const testElement = document.createElement('div');
    const transformSupported = 'transform' in testElement.style ||
                              'webkitTransform' in testElement.style ||
                              'mozTransform' in testElement.style;

    // 检查页面类型
    const isSpecialPage = window.location.protocol === 'chrome-extension:' ||
                         window.location.protocol === 'chrome:' ||
                         window.location.protocol === 'moz-extension:';

    return {
      transformSupported,
      isSpecialPage,
      isCompatible: transformSupported && !isSpecialPage
    };
  }
}

// 用户体验保护
class UXProtection {
  static isUserInteracting() {
    // 检测用户是否正在输入
    const activeElement = document.activeElement;
    const isInputActive = activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.contentEditable === 'true'
    );

    // 检测视频播放
    const videos = document.querySelectorAll('video');
    const isVideoPlaying = Array.from(videos).some(video => !video.paused);

    return isInputActive || isVideoPlaying;
  }
}

// 初始化Content Script
const rotationController = new RotationController();

// 消息监听器
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message.type, message);

  // 检查兼容性
  const compatibility = CompatibilityHandler.checkCompatibility();
  if (!compatibility.isCompatible) {
    console.warn('Page not compatible with rotation:', compatibility);
    sendResponse({
      success: false,
      error: 'Page not compatible',
      compatibility
    });
    return;
  }

  // 处理消息
  switch (message.type) {
  case MessageTypes.EXECUTE_SEQUENCE: {
    // 检查用户体验保护
    if (UXProtection.isUserInteracting()) {
      console.log('User is interacting, delaying rotation');
      setTimeout(() => {
        rotationController.executeRotationSequence(message.payload)
          .then(response => {
            // 异步响应已经太晚，这里只记录日志
            console.log('Delayed rotation completed:', response);
          });
      }, 5000); // 延迟5秒

      sendResponse({ success: true, message: 'Rotation delayed due to user interaction' });
    } else {
      rotationController.executeRotationSequence(message.payload)
        .then(response => {
          sendResponse(response);
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      return true; // 异步响应
    }
    break;
  }

  case MessageTypes.STOP_ROTATION: {
    rotationController.stop()
      .then(() => {
        sendResponse({ success: true });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // 异步响应
  }

  case MessageTypes.UPDATE_STATUS: {
    const status = rotationController.getStatus();
    sendResponse({ success: true, status });
    break;
  }

  default: {
    console.warn('Unknown message type in content script:', message.type);
    sendResponse({ success: false, error: 'Unknown message type' });
  }
  }
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
  rotationController.stop();
});

console.log('Neck Therapy Extension Content Script loaded');
console.log('Page compatibility:', CompatibilityHandler.checkCompatibility());
