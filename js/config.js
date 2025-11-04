// ===== 全局变量和配置 =====
// 这个文件存储了应用程序运行时需要的所有全局变量

// 用户选择的主题列表（可以选多个）
let selectedThemes = [];

// 当前对话所处的步骤
// 可能的值：'location'（输入位置）、'document'（查看文档）、'confirmation'（确认）、'themes'（选择主题）、'story'（查看故事）
let currentStep = 'location';

// 当前查看的分析文档
let analysisDocument = null;

// AI生成的主题列表
let generatedThemes = [];

// 用户输入的酒店位置
let userLocation = null;

