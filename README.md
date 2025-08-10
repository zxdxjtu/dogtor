# Neck Therapy Assistant

<div align="center">
  <img src="images/dogtor.png" alt="Neck Therapy Assistant Logo" width="128" height="128">
  <h3>A Chrome Extension for Cervical Spine Health</h3>
  <p>Help prevent neck strain through periodic webpage rotation exercises</p>
</div>

## 🌟 Overview

Neck Therapy Assistant is a Chrome extension designed to help computer users maintain cervical spine health through periodic webpage rotation exercises. By automatically rotating webpage content at customizable intervals, it encourages users to change their head posture, reducing the risk of neck strain from prolonged computer use.

## ✨ Features

### 🔄 Automatic Rotation Cycle
- **Periodic Exercise**: Automatically triggers rotation sequences every 10 minutes (customizable 1-60 minutes)
- **Three-Phase Rotation**: Left rotation (15°) → Right rotation (15°) → Return to normal
- **Smooth Animation**: CSS transform-based smooth transitions for comfortable viewing

### ⚙️ Customizable Settings
- **Rotation Frequency**: Adjust cycle duration from 1 to 60 minutes
- **Rotation Duration**: Set individual rotation time from 10 to 120 seconds
- **Rotation Angle**: Customize rotation degree (default 15°)
- **Visual Indicators**: Toggle status indicators on/off

### 🌐 Universal Compatibility
- **Cross-Site Support**: Works on any website without interference
- **Dynamic Content**: Compatible with dynamically updated pages
- **Complex Layouts**: Maintains page structure integrity
- **iframe Support**: Handles embedded content properly

### 🎛️ User Control
- **One-Click Toggle**: Easy enable/disable through popup interface
- **Real-Time Status**: Live countdown and rotation progress display
- **Smart Interruption**: Pauses during user input or video playback
- **Persistent Settings**: Remembers preferences across browser sessions

### 📊 Status Monitoring
- **Visual Indicators**: Unobtrusive status display in corner
- **Progress Tracking**: Real-time countdown and phase indicators
- **Detailed Information**: Hover for comprehensive status details
- **Error Handling**: Graceful degradation on incompatible pages

## 🚀 Quick Start

### Installation

1. **Download the Extension**
   ```bash
   git clone https://github.com/your-username/neck-therapy-extension.git
   cd neck-therapy-extension
   ```

2. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the extension folder
   - The Neck Therapy Assistant icon will appear in your toolbar

3. **Start Using**
   - Click the extension icon to open the control panel
   - Toggle the switch to enable automatic rotations
   - Customize settings in the options page if needed

### Basic Usage

1. **Enable the Extension**: Click the toolbar icon and toggle the switch
2. **Monitor Status**: Watch the countdown timer for next rotation
3. **Adjust Settings**: Access options through the gear icon
4. **Pause When Needed**: The extension automatically pauses during user interaction

## 🏗️ Technical Architecture

### Core Components

- **Service Worker**: Manages timers, state coordination, and message routing
- **Content Script**: Handles DOM manipulation and rotation animations
- **Popup Interface**: Provides user controls and real-time status
- **Options Page**: Advanced settings and customization

### Technology Stack

- **Manifest V3**: Latest Chrome extension architecture
- **Chrome Alarms API**: Reliable timer management
- **CSS Transform**: Hardware-accelerated smooth animations
- **Chrome Storage API**: Persistent settings and state management

### Key Features

- **Service Worker Lifecycle**: Robust handling of background script limitations
- **Cross-Tab Synchronization**: Consistent state across browser tabs
- **Error Recovery**: Automatic reconnection and state restoration
- **Performance Optimization**: Minimal resource usage and smooth animations

## 📁 Project Structure

```
neck-therapy-extension/
├── manifest.json              # Extension configuration
├── background/
│   └── service-worker.js      # Background script (Service Worker)
├── content/
│   └── content-script.js      # Content script for DOM manipulation
├── popup/
│   ├── popup.html            # Popup interface
│   ├── popup.css             # Popup styling
│   └── popup.js              # Popup functionality
├── options/
│   ├── options.html          # Options page
│   ├── options.css           # Options styling
│   └── options.js            # Options functionality
├── icons/                    # Extension icons
├── images/                   # Assets and logos
├── utils/                    # Shared utilities
└── docs/                     # Documentation
```

## 🔧 Development

### Prerequisites

- Chrome Browser (latest version)
- Basic knowledge of JavaScript, HTML, CSS
- Understanding of Chrome Extension APIs

### Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/neck-therapy-extension.git
   cd neck-therapy-extension
   ```

2. **Load in Developer Mode**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

3. **Make Changes**
   - Edit source files as needed
   - Click "Reload" button in extensions page to apply changes

### Testing

The project includes comprehensive test suites:

- **Unit Tests**: Core functionality testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user workflow testing
- **Compatibility Tests**: Cross-site functionality verification

Run tests by opening the test HTML files in your browser.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Your Changes**
4. **Add Tests** for new functionality
5. **Commit Your Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add comprehensive tests for new features
- Update documentation for API changes
- Ensure cross-browser compatibility
- Test on various websites and scenarios

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Chrome Extension documentation and community
- CSS Transform and Animation specifications
- Ergonomic research on computer-related neck strain
- Open source contributors and testers

## 📞 Support

If you encounter any issues or have questions:

- **Issues**: [GitHub Issues](https://github.com/your-username/neck-therapy-extension/issues)
- **Documentation**: [Project Wiki](https://github.com/your-username/neck-therapy-extension/wiki)
- **Email**: support@neck-therapy-extension.com

## 🔮 Roadmap

- [ ] **Multi-language Support**: Internationalization for global users
- [ ] **Advanced Analytics**: Detailed usage statistics and health insights
- [ ] **Exercise Variations**: Additional neck exercise patterns
- [ ] **Integration**: Compatibility with other health and productivity tools
- [ ] **Mobile Support**: Extension for mobile browsers

---

<div align="center">
  <p>Made with ❤️ for healthier computing</p>
  <p>⭐ Star this repo if it helps you maintain better neck health!</p>
</div>