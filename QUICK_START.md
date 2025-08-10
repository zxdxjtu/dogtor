# Quick Start Guide

Welcome to the Neck Therapy Chrome Extension! This guide will help you get up and running quickly with your new neck health companion.

## 📋 Table of Contents

- [Installation](#-installation)
- [First Time Setup](#-first-time-setup)
- [Basic Usage](#-basic-usage)
- [Customizing Settings](#-customizing-settings)
- [Understanding the Interface](#-understanding-the-interface)
- [Troubleshooting](#-troubleshooting)
- [Tips for Best Results](#-tips-for-best-results)

## 🚀 Installation

### Method 1: Chrome Web Store (Coming Soon)
1. Visit the Chrome Web Store
2. Search for "Neck Therapy Extension"
3. Click **Add to Chrome**
4. Click **Add extension** when prompted

### Method 2: Manual Installation (Developer Mode)
1. Download the extension files from GitHub
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the downloaded extension folder
6. The extension icon ![icon](icons/icon-16.png) should appear in your toolbar

## 🎯 First Time Setup

### Step 1: Locate the Extension
- Look for the extension icon ![icon](icons/icon-16.png) in your Chrome toolbar
- If you don't see it, click the puzzle piece icon and pin the extension

### Step 2: Initial Configuration
1. Click the extension icon to open the popup
2. You'll see the main control panel with:
   - **Power switch** (currently OFF)
   - **Rotation angle setting** (default: 15°)
   - **Frequency setting** (default: 10 minutes)
   - **Status display**

### Step 3: Enable the Extension
1. Toggle the **main switch** to ON
2. The extension will start monitoring and begin your first rotation cycle
3. You'll see a countdown timer showing when the next rotation will occur

## 🎮 Basic Usage

### Starting Your First Session
1. **Enable**: Click the extension icon and toggle the switch to ON
2. **Wait**: The first rotation will occur after your set interval (default: 10 minutes)
3. **Experience**: When rotation begins, you'll see:
   - The webpage gently rotating left (15°) for 30 seconds
   - Then rotating right (15°) for another 30 seconds
   - Finally returning to normal position
4. **Continue**: The cycle automatically repeats based on your frequency setting

### Quick Controls
- **Pause/Resume**: Toggle the main switch anytime
- **Adjust on-the-fly**: Use the sliders in the popup for immediate changes
- **Status Check**: View countdown timer and current settings

## ⚙️ Customizing Settings

### Accessing Advanced Settings
1. Right-click the extension icon
2. Select **Options** from the context menu
3. Or click the gear icon in the popup

### Key Settings to Configure

#### Basic Settings
- **Enable Reminder**: Master on/off switch
- **Rotation Angle**: 5° to 45° (recommended: 10-20°)
- **Reminder Interval**: 1-60 minutes (recommended: 5-15 minutes)
- **Exercise Duration**: 15-120 seconds per direction (recommended: 20-45 seconds)

#### Display Settings
- **Show Indicator**: Display rotation status on pages
- **Sound Notification**: Audio cues for rotation start/end
- **Desktop Notification**: System notifications for reminders

#### Advanced Settings
- **Smart Pause**: Automatically pause during user interactions
- **Working Hours**: Limit rotations to specific time ranges
- **Time Range**: Set start and end times for active periods

### Recommended Settings for Beginners
```
Rotation Angle: 15°
Reminder Interval: 10 minutes
Exercise Duration: 30 seconds
Show Indicator: ON
Smart Pause: ON
```

## 🖥️ Understanding the Interface

### Popup Panel Components

#### Main Switch
- **Green (ON)**: Extension is active and scheduling rotations
- **Gray (OFF)**: Extension is paused, no rotations will occur

#### Rotation Angle Control
- Visual arc showing current angle setting
- Drag the control or use slider to adjust
- Real-time preview of rotation range

#### Frequency Control
- Slider showing minutes between rotation cycles
- Number display updates in real-time
- Minimum 1 minute, maximum 60 minutes

#### Status Display
Shows current state:
- **"Ready"**: Extension enabled, waiting for next cycle
- **"Rotating Left"**: Currently in left rotation phase
- **"Rotating Right"**: Currently in right rotation phase
- **"Next in X:XX"**: Countdown to next rotation

### Options Page Sections

#### Statistics Dashboard
- **Total Exercises**: Lifetime rotation count
- **Total Time**: Cumulative exercise duration
- **Streak Days**: Consecutive days with activity
- **Today's Exercises**: Current day rotation count

#### Settings Panels
- **Basic Settings**: Core functionality controls
- **Display Settings**: Visual and audio preferences
- **Advanced Settings**: Power user features
- **Data Management**: Export, reset, and backup options

## 🔧 Troubleshooting

### Common Issues

#### Extension Not Working
**Problem**: No rotations occurring despite being enabled
**Solutions**:
1. Check if you're on a supported page (not chrome:// pages)
2. Refresh the current page
3. Disable and re-enable the extension
4. Check Chrome's extension permissions

#### Rotations Not Smooth
**Problem**: Jerky or slow animations
**Solutions**:
1. Close other resource-heavy tabs
2. Update Chrome to the latest version
3. Reduce rotation angle to 10-15°
4. Check if hardware acceleration is enabled

#### Settings Not Saving
**Problem**: Configuration changes don't persist
**Solutions**:
1. Make sure to click "Save Settings" in options
2. Check Chrome storage permissions
3. Try clearing extension data and reconfiguring

#### Rotations Interrupting Work
**Problem**: Rotations occur during typing or important tasks
**Solutions**:
1. Enable "Smart Pause" in advanced settings
2. Increase reminder interval
3. Set working hours to exclude busy periods
4. Use manual control when needed

### Getting Help
If you continue experiencing issues:
1. Check the [GitHub Issues](https://github.com/your-username/neck-therapy-extension/issues) page
2. Enable developer tools and check for console errors
3. Submit a detailed bug report with your Chrome version and settings

## 💡 Tips for Best Results

### Health and Safety
- **Start Gradually**: Begin with 15° angles and 10-minute intervals
- **Listen to Your Body**: Reduce intensity if you feel discomfort
- **Stay Consistent**: Regular small exercises are better than infrequent large ones
- **Combine with Breaks**: Use rotations as reminders to take full breaks

### Optimization Tips
- **Peak Hours**: Set more frequent rotations during intensive work periods
- **Angle Selection**: Larger angles (20-30°) for stronger exercise, smaller (10-15°) for subtle reminders
- **Smart Scheduling**: Use working hours feature to avoid rotations during personal time
- **Indicator Usage**: Keep indicators on initially to build awareness, then disable for less distraction

### Workplace Integration
- **Team Awareness**: Let colleagues know about potential screen rotations during meetings
- **Presentation Mode**: Disable before important presentations or screen sharing
- **Dual Monitors**: Extension works best on primary monitor content
- **Break Coordination**: Sync rotation intervals with existing break schedules

### Performance Optimization
- **Tab Management**: Extension works on active tab only, so organize your workflow accordingly
- **Memory Usage**: Close unused tabs to ensure smooth animations
- **Regular Updates**: Keep the extension updated for latest performance improvements

## 🎉 Next Steps

Now that you're set up:
1. **Use for a week** with default settings to establish a baseline
2. **Monitor your comfort** and adjust angles/timing as needed
3. **Check your statistics** weekly to track progress
4. **Fine-tune settings** based on your work patterns
5. **Share with colleagues** who might benefit from neck health awareness

### Advanced Features to Explore Later
- Custom time ranges for different work schedules
- Statistics export for health tracking apps
- Integration with productivity tools
- Advanced rotation patterns

---

**Congratulations! 🎉** You're now ready to start improving your neck health with smart, automated exercises. Remember, consistency is key – even small, regular movements can make a significant difference in preventing neck strain and improving overall comfort during computer work.

For more detailed information, visit the [full documentation](README.md) or join our community discussions.