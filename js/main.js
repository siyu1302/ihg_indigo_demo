// ===== 应用程序初始化 =====
// 这是应用程序的启动文件
// 当网页加载完成后，这里的代码会自动运行，设置好所有的按钮和输入框

// 等待页面加载完成后再执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('邻间故事AI顾问 - 应用程序已启动');
    
    // 获取页面上的各个元素（就像找到遥控器的各个按钮）
    const messageInput = document.getElementById('message-input'); // 输入框
    const sendBtn = document.getElementById('send-btn'); // 发送按钮
    const quickBtns = document.querySelectorAll('.quick-btn'); // 快捷按钮
    
    // 发送按钮点击事件
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim(); // 获取输入的内容并去掉空格
        if (message) {
            handleUserInput(message); // 处理用户输入
            messageInput.value = ''; // 清空输入框
        }
    });
    
    // 回车键发送（按回车键也能发送消息）
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // 阻止默认的换行行为
            const message = messageInput.value.trim();
            if (message) {
                handleUserInput(message);
                messageInput.value = '';
            }
        }
    });
    
    // 快捷按钮点击事件（点击"长沙湘江中路"等按钮）
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const location = btn.dataset.location; // 获取按钮上的位置信息
            messageInput.value = location;
            handleUserInput(location);
            messageInput.value = '';
        });
    });
    
    // 自动聚焦到输入框（让光标自动出现在输入框里）
    messageInput.focus();
    
    console.log('所有事件监听器已设置完成');
});

