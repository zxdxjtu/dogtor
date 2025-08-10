# 颈椎治疗浏览器插件设计文档

## 概述

### 项目简介
颈椎治疗浏览器插件是一个Chrome扩展程序，通过周期性旋转网页内容来帮助用户进行颈椎锻炼。该插件利用CSS transform属性实现平滑的网页旋转动画，通过定时器控制旋转周期，为长时间使用电脑的用户提供颈椎保健功能。

### 核心价值
- **健康导向**：通过技术手段促进用户颈椎健康
- **无侵入性**：不影响用户正常浏览体验
- **高度可定制**：支持个性化设置以适应不同用户需求
- **跨网站兼容**：在任何网站上都能正常工作

### 技术栈选择
基于Chrome Manifest V3规范开发，采用以下技术栈：<mcreference link="https://alejandro-ao.com/how-to-create-a-chrome-extension-with-manifest-v3/" index="2">2</mcreference>
- **扩展架构**：Manifest V3
- **后台处理**：Service Worker替代传统background scripts<mcreference link="https://developer.chrome.com/docs/extensions/develop/migrate/to-service-workers" index="3">3</mcreference>
- **内容注入**：Content Scripts
- **用户界面**：HTML/CSS/JavaScript popup
- **数据存储**：Chrome Storage API
- **动画实现**：CSS Transform + Transitions<mcreference link="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate" index="1">1</mcreference>

## 系统架构

### 整体架构图
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Popup UI      │    │ Service Worker  │    │ Content Script  │
│                 │    │                 │    │                 │
│ - 开关控制      │◄──►│ - 定时器管理    │◄──►│ - DOM操作       │
│ - 设置界面      │    │ - 状态管理      │    │ - 旋转动画      │
│ - 状态显示      │    │ - 消息路由      │    │ - 状态指示器    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   │
                          ┌─────────────────┐
                          │ Chrome Storage  │
                          │                 │
                          │ - 用户设置      │
                          │ - 运行状态      │
                          │ - 统计数据      │
                          └─────────────────┘
```

### 组件职责分工

#### Service Worker (background.js)
- **定时器管理**：使用Chrome Alarms API替代setInterval，避免Service Worker休眠问题<mcreference link="https://developer.chrome.com/docs/extensions/develop/migrate/to-service-workers" index="3">3</mcreference>
- **状态协调**：管理全局插件状态和跨标签页同步
- **消息路由**：处理popup和content script之间的通信
- **数据持久化**：管理用户设置和运行状态的存储

#### Content Script (content.js)
- **DOM操作**：对网页元素应用CSS transform
- **动画执行**：实现平滑的旋转过渡效果
- **状态指示器**：显示当前旋转状态和倒计时
- **事件监听**：响应来自Service Worker的控制指令

#### Popup Interface (popup.html/js)
- **用户控制**：提供开关和设置界面
- **实时反馈**：显示当前状态和下次旋转时间
- **设置管理**：允许用户自定义旋转参数

## 组件和接口设计

### 核心组件详细设计

#### 1. 旋转控制器 (RotationController)
```javascript
class RotationController {
  constructor() {
    this.isActive = false;
    this.currentPhase = 'idle'; // idle, left, right
    this.settings = {
      cycleDuration: 10 * 60 * 1000, // 10分钟
      rotationDuration: 30 * 1000,   // 30秒
      rotationAngle: 15               // 15度
    };
  }

  // 启动旋转周期
  start() {
    this.scheduleNextRotation();
  }

  // 停止旋转并恢复正常
  stop() {
    this.resetRotation();
    chrome.alarms.clear('rotationCycle');
  }

  // 执行旋转序列
  executeRotationSequence() {
    this.rotateLeft()
      .then(() => this.rotateRight())
      .then(() => this.resetRotation())
      .then(() => this.scheduleNextRotation());
  }
}
```

#### 2. 动画管理器 (AnimationManager)
基于CSS Transform和Transition实现平滑动画：<mcreference link="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions" index="2">2</mcreference>

```javascript
class AnimationManager {
  constructor() {
    this.targetElement = document.documentElement;
    this.setupTransition();
  }

  setupTransition() {
    // 应用平滑过渡效果
    this.targetElement.style.transition = 'transform 2s ease-in-out';
    this.targetElement.style.transformOrigin = 'center center';
  }

  rotateToAngle(angle) {
    return new Promise((resolve) => {
      this.targetElement.style.transform = `rotate(${angle}deg)`;
      
      // 监听过渡完成事件
      const handleTransitionEnd = () => {
        this.targetElement.removeEventListener('transitionend', handleTransitionEnd);
        resolve();
      };
      
      this.targetElement.addEventListener('transitionend', handleTransitionEnd);
    });
  }
}
```

#### 3. 状态指示器 (StatusIndicator)
```javascript
class StatusIndicator {
  constructor() {
    this.indicator = this.createIndicator();
    this.countdown = null;
  }

  createIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'neck-therapy-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: Arial, sans-serif;
      font-size: 12px;
      display: none;
    `;
    document.body.appendChild(indicator);
    return indicator;
  }

  show(message, duration = null) {
    this.indicator.textContent = message;
    this.indicator.style.display = 'block';
    
    if (duration) {
      this.startCountdown(duration);
    }
  }

  hide() {
    this.indicator.style.display = 'none';
    this.clearCountdown();
  }
}
```

### 消息传递接口

#### Service Worker ↔ Content Script
```javascript
// 消息类型定义
const MessageTypes = {
  START_ROTATION: 'start_rotation',
  STOP_ROTATION: 'stop_rotation',
  EXECUTE_SEQUENCE: 'execute_sequence',
  UPDATE_STATUS: 'update_status',
  SETTINGS_CHANGED: 'settings_changed'
};

// 消息格式
interface Message {
  type: string;
  payload?: any;
  timestamp: number;
}
```

#### Popup ↔ Service Worker
```javascript
// 设置更新消息
interface SettingsUpdateMessage {
  type: 'update_settings';
  payload: {
    cycleDuration: number;
    rotationDuration: number;
    rotationAngle: number;
  };
}

// 状态查询消息
interface StatusQueryMessage {
  type: 'get_status';
  payload: null;
}
```

## 数据模型

### 用户设置模型
```javascript
interface UserSettings {
  // 基础设置
  isEnabled: boolean;           // 插件是否启用
  cycleDuration: number;        // 旋转周期（毫秒）
  rotationDuration: number;     // 单次旋转时长（毫秒）
  rotationAngle: number;        // 旋转角度（度）
  
  // 高级设置
  showIndicator: boolean;       // 是否显示状态指示器
  enableSound: boolean;         // 是否启用声音提示
  excludedDomains: string[];    // 排除的域名列表
  
  // 元数据
  version: string;              // 设置版本
  lastModified: number;         // 最后修改时间
}
```

### 运行状态模型
```javascript
interface RuntimeState {
  // 当前状态
  isActive: boolean;            // 是否正在运行
  currentPhase: 'idle' | 'left' | 'right'; // 当前阶段
  nextRotationTime: number;     // 下次旋转时间戳
  
  // 统计信息
  totalRotations: number;       // 总旋转次数
  todayRotations: number;       // 今日旋转次数
  lastRotationTime: number;     // 上次旋转时间
  
  // 会话信息
  sessionStartTime: number;     // 会话开始时间
  activeTabId: number;          // 当前活动标签页ID
}
```

### 存储架构
```javascript
// Chrome Storage 结构
const StorageSchema = {
  // 同步存储（跨设备）
  sync: {
    'user_settings': UserSettings,
    'statistics': {
      totalRotations: number,
      installDate: number,
      lastActiveDate: number
    }
  },
  
  // 本地存储（设备特定）
  local: {
    'runtime_state': RuntimeState,
    'session_data': {
      startTime: number,
      rotationCount: number
    }
  }
};
```

## 错误处理

### 错误分类和处理策略

#### 1. 网页兼容性错误
```javascript
class CompatibilityHandler {
  static checkPageCompatibility() {
    try {
      // 检查是否可以访问document.documentElement
      if (!document.documentElement) {
        throw new Error('Cannot access document element');
      }
      
      // 检查CSS transform支持
      const testElement = document.createElement('div');
      if (typeof testElement.style.transform === 'undefined') {
        throw new Error('CSS transform not supported');
      }
      
      return { compatible: true };
    } catch (error) {
      return { 
        compatible: false, 
        reason: error.message,
        fallback: 'disable_rotation'
      };
    }
  }
}
```

#### 2. 定时器失效处理
```javascript
class TimerFallbackHandler {
  constructor() {
    this.backupTimer = null;
    this.lastHeartbeat = Date.now();
  }
  
  // 使用Chrome Alarms API作为主要定时器
  setupPrimaryTimer(interval) {
    chrome.alarms.create('rotationCycle', {
      delayInMinutes: interval / (1000 * 60),
      periodInMinutes: interval / (1000 * 60)
    });
  }
  
  // 设置备用定时器检测
  setupFallbackDetection() {
    this.backupTimer = setInterval(() => {
      const now = Date.now();
      if (now - this.lastHeartbeat > 70000) { // 超过70秒无心跳
        this.handleTimerFailure();
      }
    }, 30000);
  }
}
```

#### 3. 用户体验保护
```javascript
class UXProtection {
  static preventDisruption() {
    // 检测用户是否正在输入
    const activeElement = document.activeElement;
    if (activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.contentEditable === 'true'
    )) {
      return { shouldDelay: true, reason: 'user_typing' };
    }
    
    // 检测是否有视频播放
    const videos = document.querySelectorAll('video');
    for (let video of videos) {
      if (!video.paused) {
        return { shouldDelay: true, reason: 'video_playing' };
      }
    }
    
    return { shouldDelay: false };
  }
}
```

## 测试策略

### 单元测试

#### 1. 核心功能测试
```javascript
describe('RotationController', () => {
  let controller;
  
  beforeEach(() => {
    controller = new RotationController();
  });
  
  test('should initialize with correct default settings', () => {
    expect(controller.settings.cycleDuration).toBe(600000);
    expect(controller.settings.rotationDuration).toBe(30000);
    expect(controller.settings.rotationAngle).toBe(15);
  });
  
  test('should start rotation cycle', async () => {
    const spy = jest.spyOn(chrome.alarms, 'create');
    await controller.start();
    expect(spy).toHaveBeenCalledWith('rotationCycle', expect.any(Object));
  });
});
```

#### 2. 动画测试
```javascript
describe('AnimationManager', () => {
  let animationManager;
  let mockElement;
  
  beforeEach(() => {
    mockElement = {
      style: {},
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };
    document.documentElement = mockElement;
    animationManager = new AnimationManager();
  });
  
  test('should apply rotation transform', async () => {
    await animationManager.rotateToAngle(15);
    expect(mockElement.style.transform).toBe('rotate(15deg)');
  });
});
```

### 集成测试

#### 1. 跨组件通信测试
```javascript
describe('Message Passing Integration', () => {
  test('should handle start rotation message', async () => {
    const mockSendResponse = jest.fn();
    const message = {
      type: 'START_ROTATION',
      payload: { angle: 15 }
    };
    
    await handleMessage(message, {}, mockSendResponse);
    expect(mockSendResponse).toHaveBeenCalledWith({ success: true });
  });
});
```

#### 2. 存储集成测试
```javascript
describe('Storage Integration', () => {
  test('should save and retrieve user settings', async () => {
    const settings = {
      cycleDuration: 300000,
      rotationDuration: 20000,
      rotationAngle: 10
    };
    
    await saveSettings(settings);
    const retrieved = await loadSettings();
    expect(retrieved).toEqual(settings);
  });
});
```

### 端到端测试

#### 1. 完整旋转周期测试
```javascript
describe('Complete Rotation Cycle E2E', () => {
  test('should execute full rotation sequence', async () => {
    // 1. 启用插件
    await enableExtension();
    
    // 2. 等待第一次旋转
    await waitForRotation();
    
    // 3. 验证左旋转
    expect(getPageRotation()).toBe(15);
    
    // 4. 等待右旋转
    await waitForPhaseChange();
    expect(getPageRotation()).toBe(-15);
    
    // 5. 验证恢复正常
    await waitForPhaseChange();
    expect(getPageRotation()).toBe(0);
  });
});
```

#### 2. 跨网站兼容性测试
```javascript
describe('Cross-Site Compatibility E2E', () => {
  const testSites = [
    'https://www.google.com',
    'https://www.github.com',
    'https://www.stackoverflow.com'
  ];
  
  testSites.forEach(site => {
    test(`should work on ${site}`, async () => {
      await navigateToSite(site);
      await enableExtension();
      await waitForRotation();
      expect(getPageRotation()).not.toBe(0);
    });
  });
});
```

### 性能测试

#### 1. 内存使用测试
```javascript
describe('Memory Usage', () => {
  test('should not cause memory leaks', async () => {
    const initialMemory = await getMemoryUsage();
    
    // 运行100个旋转周期
    for (let i = 0; i < 100; i++) {
      await executeRotationCycle();
    }
    
    const finalMemory = await getMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;
    
    // 内存增长应该小于10MB
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
  });
});
```

#### 2. CPU使用测试
```javascript
describe('CPU Performance', () => {
  test('should have minimal CPU impact', async () => {
    const cpuBefore = await getCPUUsage();
    
    await runExtensionFor(60000); // 运行1分钟
    
    const cpuAfter = await getCPUUsage();
    const cpuIncrease = cpuAfter - cpuBefore;
    
    // CPU使用增长应该小于5%
    expect(cpuIncrease).toBeLessThan(0.05);
  });
});
```

## 实现计划

### 第一阶段：核心功能开发（1-2周）

#### 里程碑1.1：基础架构搭建
- [ ] 创建Manifest V3配置文件
- [ ] 实现Service Worker基础框架
- [ ] 建立Content Script注入机制
- [ ] 设置基础的消息传递系统

#### 里程碑1.2：旋转功能实现
- [ ] 开发RotationController核心类
- [ ] 实现AnimationManager动画系统
- [ ] 集成Chrome Alarms API定时器
- [ ] 完成基础的旋转序列逻辑

#### 里程碑1.3：用户界面开发
- [ ] 设计并实现Popup界面
- [ ] 添加开关控制功能
- [ ] 实现基础设置页面
- [ ] 集成状态显示功能

### 第二阶段：高级功能和优化（1-2周）

#### 里程碑2.1：高级设置
- [ ] 实现自定义旋转参数设置
- [ ] 添加排除域名功能
- [ ] 开发状态指示器
- [ ] 集成使用统计功能

#### 里程碑2.2：兼容性和错误处理
- [ ] 实现网页兼容性检测
- [ ] 添加定时器失效处理
- [ ] 开发用户体验保护机制
- [ ] 完善错误恢复逻辑

#### 里程碑2.3：性能优化
- [ ] 优化动画性能
- [ ] 减少内存占用
- [ ] 改进Service Worker生命周期管理
- [ ] 实现智能暂停机制

### 第三阶段：测试和发布准备（1周）

#### 里程碑3.1：全面测试
- [ ] 完成单元测试覆盖
- [ ] 执行集成测试
- [ ] 进行端到端测试
- [ ] 性能和兼容性测试

#### 里程碑3.2：发布准备
- [ ] 完善用户文档
- [ ] 准备Chrome Web Store资料
- [ ] 进行最终的代码审查
- [ ] 创建发布包

### 风险评估和缓解策略

#### 技术风险
1. **Service Worker生命周期管理**
   - 风险：Service Worker可能意外终止
   - 缓解：使用Chrome Alarms API + 心跳检测机制

2. **跨网站兼容性问题**
   - 风险：某些网站可能阻止CSS修改
   - 缓解：实现兼容性检测和优雅降级

3. **性能影响**
   - 风险：动画可能影响网页性能
   - 缓解：使用CSS硬件加速和智能暂停

#### 用户体验风险
1. **意外中断用户操作**
   - 风险：在用户输入时触发旋转
   - 缓解：实现用户活动检测和延迟机制

2. **视觉不适**
   - 风险：旋转可能引起用户不适
   - 缓解：提供角度和速度自定义选项

### 成功指标

#### 功能指标
- [ ] 在95%的主流网站上正常工作
- [ ] 旋转精度误差小于1度
- [ ] 定时器准确性误差小于5秒
- [ ] 设置保存成功率100%

#### 性能指标
- [ ] 内存使用增长小于5MB
- [ ] CPU使用增长小于3%
- [ ] 动画帧率保持在60fps
- [ ] Service Worker启动时间小于100ms

#### 用户体验指标
- [ ] 插件响应时间小于200ms
- [ ] 错误恢复成功率大于99%
- [ ] 用户设置保存成功率100%
- [ ] 跨标签页状态同步延迟小于1秒

这个设计文档为颈椎治疗浏览器插件提供了完整的技术实现方案，涵盖了从架构设计到测试策略的各个方面，确保项目能够按照需求文档的要求高质量地实现。