// ===== 主要业务逻辑处理 =====
// 这个文件包含应用程序的核心业务逻辑
// 处理用户输入、重置应用、管理对话流程等
// 就像是"大脑"，负责决定接下来该做什么

/**
 * 重置应用程序到初始状态
 */
function resetApplication() {
    // 重置状态
    selectedThemes = [];
    analysisDocument = null;
    generatedThemes = [];
    userLocation = null;
    currentStep = 'location';
    
    // 清空聊天记录
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="message ai-message">
            <div class="message-avatar">
                <div class="avatar-icon">AI</div>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>您好！我是邻间故事AI顾问，专门为英迪格酒店提供文化主题定制服务。</p>
                    <p>请告诉我您希望开设酒店的具体位置，我将为您分析当地的历史、文化、经济、人文等信息，并生成详细的分析文档。</p>
                </div>
                <div class="message-time">刚刚</div>
            </div>
        </div>
    `;
    
    // 隐藏右侧文档面板
    const documentPanel = document.getElementById('document-panel');
    const chatPanel = document.querySelector('.chat-panel');
    
    if (documentPanel.style.display !== 'none') {
        closeDocumentPanel();
    } else {
        chatPanel.classList.remove('with-document');
    }
    
    // 重置文档区域
    const documentContent = document.getElementById('document-content');
    const documentStatus = document.getElementById('document-status');
    
    documentContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📄</div>
            <h3>暂无文档</h3>
            <p>请在左侧输入酒店地址，AI将为您生成详细的分析文档</p>
        </div>
    `;
    
    documentStatus.innerHTML = '<span class="status-text">等待分析...</span>';
    
    // 清空输入框
    document.getElementById('message-input').value = '';
}

// ===== 处理用户输入 =====
function handleUserInput(message) {
    if (currentStep === 'location') {
        // 保存用户输入的位置信息
        userLocation = message;
        
        // 用户输入了位置信息
        addMessage(message, true);
        
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            
            // 获取分析文档
            analysisDocument = getAnalysisDocument(message);
            
            // 显示文档
            addMessage(analysisDocument, false, 'document');
            
            currentStep = 'document';
        }, 3000);
    }
}

// ===== 事件监听 =====
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const quickBtns = document.querySelectorAll('.quick-btn');
    
    // 发送按钮事件
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            handleUserInput(message);
            messageInput.value = '';
        }
    });
    
    // 回车键发送
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (message) {
                handleUserInput(message);
                messageInput.value = '';
            }
        }
    });
    
    // 快捷按钮事件
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const location = btn.dataset.location;
            messageInput.value = location;
            handleUserInput(location);
            messageInput.value = '';
        });
    });
    
    // 输入框聚焦
    messageInput.focus();
});

// ===== 格式化主线故事内容 =====
function formatStoryMainContent(fullContent) {
    if (!fullContent) return '<p>暂无内容</p>';
    
    // 提取主线故事部分（第一个 ## 之前的内容）
    const lines = fullContent.split('\n');
    let mainContent = '';
    let foundFirstSection = false;
    
    for (let line of lines) {
        if (line.startsWith('## ') && !foundFirstSection) {
            foundFirstSection = true;
            break;
        }
        if (!foundFirstSection) {
            mainContent += line + '\n';
        }
    }
    
    return formatMarkdownContent(mainContent.trim());
}

// ===== 格式化延伸故事内容 =====
function formatStorySubstories(fullContent) {
    if (!fullContent) return '<p>暂无内容</p>';
    
    // 提取所有 ## 开头的延伸故事
    const sections = fullContent.split(/^## /m).filter(section => section.trim());
    
    if (sections.length <= 1) {
        return '<p>暂无延伸故事内容</p>';
    }
    
    // 跳过第一个部分（主线故事），处理后续的延伸故事
    const substories = sections.slice(1);
    
    return substories.map((story, index) => {
        const lines = story.split('\n');
        const title = lines[0];
        const content = lines.slice(1).join('\n').trim();
        
        return `
            <div class="substory-item">
                <h4 class="substory-title">${index + 1}. ${title}</h4>
                <div class="substory-content">
                    ${formatMarkdownContent(content)}
                </div>
            </div>
        `;
    }).join('');
}

