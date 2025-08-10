# 颈椎治疗助手

<div align="center">
  <img src="images/dogtor.png" alt="颈椎治疗助手Logo" width="128" height="128">
  <h3>专为颈椎健康设计的Chrome扩展</h3>
  <p>通过周期性网页旋转锻炼预防颈椎劳损</p>
</div>

## 🌟 项目概述

颈椎治疗助手是一款专为电脑用户设计的Chrome扩展程序，通过周期性旋转网页内容来帮助用户进行颈椎锻炼。通过自动旋转网页内容，引导用户改变头部姿势，有效减少长时间使用电脑导致的颈椎问题。

## ✨ 核心功能

### 🔄 自动旋转周期
- **周期性锻炼**：每10分钟自动触发旋转序列（可自定义1-60分钟）
- **三阶段旋转**：左旋转(15°) → 右旋转(15°) → 恢复正常
- **平滑动画**：基于CSS transform的流畅过渡效果

### ⚙️ 个性化设置
- **旋转频率**：调整周期时长，范围1-60分钟
- **旋转时长**：设置单次旋转时间，范围10-120秒
- **旋转角度**：自定义旋转度数（默认15°）
- **视觉指示器**：可开关状态提示显示

### 🌐 全网站兼容
- **跨站点支持**：在任何网站上都能正常工作，不影响浏览体验
- **动态内容**：兼容动态更新的页面内容
- **复杂布局**：保持页面结构完整性
- **iframe支持**：正确处理嵌入式内容

### 🎛️ 用户控制
- **一键开关**：通过弹窗界面轻松启用/禁用
- **实时状态**：显示倒计时和旋转进度
- **智能暂停**：在用户输入或视频播放时自动暂停
- **设置持久化**：跨浏览器会话记住用户偏好

### 📊 状态监控
- **视觉指示器**：页面角落的不显眼状态显示
- **进度跟踪**：实时倒计时和阶段指示器
- **详细信息**：悬停显示完整状态详情
- **错误处理**：在不兼容页面上优雅降级

## 🚀 快速开始

### 安装步骤

1. **下载扩展程序**
   ```bash
   git clone https://github.com/your-username/neck-therapy-extension.git
   cd neck-therapy-extension
   ```

2. **在Chrome中加载**
   - 打开Chrome浏览器，访问 `chrome://extensions/`
   - 在右上角启用"开发者模式"
   - 点击"加载已解压的扩展程序"，选择扩展文件夹
   - 颈椎治疗助手图标将出现在工具栏中

3. **开始使用**
   - 点击扩展图标打开控制面板
   - 切换开关以启用自动旋转
   - 如需要可在选项页面自定义设置

### 基本使用

1. **启用扩展**：点击工具栏图标并切换开关
2. **监控状态**：观察下次旋转的倒计时
3. **调整设置**：通过齿轮图标访问选项
4. **智能暂停**：扩展会在用户交互时自动暂停

## 🏗️ 技术架构

### 核心组件

- **Service Worker**：管理定时器、状态协调和消息路由
- **Content Script**：处理DOM操作和旋转动画
- **弹窗界面**：提供用户控制和实时状态显示
- **选项页面**：高级设置和个性化配置

### 技术栈

- **Manifest V3**：最新的Chrome扩展架构
- **Chrome Alarms API**：可靠的定时器管理
- **CSS Transform**：硬件加速的平滑动画
- **Chrome Storage API**：持久化设置和状态管理

### 技术特色

- **Service Worker生命周期**：稳健处理后台脚本限制
- **跨标签页同步**：浏览器标签页间的一致状态
- **错误恢复**：自动重连和状态恢复
- **性能优化**：最小资源使用和流畅动画

## 📁 项目结构

```
neck-therapy-extension/
├── manifest.json              # 扩展配置文件
├── background/
│   └── service-worker.js      # 后台脚本 (Service Worker)
├── content/
│   └── content-script.js      # 内容脚本，用于DOM操作
├── popup/
│   ├── popup.html            # 弹窗界面
│   ├── popup.css             # 弹窗样式
│   └── popup.js              # 弹窗功能
├── options/
│   ├── options.html          # 选项页面
│   ├── options.css           # 选项样式
│   └── options.js            # 选项功能
├── icons/                    # 扩展图标
├── images/                   # 资源和Logo
├── utils/                    # 共享工具
└── docs/                     # 文档
```

## 🔧 开发指南

### 开发环境要求

- Chrome浏览器（最新版本）
- JavaScript、HTML、CSS基础知识
- Chrome扩展API了解

### 开发环境设置

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/neck-therapy-extension.git
   cd neck-therapy-extension
   ```

2. **以开发者模式加载**
   - 打开 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"，选择项目文件夹

3. **进行修改**
   - 根据需要编辑源文件
   - 在扩展页面点击"重新加载"按钮应用更改

### 测试

项目包含完整的测试套件：

- **单元测试**：核心功能测试
- **集成测试**：组件交互测试
- **端到端测试**：完整用户流程测试
- **兼容性测试**：跨站点功能验证

在浏览器中打开测试HTML文件即可运行测试。

## 🤝 贡献指南

我们欢迎贡献！请按照以下步骤：

1. **Fork仓库**
2. **创建功能分支**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **进行更改**
4. **为新功能添加测试**
5. **提交更改**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **推送到分支**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **创建Pull Request**

### 开发规范

- 遵循现有代码风格和约定
- 为新功能添加完整测试
- 更新API变更的文档
- 确保跨浏览器兼容性
- 在各种网站和场景下测试

## 📄 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- **Trae Hackathon Hangzhou** - 特别感谢为本项目提供平台和支持
- Chrome扩展文档和社区
- CSS Transform和动画规范
- 计算机相关颈椎劳损的人体工程学研究
- 开源贡献者和测试人员

## 📋 项目文档

详细的项目文档和开发见解，请访问：
[项目文档](https://tcn0t06t3c8f.feishu.cn/docx/N7Q8dVXutokDkmx0snJcYheSnuf)

## 📞 支持

如果您遇到任何问题或有疑问：

- **问题反馈**：[GitHub Issues](https://github.com/your-username/neck-therapy-extension/issues)
- **文档**：[项目Wiki](https://github.com/your-username/neck-therapy-extension/wiki)
- **邮箱**：support@neck-therapy-extension.com

## 🔮 发展路线图

- [ ] **多语言支持**：为全球用户提供国际化
- [ ] **高级分析**：详细的使用统计和健康洞察
- [ ] **锻炼变化**：额外的颈椎锻炼模式
- [ ] **集成功能**：与其他健康和生产力工具的兼容性
- [ ] **移动支持**：移动浏览器扩展

---

<div align="center">
  <p>用❤️为更健康的计算体验而制作</p>
  <p>⭐ 如果这个项目帮助您保持更好的颈椎健康，请给我们一个星标！</p>
</div>