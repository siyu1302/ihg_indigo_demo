// ===== 设计灵感相关功能 =====
// 这个文件负责生成和处理酒店设计灵感
// 包括获取设计灵感内容、生成设计文档、复制和下载功能等
// 就像一个"设计顾问"，为酒店设计提供创意灵感

/**
 * 获取主题的详细设计灵感
 * @param {string} theme - 主题名称
 * @returns {string} 设计灵感内容
 */
function getDetailedDesignInspiration(theme) {
    return detailedDesignInspirationsDB[theme] || '该主题的详细设计灵感正在完善中...';
}

// ===== 生成酒店设计灵感 =====
function generateDesignInspiration(theme) {
    // 首先尝试获取详细设计灵感
    const detailedInspiration = getDetailedDesignInspiration(theme.mainTitle);
    
    // 如果有详细设计灵感，直接返回格式化的HTML
    if (detailedInspiration && detailedInspiration !== '该主题的详细设计灵感正在完善中...') {
        return `
            <div class="detailed-design-inspiration">
                <div class="design-content">
                    <pre class="markdown-content">${detailedInspiration}</pre>
                </div>
                <div class="design-actions">
                    <button class="btn-primary copy-design-btn" onclick="copyDesignInspiration('${theme.mainTitle}')">
                        <span>复制设计灵感</span>
                        <span class="btn-icon">📋</span>
                    </button>
                    <button class="btn-secondary download-design-btn" onclick="downloadDesignInspiration('${theme.mainTitle}')">
                        <span>下载为文档</span>
                        <span class="btn-icon">📄</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    // 如果没有详细设计灵感，使用简化版本（保持向后兼容）
    const inspirations = {
        '枫声夜语': {
            colorPalette: ['深红枫叶色 #8B0000', '古铜金色 #CD7F32', '墨青色 #2F4F4F', '暖白色 #FFF8DC'],
            materials: ['红木家具', '青石板地面', '铜质装饰', '丝绸软装'],
            lighting: ['暖黄色调灯光', '仿古灯笼造型', '间接照明营造诗意氛围'],
            spaces: [
                '大堂：以爱晚亭为灵感的接待区，红木屏风分隔空间',
                '客房：枫叶图案地毯，书桌配古典文房四宝',
                '餐厅：湘江夜景主题壁画，诗词元素装饰'
            ],
            experience: [
                '入住体验：提供毛笔书法体验，客人可书写《沁园春》',
                '文化活动：定期举办诗词朗诵会',
                '特色服务：房间内放置岳麓书院文化读物'
            ]
        },
        '青砖呼吸录': {
            colorPalette: ['青砖灰色 #708090', '书院白色 #F5F5DC', '墨黑色 #2F2F2F', '竹绿色 #228B22'],
            materials: ['青砖墙面', '原木家具', '竹制装饰', '麻布软装'],
            lighting: ['柔和自然光', '仿古书院灯具', '阅读专用台灯'],
            spaces: [
                '大堂：书院庭院风格，青砖铺地配竹林景观',
                '客房：简约书房设计，配备茶具和古籍',
                '会议室：古代讲堂布局，利于学术交流'
            ],
            experience: [
                '文化体验：提供古代服饰试穿拍照',
                '学习空间：设置安静的阅读角落',
                '茶文化：每日茶艺表演和品茶活动'
            ]
        },
        '雾江光书': {
            colorPalette: ['雾蓝色 #B0C4DE', '荧光橙色 #FF6347', '江水绿色 #2E8B57', '石板灰色 #696969'],
            materials: ['磨砂玻璃', 'LED灯带', '天然石材', '现代金属'],
            lighting: ['动态LED灯光系统', '荧光装饰元素', '水波纹投影'],
            spaces: [
                '大堂：现代艺术装置，模拟湘江雾气效果',
                '客房：智能灯光系统，可调节色温营造不同氛围',
                '艺术走廊：展示当代与传统结合的光影艺术'
            ],
            experience: [
                '科技体验：AR技术展示湘江历史变迁',
                '艺术互动：客人可参与光影诗词创作',
                '夜景观赏：顶层观景台欣赏湘江夜景'
            ]
        },
        '舟语茶韵': {
            colorPalette: ['茶汤琥珀色 #FFBF00', '竹青色 #7CB342', '船木棕色 #8B4513', '瓷白色 #F8F8FF'],
            materials: ['船木家具', '竹制装饰', '陶瓷器皿', '丝绸织物'],
            lighting: ['温馨茶室灯光', '仿古船舱照明', '水面反射光效'],
            spaces: [
                '茶室：仿古渡船设计，可俯瞰水景',
                '客房：船舱风格布局，配备精美茶具',
                '餐厅：湘江渔船主题，提供地道湘菜'
            ],
            experience: [
                '茶文化：专业茶艺师现场表演',
                '渡船体验：提供湘江游船服务',
                '美食文化：品尝传统湘菜和茶点'
            ]
        },
        '声墙迷径': {
            colorPalette: ['麻石灰色 #A9A9A9', '古铜色 #B87333', '深棕色 #654321', '象牙白 #FFFFF0'],
            materials: ['天然麻石', '古铜装饰', '木质隔音板', '传统织物'],
            lighting: ['隐藏式音响灯光', '复古工业照明', '声控智能系统'],
            spaces: [
                '声景体验区：重现历史声音的互动空间',
                '客房：隔音设计优良，配备高品质音响',
                '文化展示廊：展示长沙历史声音档案'
            ],
            experience: [
                '声音体验：聆听不同历史时期的长沙声景',
                '互动展览：触摸式声音历史时间轴',
                '静谧空间：提供完全安静的冥想休息区'
            ]
        },
        '桥洞星野': {
            colorPalette: ['混凝土灰 #708090', '赭石红 #CD853F', '藻类绿 #228B22', '星光银 #C0C0C0'],
            materials: ['仿混凝土纹理板', '天然矿物颜料', '生态藻类装饰', '陶片风铃'],
            lighting: ['夜光星图投影', '藻类生长灯', '水波纹反射灯', '陶铃声控灯'],
            spaces: [
                '大堂：拱形穹顶设计，模拟桥洞空间，壁面展示治水神话壁画',
                '客房：混凝土质感墙面，配备生态藻类艺术装置',
                '艺术走廊：展示矿物颜料壁画，融合古代神话与现代生态'
            ],
            experience: [
                '生态艺术：客人可参与藻类培养和壁画创作体验',
                '声景互动：陶铃风铃系统，营造天籁般的声音环境',
                '神话体验：AR技术重现治水传说，与现代生态保护理念结合'
            ]
        },
        '渔火星辞': {
            colorPalette: ['渔火橙 #FF8C00', '乌篷黑 #2F2F2F', '江水蓝 #4682B4', '竹架黄 #DAA520'],
            materials: ['船木家具', '竹制装饰', '传统渔网纹理', '夜光涂料'],
            lighting: ['摇曳渔火灯', '星空投影系统', '方言诗词光影', '白鹭飞行轨迹灯'],
            spaces: [
                '大堂：乌篷船造型接待台，天花板模拟星空与渔火',
                '客房：船舱风格设计，配备方言诗词互动屏幕',
                '诗歌厅：竹架敲击体验区，可参与渔歌子对唱'
            ],
            experience: [
                '诗歌体验：每晚渔火诗会，客人可学习长沙方言诗歌',
                '文化传承：竹架密码解读，了解楚辞文化传统',
                '咖啡诗意：特色诗句拉花咖啡，将方言诗转化为视觉艺术'
            ]
        },
        '碑影沉香': {
            colorPalette: ['蝌蚪文墨 #2F2F2F', '激光蓝 #00BFFF', '江雾银 #C0C0C0', '禹王金 #FFD700'],
            materials: ['仿古石材', '激光投影设备', '雾化装置', '古籍装饰'],
            lighting: ['蝌蚪文激光投影', '水波光影系统', '雾篆效果灯', '古碑纹理灯'],
            spaces: [
                '大堂：禹王碑复刻装置，激光投影蝌蚪文到水幕墙',
                '客房：古碑拓片装饰，智能雾化系统营造江雾氛围',
                '文化展示区：77个蝌蚪文互动解读，结合现代水利工程'
            ],
            experience: [
                '古文解读：专业导览解释蝌蚪文含义，连接古今治水智慧',
                '光影艺术：夜间激光秀，将碑文投影到湘江水面效果',
                '科技融合：AR技术展示治水历史，体验古代与现代工程对话'
            ]
        },
        // === 哈尔滨中央大街主题设计灵感 ===
        '穹顶回响录': {
            colorPalette: ['巴洛克金色 #FFD700', '铸铁深蓝 #191970', '穹顶铜绿 #708090', '音符银白 #F5F5F5'],
            materials: ['铸铁装饰元素', '彩色玻璃镶嵌', '天然大理石', '丝绒软装'],
            lighting: ['穹顶聚光照明', '铸铁阳台暖光', '彩玻璃透射光效', '音乐律动灯光'],
            spaces: [
                '大堂：巴洛克穹顶设计，中央悬挂水晶吊灯模拟音符',
                '客房：铸铁阳台风格装饰，配备高品质音响系统',
                '音乐厅：仿马迭尔宾馆阳台设计，可举办小型音乐会'
            ],
            experience: [
                '音乐体验：每晚阳台音乐会，重现俄侨音乐传统',
                '建筑导览：专业讲解中央大街建筑声学特色',
                '互动演奏：客人可在铸铁阳台体验小提琴演奏'
            ]
        },
        '匠心如磐': {
            colorPalette: ['花岗岩灰 #696969', '工匠铜色 #CD853F', '冻土蓝 #4682B4', '银元白 #C0C0C0'],
            materials: ['天然花岗岩', '复古铜质五金', '实木工艺品', '羊毛毡织物'],
            lighting: ['工业风吊灯', '暖色调工作灯', '石材纹理投影', '手工艺展示灯'],
            spaces: [
                '大堂：面包石纹理地面，展示俄式铺路工艺模型',
                '客房：工匠工坊风格，墙面装饰手工工具艺术品',
                '工艺展示区：现场展示传统石材加工技艺'
            ],
            experience: [
                '工艺体验：客人可参与面包石雕刻体验',
                '匠人故事：每日分享中东铁路建设工匠传奇',
                '寒地智慧：展示极地建筑技术和生存哲学'
            ]
        },
        '暗码维新': {
            colorPalette: ['革命红 #DC143C', '密码黑 #2F2F2F', '窗棂棕 #8B4513', '月光银 #E6E6FA'],
            materials: ['复古木窗棂', '铁质装饰', '革命主题织物', '仿古纸张装饰'],
            lighting: ['隐秘式照明', '月光模拟灯', '红色主题灯光', '密码投影灯'],
            spaces: [
                '大堂：设置密码解谜互动区，重现革命历史场景',
                '客房：窗棂装饰配合历史故事展示',
                '密室体验区：沉浸式革命历史剧本杀空间'
            ],
            experience: [
                '历史解谜：客人可参与革命密码破译游戏',
                '红色教育：专业讲解地下党革命历史',
                '沉浸体验：角色扮演1940年代革命情景'
            ]
        },
        '冰刃生花': {
            colorPalette: ['冰晶蓝 #B0E0E6', '霜花白 #FFFAFA', '窗棂褐 #A0522D', '生命绿 #228B22'],
            materials: ['仿冰材质装饰', '天然木材', '玻璃艺术品', '植物纤维织物'],
            lighting: ['冰晶效果灯', '自然光模拟', '植物生长灯', '季节变化灯光'],
            spaces: [
                '大堂：冰雪艺术装置，展现寒地生存美学',
                '客房：冰花窗棂设计，四季变化主题装饰',
                '温室花园：室内热带植物与冰雪元素对比'
            ],
            experience: [
                '冰雪艺术：客人可参与冰雕和雪花剪纸制作',
                '生存哲学：体验寒地居民的生活智慧',
                '季节体验：模拟哈尔滨四季变化的沉浸空间'
            ]
        },
        '钢轨纹章': {
            colorPalette: ['铁轨银 #C0C0C0', '枕木棕 #8B4513', '商埠金 #DAA520', '国际蓝 #4169E1'],
            materials: ['金属轨道装饰', '复古木材', '皮革软装', '工业风金属'],
            lighting: ['轨道线性灯', '复古火车灯', '商埠氛围灯', '国际风情灯'],
            spaces: [
                '大堂：中东铁路主题设计，展示国际商埠历史',
                '客房：火车包厢风格，配备复古旅行箱装饰',
                '铁路博物馆：展示中东铁路建设历史文物'
            ],
            experience: [
                '铁路历史：专业讲解中东铁路建设传奇',
                '商埠文化：体验多国商贾贸易往来场景',
                '复古旅行：提供复古火车主题下午茶服务'
            ]
        },
        '穹光纪事': {
            colorPalette: ['彩玻璃蓝 #4169E1', '移民金 #FFD700', '教堂紫 #9370DB', '史诗白 #F8F8FF'],
            materials: ['彩色玻璃', '宗教艺术装饰', '移民文化织物', '历史文献装饰'],
            lighting: ['彩玻璃透射光', '宗教氛围灯', '历史展示灯', '多元文化灯光'],
            spaces: [
                '大堂：彩色玻璃穹顶，展现移民史诗主题',
                '客房：不同移民文化主题房间设计',
                '文化展示厅：多元移民文化艺术品展览'
            ],
            experience: [
                '移民史诗：了解哈尔滨多元移民文化历史',
                '宗教艺术：参观彩色玻璃艺术制作工艺',
                '文化融合：体验俄、犹太、中华文化交融'
            ]
        },
        '砌缝春秋': {
            colorPalette: ['砖缝灰 #808080', '微生物绿 #6B8E23', '岁月黄 #F0E68C', '生命橙 #FF8C00'],
            materials: ['复古砖石', '微生物艺术装饰', '天然纤维', '生态环保材料'],
            lighting: ['微观世界灯', '生态系统灯', '时光流逝灯', '生命律动灯'],
            spaces: [
                '大堂：微生物艺术装置，展现建筑生态系统',
                '客房：生态主题设计，体现人与自然和谐',
                '生态实验室：展示建筑微生物生态研究'
            ],
            experience: [
                '微观世界：显微镜观察建筑微生物生态',
                '生态教育：了解建筑与自然共生的智慧',
                '时光见证：感受百年建筑的生命力'
            ]
        },
        '冻土纹身': {
            colorPalette: ['冻土棕 #8B4513', '冰雪白 #FFFAFA', '时光蓝 #4682B4', '纹理金 #DAA520'],
            materials: ['仿冻土材质', '冰雪效果装饰', '时光纹理材料', '自然石材'],
            lighting: ['冻土纹理灯', '冰雪效果灯', '时光印记灯', '自然律动灯'],
            spaces: [
                '大堂：冻土纹理艺术墙，展现时光雕刻痕迹',
                '客房：冰雪与土地主题，体现寒地建筑特色',
                '时光隧道：展示哈尔滨城市发展历程'
            ],
            experience: [
                '时光印记：触摸感受冻土纹理的历史痕迹',
                '寒地建筑：了解极地建筑与自然的对话',
                '城市记忆：回顾哈尔滨百年城市变迁'
            ]
        }
    };
    
    const inspiration = inspirations[theme.mainTitle] || {
        colorPalette: ['主题色彩待定'],
        materials: ['装饰材料待定'],
        lighting: ['照明设计待定'],
        spaces: ['空间设计待定'],
        experience: ['体验设计待定']
    };
    
    return `
        <div class="design-inspiration-content">
            <div class="inspiration-intro">
                <p>基于"${theme.mainTitle}"主题，为英迪格酒店${userLocation}项目提供以下设计建议：</p>
            </div>
            
            <div class="inspiration-section">
                <h4 class="inspiration-title">🎨 色彩搭配</h4>
                <div class="color-palette">
                    ${inspiration.colorPalette.map(color => `
                        <div class="color-item">
                            <div class="color-swatch" style="background-color: ${color.split(' ')[1] || '#ccc'}"></div>
                            <span class="color-name">${color}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="inspiration-section">
                <h4 class="inspiration-title">🏗️ 材质选择</h4>
                <ul class="inspiration-list">
                    ${inspiration.materials.map(material => `<li>${material}</li>`).join('')}
                </ul>
            </div>
            
            <div class="inspiration-section">
                <h4 class="inspiration-title">💡 照明设计</h4>
                <ul class="inspiration-list">
                    ${inspiration.lighting.map(light => `<li>${light}</li>`).join('')}
                </ul>
            </div>
            
            <div class="inspiration-section">
                <h4 class="inspiration-title">🏨 空间设计</h4>
                <div class="space-designs">
                    ${inspiration.spaces.map(space => `
                        <div class="space-item">
                            <p>${space}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="inspiration-section">
                <h4 class="inspiration-title">✨ 体验设计</h4>
                <div class="experience-designs">
                    ${inspiration.experience.map(exp => `
                        <div class="experience-item">
                            <p>${exp}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ===== 添加故事文档交互事件 =====
function addStoryDocumentInteractions() {
    // 主题切换事件
    const themeNavTabs = document.querySelectorAll('.theme-nav-tab');
    const themePanels = document.querySelectorAll('.story-theme-panel');
    
    themeNavTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const themeIndex = tab.getAttribute('data-theme-index');
            
            // 更新导航标签状态
            themeNavTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 更新内容面板状态
            themePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('data-theme-index') === themeIndex) {
                    panel.classList.add('active');
                }
            });
        });
    });
    
    // 故事结构导航事件
    const storyNavBtns = document.querySelectorAll('.story-nav-btn');
    const storySections = document.querySelectorAll('.story-section');
    
    storyNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            const parentPanel = btn.closest('.story-theme-panel');
            
            // 更新同一面板内的导航按钮状态
            const siblingBtns = parentPanel.querySelectorAll('.story-nav-btn');
            siblingBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新同一面板内的内容区域状态
            const siblingSections = parentPanel.querySelectorAll('.story-section');
            siblingSections.forEach(s => {
                s.classList.remove('active');
                if (s.getAttribute('data-section') === section) {
                    s.classList.add('active');
                }
            });
        });
    });
}

// ===== 复制设计灵感到剪贴板 =====
function copyDesignInspiration(themeName) {
    const designContent = getDetailedDesignInspiration(themeName);
    
    if (navigator.clipboard && window.isSecureContext) {
        // 使用现代 Clipboard API
        navigator.clipboard.writeText(designContent).then(() => {
            showNotification('设计灵感已复制到剪贴板', 'success');
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopyTextToClipboard(designContent);
        });
    } else {
        // 降级方案
        fallbackCopyTextToClipboard(designContent);
    }
}

// ===== 降级复制方案 =====
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // 避免滚动到底部
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('设计灵感已复制到剪贴板', 'success');
        } else {
            showNotification('复制失败，请手动选择文本复制', 'error');
        }
    } catch (err) {
        console.error('降级复制失败:', err);
        showNotification('复制失败，请手动选择文本复制', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ===== 下载设计灵感为文档 =====
function downloadDesignInspiration(themeName) {
    const designContent = getDetailedDesignInspiration(themeName);
    const fileName = `${themeName}_设计灵感.md`;
    
    // 创建 Blob 对象
    const blob = new Blob([designContent], { type: 'text/markdown;charset=utf-8' });
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 清理 URL 对象
    URL.revokeObjectURL(link.href);
    
    showNotification(`设计灵感文档 "${fileName}" 已下载`, 'success');
}

// ===== 显示通知消息 =====
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== 测试详细设计灵感功能 =====
