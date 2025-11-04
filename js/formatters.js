// ===== 格式化函数 =====
// 这个文件负责将文本内容转换成漂亮的HTML格式
// 就像是把普通的文字排版成一本好看的书

/**
 * 将Markdown格式的内容转换为HTML
 * @param {string} content - 原始内容
 * @returns {string} 格式化后的HTML内容
 */
function formatMarkdownContent(content) {
    // 错误处理：如果content为空或undefined，返回提示信息
    if (!content || typeof content !== 'string') {
        console.error('formatMarkdownContent: 无效的content参数', content);
        return '<p class="error-message">内容格式错误</p>';
    }
    
    console.log('formatMarkdownContent: 处理内容，长度=', content.length);
    
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

