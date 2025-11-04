// ===== 数据访问函数 =====
// 这个文件负责从数据库中获取数据
// 就像图书管理员一样，当你告诉它你需要什么信息，它就会从"书架"（数据库）里找出来给你

/**
 * 根据位置获取分析文档
 * @param {string} location - 位置名称（例如：长沙、哈尔滨中央大街）
 * @returns {Object} 包含标题、摘要和各个章节的分析文档
 */
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

/**
 * 根据位置获取故事主题
 * @param {string} location - 位置名称
 * @returns {Array} 包含多个主题对象的数组
 */
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

