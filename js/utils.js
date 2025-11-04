// ===== 工具函数 =====
// 这个文件包含了一些通用的工具函数，比如文本处理、格式化等

/**
 * 安全地替换文本（避免替换失败导致的错误）
 * @param {string} text - 原文本
 * @param {RegExp} regex - 正则表达式
 * @param {string} replacement - 替换内容
 * @returns {string} 替换后的文本
 */
function safeReplace(text, regex, replacement) {
    try {
        if (!text) return '';
        return text.replace(regex, replacement);
    } catch (error) {
        console.warn('替换操作失败:', error);
        return text;
    }
}

/**
 * 转义正则表达式中的特殊字符
 * @param {string} string - 要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 处理文本中的格式标记（加粗、斜体等）
 * @param {string} text - 原文本
 * @returns {string} 格式化后的HTML文本
 */
function processTextFormatting(text) {
    if (!text) return '';
    
    try {
        // 处理加粗：**文本** 或 __文本__
        text = safeReplace(text, /\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = safeReplace(text, /__(.+?)__/g, '<strong>$1</strong>');
        
        // 处理斜体：*文本* 或 _文本_（但要避免误匹配加粗）
        text = safeReplace(text, /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
        text = safeReplace(text, /(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, '<em>$1</em>');
        
        // 处理代码：`代码`
        text = safeReplace(text, /`([^`]+)`/g, '<code>$1</code>');
        
        // 处理删除线：~~文本~~
        text = safeReplace(text, /~~(.+?)~~/g, '<del>$1</del>');
        
        return text;
    } catch (error) {
        console.error('文本格式化失败:', error);
        return text;
    }
}

/**
 * 显示通知消息
 * @param {string} message - 通知内容
 * @param {string} type - 通知类型（info, success, error）
 */
function showNotification(message, type = 'info') {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => notification.classList.add('show'), 10);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * 复制文本到剪贴板（后备方案）
 * @param {string} text - 要复制的文本
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            showNotification('已复制到剪贴板', 'success');
        } else {
            showNotification('复制失败，请手动复制', 'error');
        }
    } catch (err) {
        console.error('复制失败:', err);
        document.body.removeChild(textArea);
        showNotification('复制失败', 'error');
    }
}

/**
 * 复制设计灵感到剪贴板
 * @param {string} themeName - 主题名称
 */
function copyDesignInspiration(themeName) {
    const inspiration = getDetailedDesignInspiration(themeName);
    const textToCopy = `主题：${themeName}\n\n${inspiration}`;
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => showNotification('设计灵感已复制到剪贴板', 'success'))
            .catch(err => {
                console.error('复制失败:', err);
                fallbackCopyTextToClipboard(textToCopy);
            });
    } else {
        fallbackCopyTextToClipboard(textToCopy);
    }
}

/**
 * 下载设计灵感为文本文件
 * @param {string} themeName - 主题名称
 */
function downloadDesignInspiration(themeName) {
    const inspiration = getDetailedDesignInspiration(themeName);
    const content = `主题：${themeName}\n\n${inspiration}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeName}_设计灵感.txt`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('设计灵感文件已下载', 'success');
}

