// ===== 全局变量 =====
let selectedThemes = []; // 改为数组，支持多选
let currentStep = 'location'; // location, document, confirmation, themes, story
let analysisDocument = null;
let generatedThemes = [];
let userLocation = null; // 保存用户输入的位置信息

// ===== 分析文档数据库 =====
const analysisDocumentsDB = {
    '苏州': {
        title: '苏州平江路区域分析报告',
        summary: '基于平江路历史文化街区的深度分析，涵盖历史背景、文化特色、经济环境、人文氛围及酒店市场分析',
        sections: {
            '历史背景': '平江路始建于春秋时期，距今已有2500多年历史。作为苏州古城的重要组成部分，平江路见证了苏州从春秋吴国到明清商贾的兴衰沉浮。这里曾是文人墨客雅集之所，亦是江南丝竹的发源地。古街保存完好的明清建筑群，展现了江南水乡的独特风貌。',
            '文化特色': '平江路承载着深厚的江南文化底蕴，包括：\n• 苏州评弹：江南曲艺的明珠，细腻婉转的唱腔\n• 昆曲艺术：被誉为"百戏之祖"的世界非物质文化遗产\n• 园林文化：体现"虽由人作，宛自天开"的造园理念\n• 丝绸工艺：精湛的苏绣和缂丝技艺\n• 茶文化：江南文人的品茗雅集传统',
            '经济环境': '平江路作为苏州重要的文化旅游区，经济活力强劲：\n• 年游客量超过500万人次\n• 周边商业设施完善，餐饮、购物、娱乐一应俱全\n• 交通便利，地铁直达，距离苏州站仅15分钟车程\n• 周边高端住宅区聚集，消费能力强\n• 文化产业发达，文创企业众多',
            '人文氛围': '平江路的人文氛围独特而浓郁：\n• 居民多为老苏州人，保持着传统的生活方式\n• 文化氛围浓厚，常有文人雅士在此品茗论道\n• 艺术气息浓郁，画廊、工作室、文化空间众多\n• 慢生活节奏，体现了江南水乡的悠闲特质\n• 国际化程度高，外国游客和居民较多',
            '酒店市场': '平江路周边酒店市场分析：\n• 现有酒店以精品民宿和主题酒店为主\n• 缺乏国际品牌高端酒店\n• 平均房价在800-1500元/晚\n• 入住率常年保持在70%以上\n• 客户群体以文化爱好者和高端游客为主',
            '竞品分析': '主要竞品酒店：\n• 平江府酒店：古典园林风格，房价1200-2000元\n• 苏州文旅酒店：现代简约风格，房价800-1200元\n• 平江路精品酒店：传统民居改造，房价600-1000元\n• 竞争优势：地理位置优越，文化底蕴深厚\n• 市场机会：高端文化主题酒店市场空白'
        }
    },
    '成都': {
        title: '成都宽窄巷子区域分析报告',
        summary: '基于宽窄巷子历史文化街区的全面分析，涵盖历史沿革、文化传承、经济发展、人文特色及酒店市场状况',
        sections: {
            '历史背景': '宽窄巷子始建于清朝康熙年间，距今已有300多年历史。这里曾是清朝八旗子弟的聚居地，留下了独特的满族文化印记。宽巷子、窄巷子、井巷子三条平行的街道，诉说着成都的历史变迁。青砖黛瓦的四合院，雕梁画栋的川西民居，无不展现着成都独特的建筑风格。',
            '文化特色': '宽窄巷子承载着丰富的成都文化：\n• 川剧变脸：四川独有的戏曲绝技，神秘莫测\n• 茶馆文化：成都人慢生活的典型代表\n• 蜀绣技艺：色彩艳丽、针法细腻的传统工艺\n• 火锅文化：麻辣鲜香的四川饮食文化\n• 盖碗茶：成都人独特的饮茶方式',
            '经济环境': '宽窄巷子作为成都重要的文化旅游地标：\n• 年游客量超过800万人次\n• 商业配套完善，餐饮、购物、娱乐设施齐全\n• 交通便利，地铁2号线直达\n• 周边高端商业区聚集，消费水平高\n• 文创产业发展迅速，文化创意企业众多',
            '人文氛围': '宽窄巷子的人文氛围独特：\n• 成都人悠闲的生活态度体现得淋漓尽致\n• 文化包容性强，传统与现代和谐共存\n• 艺术氛围浓厚，街头艺人、文化表演常见\n• 国际化程度高，外国游客和居民较多\n• 夜生活丰富，体现了成都的活力',
            '酒店市场': '宽窄巷子周边酒店市场：\n• 以精品酒店和主题民宿为主\n• 缺乏国际品牌高端酒店\n• 平均房价在600-1200元/晚\n• 入住率常年保持在75%以上\n• 客户群体以年轻游客和文化爱好者为主',
            '竞品分析': '主要竞品酒店：\n• 宽窄巷子精品酒店：传统川西风格，房价800-1500元\n• 成都文旅酒店：现代设计风格，房价600-1000元\n• 宽窄巷子民宿：民居改造，房价400-800元\n• 竞争优势：地理位置核心，文化特色鲜明\n• 市场机会：高端文化主题酒店需求旺盛'
        }
    },
    '杭州': {
        title: '杭州西湖区域分析报告',
        summary: '基于西湖风景名胜区的深度调研，涵盖历史文脉、文化底蕴、经济活力、人文环境及酒店市场分析',
        sections: {
            '历史背景': '西湖历史悠久，始于南宋，距今已有800多年历史。作为杭州的文化符号，西湖承载着深厚的历史底蕴。从白居易的"最爱湖东行不足"，到苏轼的"欲把西湖比西子"，无数文人墨客为西湖留下了不朽的诗篇。西湖十景，每一景都有诗意的命名，无不展现着江南的诗情画意。',
            '文化特色': '西湖承载着丰富的杭州文化：\n• 龙井茶韵：中国十大名茶之首，色翠香郁\n• 丝绸之府：精湛的丝绸工艺和刺绣技艺\n• 越剧雅韵：细腻婉转的江南戏曲艺术\n• 南宋遗韵：精致典雅的南宋文化传承\n• 诗词文化：历代文人墨客的诗意表达',
            '经济环境': '西湖作为杭州的核心旅游区：\n• 年游客量超过2000万人次\n• 商业设施完善，高端购物中心众多\n• 交通便利，地铁1号线直达\n• 周边高端住宅区聚集，消费能力强\n• 文化产业发达，文创园区众多',
            '人文氛围': '西湖的人文氛围优雅：\n• 杭州人精致的生活品味体现明显\n• 文化氛围浓厚，艺术展览、文化活动频繁\n• 国际化程度高，外国游客和居民众多\n• 夜生活丰富，体现了杭州的活力\n• 环保意识强，体现了现代都市的文明',
            '酒店市场': '西湖周边酒店市场：\n• 以高端酒店和精品酒店为主\n• 国际品牌酒店较多\n• 平均房价在1000-2500元/晚\n• 入住率常年保持在80%以上\n• 客户群体以商务客人和高端游客为主',
            '竞品分析': '主要竞品酒店：\n• 西湖国宾馆：传统园林风格，房价2000-4000元\n• 杭州凯悦酒店：现代豪华风格，房价1500-2500元\n• 西湖精品酒店：文化主题风格，房价1000-1800元\n• 竞争优势：地理位置优越，文化底蕴深厚\n• 市场机会：文化主题高端酒店市场潜力大'
        }
    }
};

// ===== 故事主题数据库 =====
const storyThemesDB = {
    '苏州': [
        {
            mainTitle: '江南丝竹·平江古韵',
            subTitle: '千年文脉与现代奢华的完美融合',
            elements: ['苏州评弹', '昆曲艺术', '园林造境', '丝绸工艺', '茶文化'],
            description: '以苏州评弹的细腻婉转为灵感，将江南丝竹的韵律融入酒店设计。客房以昆曲《牡丹亭》为设计主题，公共空间展现园林"虽由人作，宛自天开"的意境。丝绸元素贯穿整个空间，营造出江南水乡的温婉与奢华。'
        },
        {
            mainTitle: '文人雅集·书香门第',
            subTitle: '传承江南文人精神的文化空间',
            elements: ['文人文化', '诗词歌赋', '书画艺术', '品茗论道', '雅集传统'],
            description: '以江南文人的雅集文化为核心，打造书香门第式的酒店体验。大堂设计成文人书房，客房以历代文人墨客为灵感，公共区域设置品茗空间和书画展示区，让客人体验江南文人的精神世界。'
        },
        {
            mainTitle: '水乡梦境·枕河而居',
            subTitle: '江南水乡的诗意栖居',
            elements: ['水乡文化', '古桥流水', '粉墙黛瓦', '江南建筑', '水韵风情'],
            description: '以江南水乡的独特风貌为设计灵感，将古桥流水、粉墙黛瓦的元素融入酒店空间。客房设计成临水而居的江南民居，公共区域营造出小桥流水的意境，让客人体验江南水乡的诗意生活。'
        },
        {
            mainTitle: '苏绣华章·匠心传承',
            subTitle: '传统工艺与现代设计的完美结合',
            elements: ['苏绣技艺', '丝绸文化', '传统工艺', '匠心精神', '文化传承'],
            description: '以苏绣的精湛工艺为设计灵感，将丝绸的华美与刺绣的细腻融入酒店空间。客房以不同苏绣图案为主题，公共区域展示传统工艺，让客人感受江南工艺的精美与匠心。'
        },
        {
            mainTitle: '园林雅境·移步换景',
            subTitle: '苏州园林艺术的现代诠释',
            elements: ['园林艺术', '造园理念', '移步换景', '假山池沼', '花木配置'],
            description: '以苏州园林的造园艺术为核心，将"虽由人作，宛自天开"的理念融入酒店设计。公共区域营造园林意境，客房设计体现园林美学，让客人体验江南园林的诗意栖居。'
        },
        {
            mainTitle: '古街记忆·市井风情',
            subTitle: '平江路古街文化的现代演绎',
            elements: ['古街文化', '市井风情', '传统建筑', '商业文化', '历史记忆'],
            description: '以平江路古街的历史文化为灵感，将市井风情与现代设计融合。大堂设计成古街风貌，客房融入传统建筑元素，公共区域营造古街氛围，让客人感受苏州古街的历史韵味。'
        },
        {
            mainTitle: '昆曲雅韵·戏曲人生',
            subTitle: '昆曲艺术的现代空间表达',
            elements: ['昆曲艺术', '戏曲文化', '舞台美学', '音乐韵律', '表演艺术'],
            description: '以昆曲的优雅艺术为核心，将戏曲美学融入酒店空间。客房以昆曲剧目为主题，公共区域设置戏曲文化展示，让客人体验昆曲艺术的优雅与韵味。'
        },
        {
            mainTitle: '茶香雅集·品茗论道',
            subTitle: '江南茶文化的诗意表达',
            elements: ['茶文化', '品茗雅集', '茶艺美学', '文人茶事', '江南茶韵'],
            description: '以江南茶文化为核心，打造品茗论道的酒店体验。大堂设计成茶文化空间，客房融入茶艺元素，公共区域设置品茶空间，让客人体验江南文人的茶事雅集。'
        }
    ],
    '成都': [
        {
            mainTitle: '天府之国·慢生活',
            subTitle: '成都悠闲生活方式的现代诠释',
            elements: ['茶馆文化', '慢生活', '盖碗茶', '摆龙门阵', '成都生活'],
            description: '以成都独特的茶馆文化为核心，打造慢生活主题酒店。大堂设计成老成都茶馆，客房融入盖碗茶元素，公共区域设置品茶空间和聊天区域，让客人体验成都人的悠闲生活态度。'
        },
        {
            mainTitle: '川剧变脸·神秘魅力',
            subTitle: '四川戏曲艺术的现代演绎',
            elements: ['川剧变脸', '戏曲艺术', '脸谱文化', '四川文化', '非遗传承'],
            description: '以川剧变脸的神秘魅力为灵感，将脸谱文化融入酒店设计。客房以不同脸谱为主题，公共空间展现川剧艺术的魅力，让客人感受四川文化的独特魅力。'
        },
        {
            mainTitle: '火锅文化·热情如火',
            subTitle: '四川饮食文化的空间表达',
            elements: ['火锅文化', '麻辣鲜香', '四川美食', '热情豪爽', '生活方式'],
            description: '以四川火锅文化为核心，打造热情如火的酒店体验。餐厅设计成火锅文化展示空间，客房融入四川美食元素，公共区域营造出四川人热情豪爽的氛围。'
        },
        {
            mainTitle: '蜀绣华彩·锦绣天府',
            subTitle: '四川传统工艺的现代传承',
            elements: ['蜀绣技艺', '丝绸文化', '传统工艺', '四川特色', '工艺美学'],
            description: '以蜀绣的精美工艺为设计灵感，将四川传统工艺融入酒店空间。客房以蜀绣图案为主题，公共区域展示传统工艺，让客人感受四川工艺的精美与独特。'
        },
        {
            mainTitle: '宽窄巷子·古韵今风',
            subTitle: '成都古街文化的现代诠释',
            elements: ['古街文化', '川西建筑', '历史文化', '现代融合', '城市记忆'],
            description: '以宽窄巷子的历史文化为核心，将古街风貌与现代设计融合。大堂设计成古街风貌，客房融入川西建筑元素，公共区域营造古街氛围，让客人感受成都的历史韵味。'
        },
        {
            mainTitle: '熊猫故乡·萌趣天府',
            subTitle: '四川自然文化的可爱表达',
            elements: ['熊猫文化', '自然生态', '萌趣设计', '四川特色', '动物保护'],
            description: '以熊猫文化为核心，打造萌趣可爱的酒店体验。客房以熊猫元素为主题，公共区域设置熊猫文化展示，让客人感受四川的自然魅力和熊猫的可爱。'
        },
        {
            mainTitle: '川菜美食·味蕾盛宴',
            subTitle: '四川饮食文化的空间诠释',
            elements: ['川菜文化', '美食体验', '麻辣文化', '饮食美学', '味觉艺术'],
            description: '以川菜文化为核心，打造美食主题酒店。餐厅设计成川菜文化展示空间，客房融入美食元素，公共区域营造美食氛围，让客人体验四川美食的魅力。'
        },
        {
            mainTitle: '蜀道文化·古道今风',
            subTitle: '四川历史文化的现代传承',
            elements: ['蜀道文化', '历史文化', '古道精神', '现代传承', '文化底蕴'],
            description: '以蜀道文化为核心，将历史古道精神融入酒店设计。客房以蜀道文化为主题，公共区域展示历史文化，让客人感受四川深厚的历史底蕴和文化传承。'
        }
    ],
    '杭州': [
        {
            mainTitle: '西湖十景·诗画江南',
            subTitle: '西湖美景的诗意再现',
            elements: ['西湖十景', '诗词文化', '江南诗画', '自然景观', '杭州记忆'],
            description: '以西湖十景为设计灵感，将诗画江南的意境融入酒店空间。客房以不同景点为主题，公共区域展现西湖的诗情画意，让客人体验江南的诗意生活。'
        },
        {
            mainTitle: '龙井茶韵·品茗人生',
            subTitle: '杭州茶文化的优雅表达',
            elements: ['龙井茶韵', '茶文化', '品茗人生', '杭州特产', '品质生活'],
            description: '以龙井茶文化为核心，打造品茗人生的酒店体验。大堂设计成茶文化展示空间，客房融入龙井茶元素，公共区域设置品茶空间，让客人体验杭州人的品质生活。'
        },
        {
            mainTitle: '南宋遗韵·古都风华',
            subTitle: '南宋文化的现代传承',
            elements: ['南宋文化', '古都风华', '历史文化', '杭州底蕴', '文化传承'],
            description: '以南宋文化为设计灵感，将古都风华融入酒店空间。客房以南宋文化为主题，公共区域展现南宋的精致典雅，让客人感受杭州深厚的历史底蕴。'
        },
        {
            mainTitle: '丝绸之府·锦绣杭州',
            subTitle: '杭州丝绸文化的华美表达',
            elements: ['丝绸文化', '丝绸工艺', '杭州特产', '华美设计', '工艺传承'],
            description: '以杭州丝绸文化为核心，将丝绸的华美融入酒店设计。客房以丝绸元素为主题，公共区域展示丝绸工艺，让客人感受杭州丝绸的精美与华贵。'
        },
        {
            mainTitle: '越剧雅韵·江南戏曲',
            subTitle: '越剧艺术的现代空间表达',
            elements: ['越剧艺术', '戏曲文化', '江南戏曲', '音乐韵律', '表演艺术'],
            description: '以越剧的优雅艺术为核心，将戏曲美学融入酒店空间。客房以越剧剧目为主题，公共区域设置戏曲文化展示，让客人体验越剧艺术的优雅与韵味。'
        },
        {
            mainTitle: '钱塘江潮·潮起潮落',
            subTitle: '杭州自然文化的壮美表达',
            elements: ['钱塘江潮', '自然景观', '潮汐文化', '壮美景观', '自然力量'],
            description: '以钱塘江潮的壮美景观为设计灵感，将自然力量融入酒店空间。客房以潮汐文化为主题，公共区域展现自然景观，让客人感受杭州自然文化的壮美。'
        },
        {
            mainTitle: '灵隐禅意·佛国净土',
            subTitle: '杭州佛教文化的禅意表达',
            elements: ['佛教文化', '禅意美学', '灵隐文化', '心灵净化', '精神追求'],
            description: '以杭州佛教文化为核心，打造禅意净土的酒店体验。客房以禅意美学为主题，公共区域营造禅意氛围，让客人体验心灵的净化和精神的追求。'
        },
        {
            mainTitle: '杭州记忆·城市故事',
            subTitle: '杭州城市文化的现代传承',
            elements: ['城市文化', '历史记忆', '现代发展', '文化融合', '城市精神'],
            description: '以杭州城市文化为核心，将历史记忆与现代发展融合。客房以城市故事为主题，公共区域展示城市文化，让客人感受杭州的城市精神和文化魅力。'
        }
    ]
};

// ===== 获取分析文档 =====
function getAnalysisDocument(location) {
    for (const key in analysisDocumentsDB) {
        if (location.includes(key)) {
            return analysisDocumentsDB[key];
        }
    }
    
    // 默认文档
    return {
        title: `${location}区域分析报告`,
        summary: `基于${location}的深度分析，涵盖历史背景、文化特色、经济环境、人文氛围及酒店市场分析`,
        sections: {
            '历史背景': '该地区历史悠久，承载着深厚的文化底蕴。从古至今，这里见证了历史的变迁，留下了丰富的文化遗产。',
            '文化特色': '该地区文化特色鲜明，包括传统工艺、民俗文化、艺术形式等，体现了独特的地方文化魅力。',
            '经济环境': '该地区经济发展良好，商业设施完善，交通便利，为酒店业发展提供了良好的基础条件。',
            '人文氛围': '该地区人文氛围浓厚，居民文化素质较高，文化包容性强，为酒店营造了良好的文化环境。',
            '酒店市场': '该地区酒店市场发展潜力大，现有酒店以中端为主，高端酒店市场存在空白，为品牌酒店提供了发展机会。',
            '竞品分析': '该地区主要竞品酒店以本地品牌为主，缺乏国际品牌，为英迪格酒店提供了差异化竞争的机会。'
        }
    };
}

// ===== 获取故事主题 =====
function getStoryThemes(location) {
    for (const key in storyThemesDB) {
        if (location.includes(key)) {
            return storyThemesDB[key];
        }
    }
    
    // 默认主题
    return [
        {
            mainTitle: '文化传承·现代演绎',
            subTitle: '传统文化与现代设计的完美结合',
            elements: ['历史文化', '传统工艺', '现代设计', '文化传承', '创新表达'],
            description: '以当地深厚的历史文化为基础，融入现代设计理念，打造既传承文化又符合现代审美的酒店空间。'
        },
        {
            mainTitle: '人文精神·诗意栖居',
            subTitle: '人文精神的现代诠释',
            elements: ['人文精神', '诗意栖居', '文化内涵', '精神追求', '生活美学'],
            description: '以人文精神为核心，营造诗意栖居的酒店环境，让客人在现代生活中体验传统文化的魅力。'
        },
        {
            mainTitle: '地方特色·独特体验',
            subTitle: '地方文化的独特表达',
            elements: ['地方特色', '独特体验', '文化差异', '地方魅力', '体验设计'],
            description: '以地方特色为设计灵感，打造独特的酒店体验，让客人感受当地文化的独特魅力。'
        }
    ];
}

// ===== 添加消息到聊天区域 =====
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
    
    let contentHTML = `
        <div class="document-section">
            <div class="document-section-title">${documentData.title}</div>
            <div class="document-section-content">
                <p>${documentData.summary}</p>
            </div>
        </div>
    `;
    
    // 创建分析表格
    contentHTML += `
        <div class="document-section">
            <div class="document-section-title">详细分析</div>
            <table class="document-table">
                <thead>
                    <tr>
                        <th>分析维度</th>
                        <th>现状描述</th>
                        <th class="highlight">优化建议</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (const [sectionTitle, sectionContent] of Object.entries(documentData.sections)) {
        const lines = sectionContent.split('\n');
        const currentSituation = lines[0] || sectionContent;
        const suggestions = lines.slice(1).filter(line => line.trim()).join('；') || '基于现状进行深度挖掘和主题提炼';
        
        contentHTML += `
            <tr>
                <td><strong>${sectionTitle}</strong></td>
                <td>${currentSituation}</td>
                <td>${suggestions}</td>
            </tr>
        `;
    }
    
    contentHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    documentContent.innerHTML = contentHTML;
    
    // 添加关闭按钮事件监听器
    addCloseButtonListener();
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
    const openBtn = messageDiv.querySelector('.document-open-btn');
    const confirmBtn = messageDiv.querySelector('.confirm-analysis-btn');
    
    // 文档卡片点击事件
    documentCard.addEventListener('click', () => {
        showDocumentContent(analysisDocument);
        documentCard.classList.add('selected');
    });
    
    // 打开按钮点击事件
    openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showDocumentContent(analysisDocument);
        documentCard.classList.add('selected');
    });
    
    // 确认按钮事件
    confirmBtn.addEventListener('click', () => {
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            
            generatedThemes = getStoryThemes(userLocation);
            addMessage(generatedThemes, false, 'themes');
            
            currentStep = 'themes';
        }, 2000);
    });
}

// ===== 添加主题相关事件监听器 =====
function addThemeListeners(messageDiv) {
    const themeCards = messageDiv.querySelectorAll('.theme-card');
    const counterElement = messageDiv.querySelector('.selected-count');
    
    // 更新选择计数
    function updateCounter() {
        const count = selectedThemes.length;
        counterElement.textContent = count;
        
        // 更新按钮状态
        const generateBtn = messageDiv.querySelector('.generate-story-btn');
        if (generateBtn) {
            if (count === 3) {
                generateBtn.disabled = false;
                generateBtn.classList.remove('disabled');
                generateBtn.innerHTML = `
                    <span>生成邻间故事文档</span>
                    <span class="btn-icon">→</span>
                `;
            } else {
                generateBtn.disabled = true;
                generateBtn.classList.add('disabled');
                generateBtn.innerHTML = `
                    <span>请选择3个主题</span>
                    <span class="btn-icon">→</span>
                `;
            }
        }
    }
    
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const themeIndex = parseInt(card.dataset.theme);
            const theme = generatedThemes[themeIndex];
            
            if (card.classList.contains('selected')) {
                // 取消选择
                card.classList.remove('selected');
                selectedThemes = selectedThemes.filter(t => t !== theme);
            } else {
                // 选择主题
                if (selectedThemes.length < 3) {
                    card.classList.add('selected');
                    selectedThemes.push(theme);
                } else {
                    // 已达到最大选择数量，提示用户
                    alert('最多只能选择3个主题');
                    return;
                }
            }
            
            updateCounter();
            
            // 显示生成故事按钮（如果还没有的话）
            if (!messageDiv.querySelector('.generate-story-btn')) {
                const actionButtons = messageDiv.querySelector('.action-buttons');
                if (!actionButtons) {
                    const actionButtonsDiv = document.createElement('div');
                    actionButtonsDiv.className = 'action-buttons';
                    messageDiv.querySelector('.message-bubble').appendChild(actionButtonsDiv);
                }
                
                const generateBtn = document.createElement('button');
                generateBtn.className = 'btn-primary generate-story-btn disabled';
                generateBtn.disabled = true;
                generateBtn.innerHTML = `
                    <span>请选择3个主题</span>
                    <span class="btn-icon">→</span>
                `;
                messageDiv.querySelector('.action-buttons').appendChild(generateBtn);
                
                generateBtn.addEventListener('click', () => {
                    if (selectedThemes.length === 3) {
                        showTypingIndicator();
                        
                        setTimeout(() => {
                            hideTypingIndicator();
                            generateStoryDocument(selectedThemes);
                            currentStep = 'story';
                        }, 2000);
                    }
                });
            }
        });
    });
}

// ===== 生成邻间故事文档 =====
function generateStoryDocument(themes) {
    const storyDocument = {
        title: `${userLocation}邻间故事设计文档`,
        summary: `基于选定的3个故事主题，为英迪格酒店${userLocation}项目量身定制的邻间故事设计文档`,
        themes: themes,
        sections: {
            '主题融合': `将${themes.map(t => t.mainTitle).join('、')}三个主题进行有机融合，创造出独特的邻间故事体验。每个主题都有其独特的文化内涵和设计语言，通过巧妙的融合，形成层次丰富、内涵深厚的酒店文化空间。`,
            '设计理念': `以"邻间故事"为核心设计理念，将当地文化、历史传承与现代生活方式完美结合。通过空间设计、视觉传达、服务体验等多个维度，让客人感受到深厚的文化底蕴和独特的在地体验。`,
            '空间规划': `酒店空间分为公共区域、客房区域和特色功能区。公共区域展现融合后的文化主题，客房区域提供舒适的文化体验，特色功能区提供深度的文化互动。每个区域都经过精心规划，确保功能性和文化性的完美结合。`,
            '文化元素': `融入${themes.map(t => t.elements.join('、')).join('、')}等文化元素，通过现代设计手法进行重新诠释。每个元素都经过精心挑选和设计，确保既保持传统文化的精髓，又符合现代审美和生活方式。`,
            '服务体验': `基于选定的主题，设计独特的服务体验流程。从入住到离店，每个环节都融入文化元素，让客人感受到完整的邻间故事体验。服务人员将接受专业培训，成为文化故事的讲述者。`,
            '品牌价值': `通过邻间故事的设计，强化英迪格酒店"邻间故事"的品牌价值。每个项目都将成为当地文化的现代诠释，为品牌注入独特的文化内涵和差异化竞争优势。`
        }
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
    const documentPanel = document.getElementById('document-panel');
    const documentContent = document.getElementById('document-content');
    const documentStatus = document.getElementById('document-status');
    const chatPanel = document.querySelector('.chat-panel');
    
    // 显示右侧文档面板
    documentPanel.style.display = 'flex';
    chatPanel.classList.add('with-document');
    
    documentStatus.innerHTML = '<span class="status-text">故事文档生成完成</span>';
    
    const storyDocument = {
        title: `${userLocation}邻间故事设计文档`,
        summary: `基于选定的3个故事主题，为英迪格酒店${userLocation}项目量身定制的邻间故事设计文档`,
        themes: selectedThemes,
        sections: {
            '主题融合': `将${selectedThemes.map(t => t.mainTitle).join('、')}三个主题进行有机融合，创造出独特的邻间故事体验。每个主题都有其独特的文化内涵和设计语言，通过巧妙的融合，形成层次丰富、内涵深厚的酒店文化空间。`,
            '设计理念': `以"邻间故事"为核心设计理念，将当地文化、历史传承与现代生活方式完美结合。通过空间设计、视觉传达、服务体验等多个维度，让客人感受到深厚的文化底蕴和独特的在地体验。`,
            '空间规划': `酒店空间分为公共区域、客房区域和特色功能区。公共区域展现融合后的文化主题，客房区域提供舒适的文化体验，特色功能区提供深度的文化互动。每个区域都经过精心规划，确保功能性和文化性的完美结合。`,
            '文化元素': `融入${selectedThemes.map(t => t.elements.join('、')).join('、')}等文化元素，通过现代设计手法进行重新诠释。每个元素都经过精心挑选和设计，确保既保持传统文化的精髓，又符合现代审美和生活方式。`,
            '服务体验': `基于选定的主题，设计独特的服务体验流程。从入住到离店，每个环节都融入文化元素，让客人感受到完整的邻间故事体验。服务人员将接受专业培训，成为文化故事的讲述者。`,
            '品牌价值': `通过邻间故事的设计，强化英迪格酒店"邻间故事"的品牌价值。每个项目都将成为当地文化的现代诠释，为品牌注入独特的文化内涵和差异化竞争优势。`
        }
    };
    
    let contentHTML = `
        <div class="document-section">
            <div class="document-section-title">${storyDocument.title}</div>
            <div class="document-section-content">
                <p>${storyDocument.summary}</p>
            </div>
        </div>
    `;
    
    // 添加选定的主题
    contentHTML += `
        <div class="document-section">
            <div class="document-section-title">选定主题</div>
            <div class="document-section-content">
                <div class="selected-themes">
                    ${selectedThemes.map((theme, index) => `
                        <div class="selected-theme">
                            <div class="theme-number">${index + 1}</div>
                            <div class="theme-info">
                                <div class="theme-title">${theme.mainTitle}</div>
                                <div class="theme-subtitle">${theme.subTitle}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // 创建故事文档表格
    contentHTML += `
        <div class="document-section">
            <div class="document-section-title">设计详情</div>
            <table class="document-table">
                <thead>
                    <tr>
                        <th>设计维度</th>
                        <th>设计内容</th>
                        <th class="highlight">实施建议</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (const [sectionTitle, sectionContent] of Object.entries(storyDocument.sections)) {
        contentHTML += `
            <tr>
                <td><strong>${sectionTitle}</strong></td>
                <td>${sectionContent}</td>
                <td>基于选定主题进行深度设计和实施</td>
            </tr>
        `;
    }
    
    contentHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    documentContent.innerHTML = contentHTML;
    
    // 添加关闭按钮事件监听器
    addCloseButtonListener();
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