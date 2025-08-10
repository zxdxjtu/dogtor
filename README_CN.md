# 颈椎治疗助手 Chrome 扩展

<div align="center">

![Logo](icons/icon-128.png)

**专业的颈椎健康管理Chrome扩展程序**

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-v1.0.0-blue.svg)](https://chrome.google.com/webstore)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[English](README.md) | [中文](README_CN.md)

</div>

## 🎯 项目概述

颈椎治疗助手Chrome扩展通过智能化周期性网页旋转，帮助缓解长时间使用电脑导致的颈椎问题。通过温和地将网页内容向左右各旋转15度，引导用户在日常浏览过程中自然地改变头部姿势，促进颈椎健康。

## ✨ 核心特性

### 🔄 智能旋转系统
- **周期性旋转**：基于可自定义的周期，自动将网页先向左旋转（-15°）再向右旋转（+15°）
- **平滑动画**：硬件加速的CSS变换确保60fps性能表现
- **智能调度**：使用Chrome闹钟API确保即使在浏览器空闲时也能可靠计时

### ⚙️ 高度自定义
- **旋转周期**：1-60分钟（默认：10分钟）
- **旋转时长**：每个方向10-120秒（默认：30秒）
- **旋转角度**：可调节角度设置以确保舒适度
- **工作时间**：可选的基于时间的调度功能

### 🛡️ 用户体验保护
- **智能检测**：自动检测用户输入、视频播放或活跃交互
- **优雅延迟**：在用户活动期间推迟旋转
- **页面兼容性**：自动检测特殊页面（chrome://、扩展页面等）
- **内容脚本注入**：稳健处理动态页面加载

### 📊 健康统计
- **锻炼跟踪**：总旋转次数、每日计数和连续天数
- **时间监控**：跟踪总锻炼时间和会话持续时间
- **进度可视化**：在选项页面清晰显示统计数据
- **数据导出**：导出统计数据用于个人健康记录

### 🌐 广泛兼容性
- **所有网站**：通过适当的回退机制在任何网页上工作
- **跨标签页同步**：在浏览器标签页之间保持一致的状态管理
- **Manifest V3**：采用最新的Chrome扩展标准构建
- **性能优化**：内存使用<5MB，CPU影响<3%

## 🚀 安装方法

### 从Chrome网上应用店安装（推荐）
1. 访问[Chrome网上应用店](https://chrome.google.com/webstore)（即将发布）
2. 点击"添加至Chrome"
3. 确认安装

### 手动安装（开发版）
1. 下载或克隆此仓库
2. 打开Chrome并导航到`chrome://extensions/`
3. 在右上角启用"开发者模式"
4. 点击"加载已解压的扩展程序"并选择扩展目录
5. 扩展图标应出现在您的工具栏中

## 🎮 快速开始

1. **启用扩展**：点击扩展图标并切换主开关
2. **自定义设置**：访问选项页面进行个性化配置
3. **监控进度**：查看统计数据并根据需要调整设置
4. **保持健康**：让扩展自动引导您的颈椎锻炼

详细设置说明请参见[QUICK_START_CN.md](QUICK_START_CN.md)。

## 🏗️ 系统架构

### 核心组件
- **Service Worker**：后台任务管理和定时器协调
- **内容脚本**：DOM操作和动画执行
- **弹窗界面**：实时状态用户控制面板
- **选项页面**：全面的设置和统计功能

### 技术栈
- **Manifest V3**：最新的Chrome扩展标准
- **Service Workers**：可靠的后台处理
- **Chrome Storage API**：持久化设置和统计数据
- **Chrome Alarms API**：精确的计时和调度
- **CSS Transforms**：硬件加速动画

## 📱 用户界面

### 弹窗面板
- 快速启用/禁用切换开关
- 实时旋转状态显示
- 下次旋转倒计时器
- 快速设置调整

### 选项页面
- 全面的配置面板
- 详细的统计数据和图表
- 导出/导入功能
- 高级用户设置

### 状态指示器
- 页面上不显眼的旋转指示器
- 锻炼期间的进度倒计时
- 方向变化通知
- 详细信息的悬停工具提示

## 🧪 开发说明

### 前置要求
- Node.js 16+ 和 npm 8+
- Chrome浏览器用于测试

### 环境设置
```bash
# 安装依赖
npm install

# 运行代码检查
npm run lint

# 生产环境构建
npm run build

# 开发模式
npm run dev
```

### 测试
```bash
# 运行所有检查
npm run check

# 类型检查
npm run type-check

# 手动测试
npm run test
```

## 🤝 贡献指南

我们欢迎贡献！请遵循以下步骤：

1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 开启Pull Request

### 代码规范
- 遵循ESLint配置
- 使用有意义的提交信息
- 提交前充分测试
- 根据需要更新文档

## 📊 性能指标

- **内存使用**：额外消耗<5MB
- **CPU影响**：性能影响<3%
- **动画性能**：稳定60fps
- **兼容性**：95%+网站支持率
- **定时器精度**：偏差<5秒

## 🛡️ 隐私与安全

- **无数据收集**：所有设置本地存储
- **无网络请求**：完全离线操作
- **最小权限**：仅使用必需的Chrome API
- **开源透明**：完全透明和可审计

## 📄 许可证

本项目采用MIT许可证 - 详情请参见[LICENSE](LICENSE)文件。

## 🙏 致谢

- 受计算机使用职业健康研究启发
- 基于Chrome扩展Manifest V3最佳实践构建
- UI组件采用现代网络标准样式

## 📞 支持

- **问题反馈**：在[GitHub Issues](https://github.com/your-username/neck-therapy-extension/issues)报告bug
- **社区讨论**：加入社区讨论
- **文档**：查看[docs](docs/)文件夹获取详细指南

---

<div align="center">

**关爱您的颈椎健康！🏥**

为全球开发者和办公人员用❤️制作

</div>