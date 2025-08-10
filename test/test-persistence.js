// 颈椎治疗助手 - 状态持久化测试脚本
// 用于验证设置和状态是否能正确保存和恢复

// 测试用例
const testCases = [
  {
    name: '测试默认设置加载',
    test: async () => {
      // 清除所有存储
      await chrome.storage.sync.clear();
      await chrome.storage.local.clear();
      
      // 发送获取状态消息
      const response = await sendMessage({ type: 'get_state' });
      
      console.log('默认状态:', response);
      return response.success && !response.settings.isEnabled;
    }
  },
  {
    name: '测试设置保存',
    test: async () => {
      const testSettings = {
        isEnabled: true,
        rotationAngle: 20,
        cycleDuration: 15 * 60 * 1000,
        rotationDuration: 45 * 1000,
        showIndicator: true
      };
      
      // 保存设置
      const saveResponse = await sendMessage({
        type: 'settings_changed',
        payload: testSettings
      });
      
      if (!saveResponse.success) {
        console.error('设置保存失败:', saveResponse.error);
        return false;
      }
      
      // 获取设置验证
      const getResponse = await sendMessage({ type: 'get_state' });
      
      console.log('保存后的设置:', getResponse.settings);
      
      return getResponse.success && 
             getResponse.settings.isEnabled === testSettings.isEnabled &&
             getResponse.settings.rotationAngle === testSettings.rotationAngle;
    }
  },
  {
    name: '测试启动状态持久化',
    test: async () => {
      // 启动旋转
      const startResponse = await sendMessage({
        type: 'start_rotation',
        payload: {
          settings: {
            isEnabled: true,
            rotationAngle: 15,
            cycleDuration: 10 * 60 * 1000,
            rotationDuration: 30 * 1000,
            showIndicator: true
          }
        }
      });
      
      if (!startResponse.success) {
        console.error('启动失败:', startResponse.error);
        return false;
      }
      
      // 验证状态
      const getResponse = await sendMessage({ type: 'get_state' });
      
      console.log('启动后的状态:', getResponse);
      
      return getResponse.success && 
             getResponse.settings.isEnabled === true &&
             getResponse.state.isActive === true;
    }
  },
  {
    name: '测试停止状态持久化',
    test: async () => {
      // 停止旋转
      const stopResponse = await sendMessage({ type: 'stop_rotation' });
      
      if (!stopResponse.success) {
        console.error('停止失败:', stopResponse.error);
        return false;
      }
      
      // 验证状态
      const getResponse = await sendMessage({ type: 'get_state' });
      
      console.log('停止后的状态:', getResponse);
      
      return getResponse.success && 
             getResponse.settings.isEnabled === false &&
             getResponse.state.isActive === false;
    }
  }
];

// 消息发送辅助函数
function sendMessage(message) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        console.error('消息发送失败:', chrome.runtime.lastError);
        resolve({ success: false, error: chrome.runtime.lastError.message });
      } else {
        resolve(response);
      }
    });
  });
}

// 运行测试
async function runTests() {
  console.log('开始状态持久化测试...');
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  for (const testCase of testCases) {
    console.log(`\n运行测试: ${testCase.name}`);
    
    try {
      const result = await testCase.test();
      
      if (result) {
        console.log(`✅ ${testCase.name} - 通过`);
        passedTests++;
      } else {
        console.log(`❌ ${testCase.name} - 失败`);
      }
    } catch (error) {
      console.error(`❌ ${testCase.name} - 错误:`, error);
    }
    
    // 测试间隔
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n测试完成: ${passedTests}/${totalTests} 通过`);
  
  if (passedTests === totalTests) {
    console.log('🎉 所有测试通过！状态持久化功能正常工作。');
  } else {
    console.log('⚠️ 部分测试失败，需要检查状态持久化实现。');
  }
}

// 如果在浏览器环境中运行
if (typeof chrome !== 'undefined' && chrome.runtime) {
  // 等待DOM加载完成后运行测试
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTests);
  } else {
    runTests();
  }
} else {
  console.log('此测试脚本需要在Chrome扩展环境中运行');
}

// 导出测试函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTests, testCases };
}