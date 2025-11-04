// ===== 故事处理函数 =====
// 这个文件负责处理故事相关的功能
// 包括获取故事内容、生成故事文档、格式化故事等
// 就像一个"故事讲述者"，把故事内容整理好呈现给你

/**
 * 获取详细的故事内容
 * @param {string} location - 位置名称
 * @param {string} themeTitle - 主题标题
 * @returns {string} 完整的故事内容
 */
function getDetailedStoryContent(location, themeTitle) {
    // 查找对应城市的详细故事数据库
    for (const key in detailedStoriesDB) {
        if (location.includes(key)) {
            const cityStories = detailedStoriesDB[key];
            if (cityStories[themeTitle]) {
                return cityStories[themeTitle].fullContent;
            }
        }
    }
    
    // 如果没有找到详细内容，返回默认内容
    return `## ${themeTitle}

这是一个充满文化底蕴的邻间故事主题。通过深入挖掘当地的历史文化和人文特色，我们为这个主题注入了丰富的内涵和独特的表达方式。

每个细节都经过精心设计，确保既保持传统文化的精髓，又符合现代生活方式和审美需求。这个主题将成为酒店文化体验的重要组成部分，为客人带来难忘的邻间故事体验。

通过现代设计手法的重新诠释，传统文化元素在这里焕发新的生命力，与当代生活方式完美融合，创造出独特而富有诗意的空间氛围。`;
}

// ===== 生成邻间故事文档 =====
function generateStoryDocument(themes) {
    // 直接显示故事文档消息（实际内容在showStoryDocumentContent中生成）
    const storyDocument = {
        title: `${userLocation}邻间故事设计文档`,
        summary: `基于选定的3个故事主题，为英迪格酒店${userLocation}项目量身定制的邻间故事设计文档`,
        themes: themes
    };
    
    // 显示故事文档
    addMessage(storyDocument, false, 'story-document');
}

// ===== 添加故事文档相关事件监听器 =====
function addStoryDocumentListeners(messageDiv) {
    const documentCard = messageDiv.querySelector('.document-card');
    const openBtn = messageDiv.querySelector('.document-open-btn');
    const confirmBtn = messageDiv.querySelector('.confirm-story-btn');
    
    // 文档卡片点击事件
    documentCard.addEventListener('click', () => {
        showStoryDocumentContent();
        documentCard.classList.add('selected');
    });
    
    // 打开按钮点击事件
    openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showStoryDocumentContent();
        documentCard.classList.add('selected');
    });
    
    // 确认按钮事件
    confirmBtn.addEventListener('click', () => {
        // 显示完成消息
        addMessage('感谢您的使用！邻间故事设计文档已生成完成。如需重新开始，请点击"重新开始"按钮。', false);
        
        // 添加重新开始按钮
        const chatMessages = document.getElementById('chat-messages');
        const lastMessage = chatMessages.lastElementChild;
        const actionButtons = lastMessage.querySelector('.action-buttons');
        if (actionButtons) {
            const startOverBtn = document.createElement('button');
            startOverBtn.className = 'btn-secondary start-over-btn';
            startOverBtn.innerHTML = `
                <span>重新开始</span>
                <span class="btn-icon">↻</span>
            `;
            actionButtons.appendChild(startOverBtn);
            
            startOverBtn.addEventListener('click', resetApplication);
        }
    });
}

// ===== 显示故事文档内容 =====
function showStoryDocumentContent() {
    console.log('showStoryDocumentContent 被调用');
    console.log('userLocation:', userLocation);
    console.log('selectedThemes:', selectedThemes);
    
    const documentPanel = document.getElementById('document-panel');
    const documentContent = document.getElementById('document-content');
    const documentStatus = document.getElementById('document-status');
    const chatPanel = document.querySelector('.chat-panel');
    
    if (!documentPanel || !documentContent) {
        console.error('未找到文档面板元素');
        return;
    }
    
    // 显示右侧文档面板
    documentPanel.style.display = 'flex';
    chatPanel.classList.add('with-document');
    
    documentStatus.innerHTML = '<span class="status-text">故事文档生成完成</span>';
    
    // 检查必要的变量
    if (!userLocation) {
        console.error('userLocation 未定义');
        documentContent.innerHTML = '<div class="error-message">错误：用户位置未定义</div>';
        return;
    }
    
    if (!selectedThemes || selectedThemes.length === 0) {
        console.error('selectedThemes 未定义或为空');
        documentContent.innerHTML = '<div class="error-message">错误：未选择主题</div>';
        return;
    }
    
    // 获取综合主线故事和各主题展开故事
    console.log('开始获取故事内容...');
    const combinedMainStory = getCombinedMainStory(userLocation, selectedThemes);
    console.log('combinedMainStory:', combinedMainStory ? '已获取' : '获取失败');
    
    const themeStories = {};
    selectedThemes.forEach(theme => {
        themeStories[theme.mainTitle] = getThemeExpandedStory(userLocation, theme.mainTitle);
    });
    console.log('themeStories:', themeStories);
    
    const storyDocument = {
        title: `${userLocation}邻间故事设计文档`,
        summary: `基于选定的3个故事主题，为英迪格酒店${userLocation}项目量身定制的邻间故事设计文档`,
        themes: selectedThemes,
        combinedMainStory: combinedMainStory,
        themeStories: themeStories
    };
    
    // 生成新的故事文档结构
    let contentHTML = `
        <div class="story-document-container">
            <div class="story-document-header">
                <h1 class="story-document-title">${storyDocument.title}</h1>
                <div class="story-document-summary">
                    <p>${storyDocument.summary}</p>
                </div>
            </div>
            
            <!-- 选定主题展示 -->
            <div class="selected-themes-display">
                <div class="themes-display-title">选定主题</div>
                <div class="themes-display-cards">
                    ${selectedThemes.map((theme, index) => `
                        <div class="theme-display-card">
                            <div class="theme-display-number">${index + 1}</div>
                            <div class="theme-display-content">
                                <div class="theme-display-main-title">${theme.mainTitle}</div>
                                <div class="theme-display-sub-title">${theme.subTitle}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 故事结构导航 -->
            <div class="story-structure-navigation">
                <div class="story-nav-title">文档结构</div>
                <div class="story-nav-buttons">
                    <button class="story-structure-btn active" data-structure="combined">综合主线故事</button>
                    <button class="story-structure-btn" data-structure="themes">主题展开故事</button>
                    <button class="story-structure-btn" data-structure="design">酒店设计灵感</button>
                </div>
            </div>
            
            <!-- 综合主线故事部分 -->
            <div class="story-structure-section active" data-structure="combined">
                <div class="combined-story-header">
                    <h2 class="section-title">综合主线故事</h2>
                    <p class="section-subtitle">融合 ${selectedThemes.map(t => t.mainTitle).join('、')} 三个主题的核心叙事</p>
                </div>
                <div class="combined-story-content">
                    ${formatMarkdownContent(combinedMainStory)}
                </div>
            </div>
            
            <!-- 主题展开故事部分 -->
            <div class="story-structure-section" data-structure="themes">
                <div class="themes-stories-header">
                    <h2 class="section-title">主题展开故事</h2>
                    <p class="section-subtitle">每个主题的深入描述与文化阐释</p>
                </div>
                <div class="themes-stories-content">
                    ${selectedThemes.map((theme, index) => `
                        <div class="theme-story-item">
                            <div class="theme-story-header">
                                <div class="theme-story-number">${index + 1}</div>
                                <div class="theme-story-title-group">
                                    <h3 class="theme-story-main-title">${theme.mainTitle}</h3>
                                    <p class="theme-story-sub-title">${theme.subTitle}</p>
                                </div>
                            </div>
                            <div class="theme-story-content">
                                ${formatMarkdownContent(themeStories[theme.mainTitle])}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- 酒店设计灵感部分 -->
            <div class="story-structure-section" data-structure="design">
                <div class="design-inspiration-header">
                    <h2 class="section-title">酒店设计灵感</h2>
                    <p class="section-subtitle">基于故事主题的空间设计方案</p>
                </div>
                <div class="design-inspiration-content">
                    ${selectedThemes.map((theme, index) => `
                        <div class="design-inspiration-item">
                            <div class="design-inspiration-header">
                                <div class="design-inspiration-number">${index + 1}</div>
                                <div class="design-inspiration-title-group">
                                    <h3 class="design-inspiration-main-title">${theme.mainTitle}</h3>
                                    <p class="design-inspiration-sub-title">${theme.subTitle}</p>
                                </div>
                            </div>
                            <div class="design-inspiration-body">
                                ${generateDesignInspiration(theme)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    console.log('生成的HTML长度:', contentHTML.length);
    documentContent.innerHTML = contentHTML;
    console.log('HTML已插入到documentContent');
    console.log('documentContent当前内容:', documentContent.innerHTML.substring(0, 200));
    
    // 添加交互事件监听器
    try {
        addStoryStructureInteractions();
        console.log('交互事件监听器已添加');
    } catch (error) {
        console.error('添加交互事件监听器失败:', error);
    }
    
    // 添加关闭按钮事件监听器
    try {
        addCloseButtonListener();
        console.log('关闭按钮监听器已添加');
    } catch (error) {
        console.error('添加关闭按钮监听器失败:', error);
    }
}

// ===== 重置应用程序 =====
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

// ===== 添加故事结构导航交互功能 =====
function addStoryStructureInteractions() {
    // 获取所有结构导航按钮
    const structureBtns = document.querySelectorAll('.story-structure-btn');
    const structureSections = document.querySelectorAll('.story-structure-section');
    
    structureBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetStructure = btn.dataset.structure;
            
            // 移除所有按钮的active状态
            structureBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active状态
            btn.classList.add('active');
            
            // 隐藏所有section
            structureSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 显示目标section
            const targetSection = document.querySelector(`[data-structure="${targetStructure}"]`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

