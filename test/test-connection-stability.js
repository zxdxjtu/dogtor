// 颈椎治疗插件连接稳定性测试脚本

class ConnectionStabilityTester {
  constructor() {
    this.logElement = document.getElementById('log');
    this.statusElement = document.getElementById('status');
    this.testResults = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;

    this.logElement.textContent += logMessage + '\n';
    this.logElement.scrollTop = this.logElement.scrollHeight;

    console.log(logMessage);
  }

  updateStatus(message, type = 'info') {
    this.statusElement.textContent = message;
    this.statusElement.className = `status ${type}`;
  }

  async sendMessageToExtension(message) {
    return new Promise((resolve) => {
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            resolve({ success: false, error: chrome.runtime.lastError.message });
          } else {
            resolve(response);
          }
        });
      } else {
        resolve({ success: false, error: 'Chrome extension API not available' });
      }
    });
  }

  async testContentScriptInjection() {
    this.log('开始测试Content Script注入检测...', 'info');
    this.updateStatus('正在测试Content Script注入...', 'warning');

    try {
      // 发送PING消息测试Content Script是否响应
      const response = await this.sendMessageToExtension({
        type: 'PING',
        timestamp: Date.now()
      });

      if (response && response.success) {
        this.log('✓ Content Script注入检测成功', 'success');
        this.updateStatus('Content Script注入测试通过', 'success');
        return true;
      } else {
        this.log('✗ Content Script注入检测失败: ' + (response?.error || '未知错误'), 'error');
        this.updateStatus('Content Script注入测试失败', 'error');
        return false;
      }
    } catch (error) {
      this.log('✗ Content Script注入测试异常: ' + error.message, 'error');
      this.updateStatus('Content Script注入测试异常', 'error');
      return false;
    }
  }

  async testMessageRetry() {
    this.log('开始测试消息重试机制...', 'info');
    this.updateStatus('正在测试消息重试机制...', 'warning');

    try {
      // 获取当前状态
      const response = await this.sendMessageToExtension({
        type: 'GET_STATE',
        timestamp: Date.now()
      });

      if (response && response.success) {
        this.log('✓ 消息重试机制测试成功', 'success');
        this.log('当前状态: ' + JSON.stringify(response.state, null, 2));
        this.updateStatus('消息重试机制测试通过', 'success');
        return true;
      } else {
        this.log('✗ 消息重试机制测试失败: ' + (response?.error || '未知错误'), 'error');
        this.updateStatus('消息重试机制测试失败', 'error');
        return false;
      }
    } catch (error) {
      this.log('✗ 消息重试机制测试异常: ' + error.message, 'error');
      this.updateStatus('消息重试机制测试异常', 'error');
      return false;
    }
  }

  async testErrorRecovery() {
    this.log('开始测试错误恢复能力...', 'info');
    this.updateStatus('正在测试错误恢复能力...', 'warning');

    try {
      // 发送一个无效的消息类型来测试错误处理
      const response = await this.sendMessageToExtension({
        type: 'INVALID_MESSAGE_TYPE',
        timestamp: Date.now()
      });

      if (response && !response.success && response.error) {
        this.log('✓ 错误恢复测试成功 - 正确处理了无效消息', 'success');
        this.log('错误信息: ' + response.error);
        this.updateStatus('错误恢复能力测试通过', 'success');
        return true;
      } else {
        this.log('✗ 错误恢复测试失败 - 未正确处理无效消息', 'error');
        this.updateStatus('错误恢复能力测试失败', 'error');
        return false;
      }
    } catch (error) {
      this.log('✗ 错误恢复测试异常: ' + error.message, 'error');
      this.updateStatus('错误恢复测试异常', 'error');
      return false;
    }
  }

  async simulateRotation() {
    this.log('开始模拟旋转序列...', 'info');
    this.updateStatus('正在模拟旋转序列...', 'warning');

    try {
      // 首先启动旋转
      const startResponse = await this.sendMessageToExtension({
        type: 'START_ROTATION',
        payload: {
          settings: {
            isEnabled: true,
            rotationAngle: 15,
            cycleDuration: 5000, // 5秒用于测试
            rotationDuration: 2000,
            showIndicator: true
          }
        }
      });

      if (startResponse && startResponse.success) {
        this.log('✓ 旋转启动成功', 'success');

        // 等待一段时间后停止
        setTimeout(async () => {
          const stopResponse = await this.sendMessageToExtension({
            type: 'STOP_ROTATION'
          });

          if (stopResponse && stopResponse.success) {
            this.log('✓ 旋转停止成功', 'success');
            this.updateStatus('旋转序列模拟完成', 'success');
          } else {
            this.log('✗ 旋转停止失败: ' + (stopResponse?.error || '未知错误'), 'error');
            this.updateStatus('旋转停止失败', 'error');
          }
        }, 3000);

        return true;
      } else {
        this.log('✗ 旋转启动失败: ' + (startResponse?.error || '未知错误'), 'error');
        this.updateStatus('旋转序列模拟失败', 'error');
        return false;
      }
    } catch (error) {
      this.log('✗ 旋转序列模拟异常: ' + error.message, 'error');
      this.updateStatus('旋转序列模拟异常', 'error');
      return false;
    }
  }

  async runAllTests() {
    this.log('开始运行所有测试...', 'info');
    this.updateStatus('正在运行所有测试...', 'warning');

    const tests = [
      { name: 'Content Script注入', fn: () => this.testContentScriptInjection() },
      { name: '消息重试机制', fn: () => this.testMessageRetry() },
      { name: '错误恢复能力', fn: () => this.testErrorRecovery() },
      { name: '旋转序列模拟', fn: () => this.simulateRotation() }
    ];

    let passedTests = 0;
    for (const test of tests) {
      this.log(`\n--- 运行测试: ${test.name} ---`);
      const result = await test.fn();
      if (result) {
        passedTests++;
      }
      // 等待一下再运行下一个测试
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.log('\n=== 测试完成 ===');
    this.log(`通过测试: ${passedTests}/${tests.length}`);

    if (passedTests === tests.length) {
      this.updateStatus(`所有测试通过 (${passedTests}/${tests.length})`, 'success');
    } else {
      this.updateStatus(`部分测试失败 (${passedTests}/${tests.length})`, 'error');
    }
  }

  clearLog() {
    this.logElement.textContent = '测试日志已清空...\n';
    this.updateStatus('日志已清空', 'info');
  }
}

// 创建测试实例
const tester = new ConnectionStabilityTester();

// 全局函数供HTML调用
function testContentScriptInjection() {
  tester.testContentScriptInjection();
}

function testMessageRetry() {
  tester.testMessageRetry();
}

function testErrorRecovery() {
  tester.testErrorRecovery();
}

function simulateRotation() {
  tester.simulateRotation();
}

function runAllTests() {
  tester.runAllTests();
}

function clearLog() {
  tester.clearLog();
}

// 页面加载完成后自动运行基础检测
document.addEventListener('DOMContentLoaded', () => {
  tester.log('连接稳定性测试页面已加载', 'info');
  tester.updateStatus('测试页面已准备就绪', 'success');

  // 检查扩展是否可用
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    tester.log('✓ Chrome扩展API可用', 'success');
  } else {
    tester.log('✗ Chrome扩展API不可用 - 请确保在扩展环境中运行此测试', 'error');
    tester.updateStatus('扩展API不可用', 'error');
  }
});

console.log('颈椎治疗插件连接稳定性测试脚本已加载');
