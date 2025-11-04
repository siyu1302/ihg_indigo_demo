// ===== UI界面相关函数 =====
// 这个文件负责界面的显示和交互
// 比如显示消息、显示文档、显示加载动画等
// 就像是画家，负责把内容"画"到屏幕上让你看到

/**
 * 在聊天区域添加一条消息
 * @param {string|Object} content - 消息内容（可以是文本或文档对象）
 * @param {boolean} isUser - 是否是用户发送的消息
 * @param {string} type - 消息类型（text/document/themes/story）
 */
function addMessage(content, isUser = false, type = 'text') {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (type === 'text') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-icon">${isUser ? '您' : 'AI'}</div>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${content}</p>
                </div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
    } else if (type === 'document') {
        const now = new Date();
        const dateString = now.toLocaleDateString('zh-CN', { 
            month: 'numeric', 
            day: 'numeric' 
        });
        const timeStringShort = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-icon">AI</div>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>我已经为您生成了详细的分析文档，请点击查看：</p>
                    <div class="document-card" data-document="analysis">
                        <div class="document-icon">📄</div>
                        <div class="document-info">
                            <div class="document-title">${content.title}</div>
                            <div class="document-time">${dateString} ${timeStringShort}</div>
                        </div>
                        <button class="document-open-btn">打开</button>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-primary confirm-analysis-btn">
                            <span>确认通过此文档提炼故事主题</span>
                            <span class="btn-icon">→</span>
                        </button>
                    </div>
                </div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
    } else if (type === 'themes') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-icon">AI</div>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>基于分析文档，我为您提炼了以下8个故事主题，请选择您最感兴趣的3个主题：</p>
                    <div class="theme-selection-counter">
                        <span class="counter-text">已选择 <span class="selected-count">0</span>/3 个主题</span>
                    </div>
                    <div class="theme-cards">
                        ${content.map((theme, index) => `
                            <div class="theme-card" data-theme="${index}">
                                <div class="theme-main-title">${theme.mainTitle}</div>
                                <div class="theme-sub-title">${theme.subTitle}</div>
                                <div class="theme-elements">
                                    <div class="theme-elements-title">提炼灵感来源的元素：</div>
                                    <div class="theme-elements-list">
                                        ${theme.elements.map(element => `<span class="theme-element">${element}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="theme-description">${theme.description}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
    } else if (type === 'story-document') {
        const now = new Date();
        const dateString = now.toLocaleDateString('zh-CN', { 
            month: 'numeric', 
            day: 'numeric' 
        });
        const timeStringShort = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-icon">AI</div>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>我已经为您生成了邻间故事设计文档，请点击查看：</p>
                    <div class="document-card" data-document="story">
                        <div class="document-icon">📖</div>
                        <div class="document-info">
                            <div class="document-title">${content.title}</div>
                            <div class="document-time">${dateString} ${timeStringShort}</div>
                        </div>
                        <button class="document-open-btn">打开</button>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-primary confirm-story-btn">
                            <span>确认通过此文档</span>
                            <span class="btn-icon">→</span>
                        </button>
                    </div>
                </div>
                <div class="message-time">${timeString}</div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // 添加事件监听器
    if (type === 'document') {
        addDocumentListeners(messageDiv);
    } else if (type === 'themes') {
        addThemeListeners(messageDiv);
    } else if (type === 'story') {
        addStoryListeners(messageDiv);
    } else if (type === 'story-document') {
        addStoryDocumentListeners(messageDiv);
    }
}

// ===== 显示文档内容 =====
function showDocumentContent(documentData) {
    const documentPanel = document.getElementById('document-panel');
    const documentContent = document.getElementById('document-content');
    const documentStatus = document.getElementById('document-status');
    const chatPanel = document.querySelector('.chat-panel');
    
    // 显示右侧文档面板
    documentPanel.style.display = 'flex';
    chatPanel.classList.add('with-document');
    
    documentStatus.innerHTML = '<span class="status-text">分析完成</span>';
    
    // 生成markdown格式的文档内容
    let contentHTML = `
        <div class="markdown-document">
            <div class="markdown-header">
                <h1 class="document-title">${documentData.title}</h1>
                <div class="document-summary">
                    <p>${documentData.summary}</p>
                </div>
            </div>
            
            <div class="markdown-content">
    `;
    
    // 为每个分析维度创建markdown格式的内容
    for (const [sectionTitle, sectionContent] of Object.entries(documentData.sections)) {
        contentHTML += `
            <div class="markdown-section">
                <h2 class="section-title">${sectionTitle}</h2>
                <div class="section-content">
                    ${formatMarkdownContent(sectionContent)}
                </div>
            </div>
        `;
    }
    
    contentHTML += `
            </div>
        </div>
    `;
    
    documentContent.innerHTML = contentHTML;
    
    // 添加关闭按钮事件监听器
    addCloseButtonListener();
}

// ===== 格式化markdown内容 =====
function formatMarkdownContent(content) {
    // 将内容按行分割并处理
    const lines = content.split('\n');
    let formattedHTML = '';
    let inListGroup = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 跳过空行，但保留作为段落分隔
        if (line.length === 0) {
            if (inListGroup) {
                formattedHTML += '</div>';
                inListGroup = false;
            }
            continue;
        }
        
        // 处理分隔符
        if (line === '---' || line === '——' || line.match(/^-{3,}$/)) {
            if (inListGroup) {
                formattedHTML += '</div>';
                inListGroup = false;
            }
            formattedHTML += '<div class="content-divider"></div>';
            continue;
        }
        
        // 处理中文序号标题（一、二、三、四、五）
        if (/^[一二三四五六七八九十]+、/.test(line)) {
            if (inListGroup) {
                formattedHTML += '</div>';
                inListGroup = false;
            }
            formattedHTML += `<h3 class="chinese-section-title">${line}</h3>`;
            continue;
        }
        
        // 处理数字标题（1. 2. 3.）
        if (/^\d+\./.test(line)) {
            if (inListGroup) {
                formattedHTML += '</div>';
                inListGroup = false;
            }
            formattedHTML += `<h4 class="numbered-subsection-title">${line}</h4>`;
            continue;
        }
        
        // 处理列表项（以-或•开头的行）
        if (/^[-•]/.test(line)) {
            if (!inListGroup) {
                formattedHTML += '<div class="list-group">';
                inListGroup = true;
            }
            const listItem = line.replace(/^[-•]\s*/, '');
            const processedItem = processTextFormatting(listItem);
            formattedHTML += `<div class="list-item"><span class="bullet">•</span><span class="list-content">${processedItem}</span></div>`;
            continue;
        }
        
        // 处理普通段落
        if (line.length > 0) {
            if (inListGroup) {
                formattedHTML += '</div>';
                inListGroup = false;
            }
            
            const processedLine = processTextFormatting(line);
            
            // 检查是否是引用或注释段落
            if (line.includes('（') && line.includes('）') && (line.includes('载') || line.includes('佐证') || line.includes('印证'))) {
                formattedHTML += `<p class="reference-paragraph">${processedLine}</p>`;
            }
            // 检查是否是时间或地点信息
            else if (/\d{4}年|\d+世纪|清|宋|唐|明/.test(line) && line.length < 100) {
                formattedHTML += `<p class="timeline-paragraph">${processedLine}</p>`;
            }
            // 普通段落
            else {
                formattedHTML += `<p class="paragraph">${processedLine}</p>`;
            }
        }
    }
    
    // 关闭可能未关闭的列表组
    if (inListGroup) {
        formattedHTML += '</div>';
    }
    
    return formattedHTML;
}

// ===== 处理文本格式化 =====
function processTextFormatting(text) {
    let processedText = text;
    
    // 处理粗体文本（**text** 或 __text__）
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processedText = processedText.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // 处理斜体文本（*text* 或 _text_）
    processedText = processedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    processedText = processedText.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // 处理代码片段（`code`）
    processedText = processedText.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // 处理引用文献标记（优先处理，避免被其他标记干扰）
    processedText = processedText.replace(/（《([^》]+)》([^）]*)）/g, '<span class="citation">（《$1》$2）</span>');
    
    // 处理重要概念标记（双引号内容）
    processedText = processedText.replace(/"([^"]+)"/g, '<span class="concept-marker">"$1"</span>');
    
    // 处理重要概念标记（中文引号内容）
    processedText = processedText.replace(/「([^」]+)」/g, '<span class="concept-marker">「$1」</span>');
    
    // 使用安全的标记替换函数，避免重复标记
    processedText = safeReplace(processedText, /(\d{4}年)/g, '<span class="time-marker">$1</span>');
    processedText = safeReplace(processedText, /(南宋|北宋|唐代|清代|明代|民国)/g, '<span class="dynasty-marker">$1</span>');
    
    // 处理具体人名标记（使用具体人名列表，避免过度匹配）
    const specificNames = [
        '朱熹', '张栻', '左宗棠', '林则徐', '杜甫', '毛泽东', '王夫之', '魏源', 
        '曾国藩', '蔡和森', '黄兴', '陈云章', '金九', '贾谊', '屈原',
        '约瑟夫·卡斯普', '亚历山大·列昂季耶夫', '阿·科姆特拉肖克'
    ];
    
    specificNames.forEach(name => {
        const regex = new RegExp(`(${escapeRegExp(name)})`, 'g');
        processedText = safeReplace(processedText, regex, '<span class="person-marker">$1</span>');
    });
    
    // 处理地名标记
    const locations = ['湘江', '岳麓山', '橘子洲', '长沙', '哈尔滨', '中央大街', '松花江', '岳麓书院', '马迭尔宾馆', '朱张渡', '杜甫江阁', '太平老街', '潮宗街'];
    locations.forEach(location => {
        const regex = new RegExp(`(${escapeRegExp(location)})`, 'g');
        processedText = safeReplace(processedText, regex, '<span class="location-marker">$1</span>');
    });
    
    return processedText;
}

// ===== 安全替换函数：避免在HTML标签内部进行替换 =====
function safeReplace(text, regex, replacement) {
    // 将文本分割为HTML标签和普通文本部分
    const parts = text.split(/(<[^>]*>)/);
    
    for (let i = 0; i < parts.length; i++) {
        // 只对非HTML标签部分进行替换
        if (i % 2 === 0) { // 偶数索引是普通文本
            parts[i] = parts[i].replace(regex, replacement);
        }
    }
    
    return parts.join('');
}

// ===== 辅助函数：转义正则表达式特殊字符 =====
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ===== 关闭文档面板 =====
function closeDocumentPanel() {
    const documentPanel = document.getElementById('document-panel');
    const chatPanel = document.querySelector('.chat-panel');
    
    // 添加关闭动画
    documentPanel.classList.add('closing');
    
    // 动画完成后隐藏面板
    setTimeout(() => {
        documentPanel.style.display = 'none';
        documentPanel.classList.remove('closing');
        chatPanel.classList.remove('with-document');
    }, 300);
}

// ===== 添加关闭按钮事件监听器 =====
function addCloseButtonListener() {
    const closeBtn = document.getElementById('document-close-btn');
    
    // 移除之前的事件监听器（如果有的话）
    closeBtn.replaceWith(closeBtn.cloneNode(true));
    
    // 添加新的事件监听器
    document.getElementById('document-close-btn').addEventListener('click', closeDocumentPanel);
}

// ===== 显示打字指示器 =====
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';
    
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== 隐藏打字指示器 =====
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'none';
}

// ===== 添加文档相关事件监听器 =====
function addDocumentListeners(messageDiv) {
    const documentCard = messageDiv.querySelector('.document-card');
