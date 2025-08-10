# Quick Start Guide

## 🚀 Get Started in 3 Minutes

Welcome to Neck Therapy Assistant! This guide will help you install and start using the extension immediately.

## 📦 Installation

### Method 1: Load from Source (Recommended for Development)

1. **Download the Extension**
   ```bash
   git clone https://github.com/your-username/neck-therapy-extension.git
   cd neck-therapy-extension
   ```

2. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in your address bar
   - Or go to Chrome Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `neck-therapy-extension` folder
   - The extension icon should appear in your toolbar

### Method 2: Chrome Web Store (Coming Soon)

- Visit the Chrome Web Store
- Search for "Neck Therapy Assistant"
- Click "Add to Chrome"

## ⚡ First Use

### 1. Activate the Extension

1. **Click the Extension Icon** in your Chrome toolbar
2. **Toggle the Switch** to enable automatic rotations
3. **See the Status** - You'll see "Next reminder: X minutes"

### 2. Experience Your First Rotation

- Wait for the countdown to reach zero (or set a shorter interval for testing)
- Watch as your webpage gently rotates:
  - **Left rotation** (15°) for 30 seconds
  - **Right rotation** (15°) for 30 seconds  
  - **Return to normal** position
- Follow the rotation with your head to exercise your neck

### 3. Monitor Progress

- **Status Indicator**: Small indicator in the top-right corner of pages
- **Countdown Timer**: Shows time until next rotation
- **Phase Display**: Shows current rotation phase (left/right/normal)

## ⚙️ Basic Settings

### Access Settings

1. Click the extension icon
2. Click the gear (⚙️) icon to open options
3. Or right-click the extension icon → "Options"

### Key Settings

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| **Rotation Frequency** | 10 minutes | 1-60 minutes | How often rotations occur |
| **Rotation Duration** | 30 seconds | 10-120 seconds | How long each rotation lasts |
| **Rotation Angle** | 15 degrees | 5-45 degrees | How much the page rotates |
| **Show Indicator** | On | On/Off | Display status indicator |

### Quick Adjustments

- **For Testing**: Set frequency to 1 minute
- **For Intensive Work**: Set frequency to 30-60 minutes
- **For Sensitive Users**: Reduce angle to 10 degrees
- **For Discrete Use**: Turn off status indicator

## 🎯 Usage Tips

### Best Practices

1. **Start Gradually**
   - Begin with default settings (10 min frequency, 15° angle)
   - Adjust based on comfort and work patterns

2. **Follow the Rotation**
   - Move your head to follow the screen rotation
   - This provides the neck exercise benefit
   - Don't fight the rotation - work with it

3. **Timing Considerations**
   - Enable during long work sessions
   - Disable during video calls or presentations
   - Use shorter intervals during intensive computer work

### Smart Features

- **Auto-Pause**: Automatically pauses during:
  - Text input (typing in forms)
  - Video playback
  - User interaction with page elements

- **Cross-Tab Sync**: Settings and status sync across all browser tabs

- **Memory**: Remembers your preferences between browser sessions

## 🔧 Troubleshooting

### Common Issues

**Extension not working on some pages?**
- Some special pages (chrome://, extension pages) are restricted
- This is normal browser security behavior

**Rotation feels too sudden?**
- The rotation uses smooth CSS transitions
- If it feels abrupt, try reducing the rotation angle

**Want to pause temporarily?**
- Click the extension icon and toggle off
- Or simply start typing - it will auto-pause

**Settings not saving?**
- Make sure to click "Save" in the options page
- Check that Chrome has permission to store data

### Reset to Defaults

1. Open the options page
2. Click "Reset to Defaults"
3. Confirm the reset
4. All settings return to original values

## 📱 Keyboard Shortcuts

| Action | Shortcut | Description |
|--------|----------|-------------|
| Toggle Extension | `Ctrl+Shift+N` | Quick enable/disable |
| Open Options | `Ctrl+Shift+O` | Open settings page |
| Force Rotation | `Ctrl+Shift+R` | Trigger immediate rotation |

*Note: Shortcuts can be customized in Chrome's extension shortcuts settings*

## 🎨 Customization

### Visual Preferences

- **Status Indicator Position**: Top-right corner (fixed)
- **Indicator Style**: Dark theme with transparency
- **Animation Speed**: 2-second smooth transitions

### Advanced Settings

- **Rotation Origin**: Center of viewport
- **Transition Timing**: Ease-in-out curve
- **Z-Index**: High priority to stay visible

## 📊 Understanding Status

### Status Indicator States

- **Green Dot**: Extension active, waiting for next rotation
- **Blue Dot**: Rotation in progress
- **Orange Dot**: Paused (user interaction detected)
- **Red Dot**: Error or incompatible page
- **No Dot**: Extension disabled

### Popup Information

- **Next Reminder**: Countdown to next rotation
- **Total Today**: Number of rotations completed
- **Session Time**: How long extension has been active
- **Current Status**: Active/Paused/Disabled

## 🔄 Updates

### Automatic Updates

- Chrome automatically updates extensions from the Web Store
- For development versions, manually reload in `chrome://extensions/`

### Manual Update (Development)

1. Pull latest changes: `git pull origin main`
2. Go to `chrome://extensions/`
3. Click the reload button for Neck Therapy Assistant

## 🆘 Need Help?

- **Documentation**: [Full README](README.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/neck-therapy-extension/issues)
- **Email**: support@neck-therapy-extension.com

---

**🎉 You're all set!** Start browsing and let the extension help you maintain better neck health through gentle, periodic exercises.

*Remember: The goal is to encourage natural head movement that counteracts the static posture of computer use.*