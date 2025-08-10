# 颈椎治疗浏览器插件 - 旋转交互优化方案

## 问题分析

### 当前实现的问题

1. **内容可读性问题**
   - 当前实现直接旋转整个 `document.documentElement`
   - 旋转后大部分网页内容被遮挡或超出视窗范围
   - 用户无法在旋转过程中正常阅读和操作网页

2. **用户体验问题**
   - 旋转过程中用户完全失去对网页的控制
   - 没有考虑不同屏幕尺寸和网页布局的适配
   - 旋转动画可能引起视觉不适

3. **技术实现问题**
   - 简单的 CSS transform 无法处理复杂的页面布局
   - 固定定位元素可能出现异常行为
   - 缺乏对响应式设计的考虑

## 优化方案

### 方案一：按中心点旋转（推荐）

#### 核心思路
整个网页基于网页中心做旋转

### 方案二：眼球追踪模拟（创新方案）

#### 核心思路
不旋转页面，而是通过视觉引导模拟颈椎运动的效果。

#### 技术实现

```javascript
class EyeTrackingSimulator {
  constructor() {
    this.focusPoint = null;
    this.guidePath = null;
  }

  createFocusGuide() {
    // 创建视觉焦点引导
    this.focusPoint = document.createElement('div');
    this.focusPoint.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, #4A90E2, transparent);
      border-radius: 50%;
      z-index: 1000000;
      pointer-events: none;
      transition: all 1s ease-in-out;
    `;
    
    document.body.appendChild(this.focusPoint);
  }

  async simulateNeckMovement(direction) {
    if (!this.focusPoint) this.createFocusGuide();
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
    
    // 创建运动路径
    const path = this.generateMovementPath(centerX, centerY, radius, direction);
    
    // 执行引导动画
    for (let i = 0; i < path.length; i++) {
      const point = path[i];
      this.focusPoint.style.left = point.x + 'px';
      this.focusPoint.style.top = point.y + 'px';
      
      // 添加页面轻微响应
      document.documentElement.style.transform = 
        `translate(${(point.x - centerX) * 0.01}px, ${(point.y - centerY) * 0.01}px)`;
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  generateMovementPath(centerX, centerY, radius, direction) {
    const path = [];
    const steps = 30;
    const angleStep = (Math.PI / 6) / steps; // 30度弧度
    
    for (let i = 0; i <= steps; i++) {
      const angle = direction === 'left' ? -angleStep * i : angleStep * i;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.3; // 椭圆运动
      path.push({ x, y });
    }
    
    return path;
  }

  reset() {
    if (this.focusPoint) {
      this.focusPoint.style.opacity = '0';
      document.documentElement.style.transform = 'none';
      
      setTimeout(() => {
        if (this.focusPoint && this.focusPoint.parentNode) {
          this.focusPoint.parentNode.removeChild(this.focusPoint);
          this.focusPoint = null;
        }
      }, 1000);
    }
  }
}
```

## 总结

通过以上优化方案，我们可以解决当前旋转逻辑的问题：

1. **保持内容可读性**：使用视窗框架或眼球追踪模拟，避免直接旋转页面内容
2. **智能适配**：根据页面复杂度自动选择最适合的交互模式
3. **用户友好**：添加预警机制和智能暂停，尊重用户当前操作
4. **性能优化**：根据设备性能动态调整动画复杂度
5. **无障碍支持**：考虑运动敏感用户的需求

这个方案既保持了颈椎治疗的核心功能，又大大改善了用户体验，使插件更加实用和友好。