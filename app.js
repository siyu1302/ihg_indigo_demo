// ===== 全局变量 =====
let selectedThemes = []; // 改为数组，支持多选
let currentStep = 'location'; // location, document, confirmation, themes, story
let analysisDocument = null;
let generatedThemes = [];
let userLocation = null; // 保存用户输入的位置信息

// ===== 分析文档数据库 =====
const analysisDocumentsDB = {
    '长沙': {
        title: '长沙市岳麓区湘江中路区域分析报告',
        summary: '基于湘江中路历史文化街区的深度分析，涵盖历史背景、文化特色、经济环境、人文氛围及酒店市场分析',
        sections: {
            '历史文化调研': `一、关键历史事件
1. 朱张会讲（南宋乾道三年，1167年）
- 事件概述：理学大师朱熹与张栻在岳麓书院展开为期两月的学术辩论，二人常经朱张渡往返湘江两岸书院。  
- 影响意义：开创中国书院会讲先河，奠定湖湘学派“经世致用”根基，使长沙成为南宋学术中心（《岳麓书院志》载）。  
2. 林左湘江夜话（清道光三十年，1850年）
- 事件概述：林则徐途经长沙，于朱张渡口舟中密会左宗棠，托付西域边防策略。  
- 影响意义：促成左宗棠日后收复新疆的方略，标志湖湘士人从学术向实务转型（《左宗棠年谱》佐证）。  
3. 杜甫长沙羁旅（唐大历四年，769年）
- 事件概述：杜甫晚年流寓长沙，栖居湘江畔，创作《江南逢李龟年》等诗作。  
- 影响意义：湘江成为文人羁旅意象载体，催生后世杜甫江阁等纪念建筑（《杜工部诗集》印证）。  

---

二、重要历史人物
1. 张栻（1133-1180，南宋）
- 背景：湖湘学派奠基人，执掌岳麓书院。  
- 事迹：主持朱张会讲，改革书院教育。  
- 贡献：确立“传道济民”办学宗旨，培养务实人才。  
- 文化影响：其渡江治学场景升华为湖湘精神符号。  
2. 左宗棠（1812-1885，清）
- 背景：湘军将领，洋务派代表。  
- 事迹：在湘江畔受林则徐西域方略启迪。  
- 贡献：实践“经世致用”，收复新疆。  
- 文化影响：强化湖湘文化与国家治理的联结。  

---

三、文化标志物
1. 朱张渡遗址（宋代始建）
- 描述：湘江东西两岸古渡口，现存“文津”“道岸”石碑及青铜雕塑群。  
- 渊源：因朱张会讲得名，千年间为书院学子必经之路。  
- 价值：中国教育史活的见证，2013年列为长沙市级文保单位。  
2. 杜甫江阁（2005年复建）
- 描述：仿唐风格楼阁，高18米，藏杜甫诗碑及湖湘书画。  
- 渊源：原址为杜甫长沙居所，清代曾建楼纪念。  
- 价值：湘江诗词文化地标，承载文人忧国情怀。  
3. 西文庙坪“道冠古今”牌坊（清同治年间）
- 描述：花岗岩牌坊，残高6米，雕饰儒家纹样。  
- 渊源：长沙府学宫遗存，抗战轰炸后仅存此构件。  
- 价值：长沙古城中轴线实证，2018年启动修复工程。  
4. 乐古道巷建筑群（明清至民国）
- 描述：麻石巷道串联青砖民居，保留封火墙、石库门。  
- 渊源：明清商贾聚居区，民国知识分子活跃地。  
- 价值：长沙城北仅存的原生街巷肌理样本。  

---

四、传统文化习俗
1. 湘江放灯（农历七月半）
- 内容：民众制作莲花灯放入湘江，寄托追思。  
- 内涵：融合佛教盂兰盆节与楚地水神崇拜，体现“逝者如江”的哲思。  
2. 书院祭学（春秋二祭）
- 内容：岳麓书院延续释奠礼，献帛、诵祝文。  
- 内涵：承袭朱张理学传统，强化“尊师重道”的地域认同。  

---

五、文化精神总结（198字）
湘江中路的千年文脉，以**水陆交汇**为地理根基，孕育三重文化特质：  
1. 学术实践交融：从朱张渡的理学争鸣到林左夜话的军政托付，体现湖湘“知行互济”传统；  
2. 刚柔文化共生：杜甫的沉郁诗情与左宗棠的经世铁血，形成“文能载道，武能安邦”的精神符号；  
3. 市井书院共生：乐古道巷的烟火生活与岳麓书院的庄严讲学，构成“雅俗共栖”的城市肌理。  
这种以**湘江为轴**、**书院为核**、**巷陌为脉**的格局，使长沙在战火与重建中始终保持文化韧性，成为解读湖湘基因的活态标本。`,
            '商业经济历史发展调研': `
一、重要经济时期
1. 农业渔业主导期（1996年前）  
  - 背景：岳麓区地处湘江西岸，远离长沙传统市中心。  
  - 内容：以农耕、渔业为主，商业活动零星。  
  - 影响：经济总量小，区域发展滞后。  
  - 意义：奠定本地自然经济基础，形成"半边乡下"格局[^2][^3]。  
2. 商贸崛起期（1996-2009年）  
  - 背景：1996年区划调整，岳麓区纳入长沙重点发展区域。  
  - 内容：湘江中路改造启动，连接河东河西；金星中路商业带初具雏形。  
  - 影响：吸引首批大型商业体入驻，商业面积年均增长15%[^3]。  
  - 意义：实现从农业区向城市新区的转型。  
3. 产业升级期（2009-2020年）  
  - 背景：2009年湘江新区规划获批，定位省级战略平台。  
  - 内容：形成高端商贸、现代金融、文化旅游六大产业；高新技术产业增加值突破500亿元（2024年）[^8]。  
  - 影响：GDP年均增速超8%，经济总量跃居长沙前列。  
  - 意义：确立"科创+文旅"双轮驱动模式。  

---

二、主导产业演变
4. 传统农渔业（1996年前）  
  - 背景：依湘江而生的自然经济形态。  
  - 规模：占当时区域经济70%以上[^2]。  
  - 特色：渔业资源丰富，稻田与渔场交织。  
  - 地位：维系早期居民生存的基础产业。  
5. 现代商贸服务业（1996-2020年）  
  - 背景：城市化进程加速。  
  - 规模：金星中路商业带聚集王府井等20余个大型项目，商业面积超百万平米[^4]。  
  - 特色："河西第一商街"定位高端消费。  
  - 地位：拉动岳麓区第三产业占比达62%（2024年）[^8]。  
6. 高新技术产业（2020年至今）  
  - 背景：湘江新区升级为国家级新区。  
  - 规模：高新技术产业增加值529.95亿元（2024年），占GDP20.8%[^8]。  
  - 特色：梅溪湖、洋湖片区集聚科创企业超3000家。  
  - 地位：长沙科创走廊核心载体。  

---

三、重要经济设施
7. 湘江中路（2000年建成）  
  - 基本情况：全长9.3公里，串联橘子洲大桥至猴子石大桥。  
  - 功能：交通动脉+滨水经济带，夜间客流超10万人次/日[^1]。  
  - 价值：沿岸商业地产溢价率达35%，催生"黄金水岸"经济圈。  
  - 影响：打破湘江两岸发展壁垒，推动河西土地价值倍增。  
8. 岳麓书院（北宋开宝九年建）  
  - 基本情况：中国古代四大书院之一，现存建筑为清代重建。  
  - 功能：文化教育核心+文旅融合载体。  
  - 价值：年接待游客300万人次，衍生文创产业规模超5亿。  
  - 影响：湖湘文化精神地标，持续赋能区域文化经济。  
9. 金星中路商业带（2005年形成）  
  - 基本情况：2.5公里核心商业街区。  
  - 功能：王府井、麦德龙等旗舰商业体聚合地。  
  - 价值：商业密度达12万㎡/公里，年销售额破百亿。  
  - 影响：重塑长沙商业格局，终结"河西无商圈"历史[^3][^4]。  
10. 梅溪湖国际新城（2010年启动）  
  - 基本情况：规划面积14.8平方公里。  
  - 功能：科创总部基地+国际会展中心。  
  - 价值：引进企业总部47家，年产值突破800亿。  
  - 影响：长沙城市新中心，承载25%区域经济增长[^8]。  
11. 长沙西站枢纽（2025年规划）  
  - 基本情况：国家级高铁枢纽，8台16线规模。  
  - 功能："一带一路"内陆节点，辐射中西部交通网。  
  - 价值：预计带动周边土地增值200亿元。  
  - 影响：强化岳麓区"承东启西"战略地位[^7]。`,
            '文化底蕴调研': `以下结合岳麓区文化特色与湘江中路地理特征，进行系统性文化解读：


---

第一部分：文化符号提炼与描写
1. 湘江流韵（自然人文纽带）  
  - 基本介绍：湘江纵贯岳麓，串联书院、洲岛与山峦，是湖湘文明的母亲河。  
  - 历史渊源：古为漕运要道，屈原行吟于此，杜甫"夜醉长沙酒"诗咏江畔，近代更成毛泽东"中流击水"的革命意象载体。  
  - 文化内涵：象征湖湘"兼容并蓄"的开放精神，见证商旅往来、文化碰撞与思想激荡。  
  - 现代价值：滨江景观带融合生态休闲与文创产业，塑造"山水洲城"城市名片。  
  - 文学描写：> 暮色浸染江面，货轮犁开金波，恍见千年前漕船载着稻米与书卷南行。橘子洲头烟花绽作星雨，江风裹挟书院墨香与渔歌，漫过现代玻璃幕墙，在杜甫江阁的飞檐下旋成一首未绝的长诗。
2. 书院文脉（学术精神图腾）  
  - 基本介绍：岳麓书院为中国最古老高等学府之一，"惟楚有材"昭示湖湘英才辈出。  
  - 历史渊源：朱熹、张栻会讲开创"道南正脉"，王夫之、魏源等思想家在此奠基经世致用学说。  
  - 文化内涵：凝聚"实事求是"的治学传统，催生近代维新变法与革命思潮。  
  - 现代价值：湖南大学延续学术基因，后湖艺术园将文脉转化为文创生产力。  
  - 文学描写：> 讲堂青砖沁着宋雨，廊柱拓印朱张辩难的余温。银杏叶覆上"实事求是"碑刻，光影间学子捧书走过，恰似当年蔡和森携《新青年》踏碎晨霜，惊起檐角铜铃叮咚——那是千年未息的智识回响。
3. 红枫星火（革命记忆载体）  
  - 基本介绍：岳麓山红枫与爱晚亭构成红色文化地标，新民学会旧址藏于湘江西岸巷陌。  
  - 历史渊源：毛泽东"携来百侣曾游"抒革命壮志，黄兴墓前松柏镌刻共和先驱热血。  
  - 文化内涵：枫叶如炬，象征"敢为人先"的湖湘血性与救国理想。  
  - 现代价值：红色研学路线活化历史，激励创新担当精神。  
  - 文学描写：> 秋霜染透枫林，爱晚亭朱柱似未干的血色。石阶上浮动着1921年青年的低语，当烟花在湘江夜空炸裂，漫天火流与山中红叶辉映，照亮新民学会木窗格上"改造中国"的刻痕。

---

第二部分：文化精髓总结
湘江中路所依存的岳麓文化，是**以山水为卷轴、以文脉为经络、以变革为魂魄**的独特体系。湘江奔流塑造了开放包容的基因，书院千年弦歌奠定"经世致用"的思想根基，儒释道在岳麓山和谐共生，淬炼出"心忧天下、敢为人先"的湖湘精神。近代更以橘子洲为起点，燃起改变中国的星火。  

当代滨江地带将历史厚度转化为发展动能：后湖艺术园让古韵邂逅现代设计，非遗工坊在坡子街烟火气中延续湘绣、棕编技艺，湘江灯光秀用科技演绎《沁园春》词境。这种"守正创新"的特质，使岳麓文化既是湖湘文明的活态博物馆，更是驱动长沙"网红城市"崛起的精神引擎。


---

第三部分：多维度深入分析
4. 历史文脉  
  - 北宋书院开文教先声，明清成为"湖湘学派"大本营；  
  - 1840年后魏源"睁眼看世界"、曾国藩建湘军，传统学术向近代转型；  
  - 1918年新民学会诞生标志红色火种燎原，奠定"革命摇篮"地位。
5. 人文环境  
  - 城市沿湘江西展，从古代码头到民国公馆群，至当代"滨江文化长廊"；  
  - 建筑层叠展现时代印记：书院飞檐、西式钟楼（湖南大学）、玻璃穹顶（梅溪湖）；  
  - 湘江中路设计观景台串联杜甫江阁与橘子洲，实现"步移景换"的诗意体验。
6. 民俗文化  
  - 端午龙舟：湘江上震天鼓声承袭屈原祭奠传统；  
  - 庙会市集：火宫殿庙会迁至滨江，糖画、花鼓戏与现代咖啡摊共生；  
  - 非遗新生：长沙弹词艺人于江畔茶馆开演，湘绣跨界时装周。
7. 饮食文化  
  - 江鲜风味：湘江鲌鱼配紫苏炆煮，延续"靠水吃水"智慧；  
  - 小吃密码：臭豆腐以江畔老卤为魂，茶颜悦色用书院元素创新包装；  
  - 饮食哲学：早茶喧闹体现"市井即道场"的生活禅意。
8. 文化传承  
  - 方言张力：塑普"你要哦该咯"的调侃中藏着楚语古音；  
  - 传说新编：禹王碑治水神话被创作为湘江灯光秀剧本；  
  - 教育深耕：中小学开设"岳麓文化"校本课程，组织橘子洲诗词朗诵。
9. 人文精神  
  - 从屈原"九死未悔"到青年毛泽东"问苍茫大地"，形成心系家国的担当意识；  
  - 市井活力与学术严谨并存：白天大学城治学，夜间渔人码头喧嚣；  
  - "吃得苦、耐得烦"的韧性与文创产业的爆发力，构成动态精神图谱。

---

湘江中路的魅力，在于让千年文脉在江风中流动：当游客抚摸书院砖墙的温度，在江滩听见穿越时空的橹声，于霓虹中读懂星城的古今对话，便触摸到湖湘文化生生不息的密码——**在厚重土地上，永远奔涌着创新的激流**。`,
            '社区人文故事调研': `以下是根据湘江中路特色提炼的深度人文故事与文化意象，聚焦小众视角与沉浸式体验：


---
一、独特故事元素
1. 夜光书法·石板诗痕  
  - 主题：湘江夜雾中，老人用荧光笔在沿岸石板书写唐诗宋词，晨光即隐的刹那艺术。  
  - 渊源：源于本地"雾中练字"养生传统，融合长沙"诗教"民俗，十年间渐成暗夜风景线。  
  - 价值：转瞬即逝的在地美学，将诗词文化转化为可触摸的公共艺术，承载市井文脉。  
  - 描写：子夜江雾漫起时，银发老者执荧光笔游走堤岸，笔尖在麻石上流淌《沁园春》的橘色光痕。墨迹在潮湿空气里氤氲成星，早班渡轮驶过带起微风，未干的"湘"字随波光碎成金粉，恰似银河坠入江水。赶早的渔人拾级而上，鞋底踏过发光的《爱莲说》，步步生莲走向雾中。
2. 轮渡茶局·移动茶馆  
  - 主题：湘江轮渡二层隐秘茶座，老茶客自带瓷杯登船，共饮三十分钟水上茶会。  
  - 渊源：上世纪航运鼎盛期形成的"舟行茶叙"习俗，今成小众仪式，恪守"船开沏茶，靠岸收杯"古礼。  
  - 价值：承载内河航运记忆的流动社交场，茶香中延续江湖儿女的快意人生。  
  - 描写：青瓷盖碗磕碰声里，渡轮突突驶离码头。穿竹布衫的茶博士从铜壶倾出滚水，君山银针在杯中悬立如林。茶客们凭窗看江鸥掠过货轮烟囱，忽有琵琶声从下层甲板飘来，老翁击节吟唱："三湘流水绕茶铛，半盏烟波煮夕阳"。茶汤随船身轻晃，倒映两岸楼影渐次亮起万家灯火。
3. 桥洞画廊·涂鸦秘境  
  - 主题：银盆岭大桥墩柱间的流浪画家，用矿物颜料绘制湘江神话壁画。  
  - 渊源：90年代美院学生发起的桥洞艺术实验，颜料取岳麓山赭石、湘江青泥，每年汛期后被水流重新创作。  
  - 价值：城市基建与自然力共筑的野生美术馆，展现水岸共生哲学。  
  - 描写：雨季涨潮前夜，桥墩水泥面浮出赭红锦鲤群。画者正将石绿掺入江水，为娥皇女英裙袂添上水纹。月光穿过桥缝照亮虞舜驾舟的侧影，藻类在画中渔网处自然生长。次日洪峰过境，水痕为九嶷山晕染出青色泪痕，待秋阳晒裂泥层，新故事又在斑驳处萌芽。

---
二、人文场景
4. 渔火读诗会  
  - 概述：每月朔夜，渔民在捞刀河口以乌篷船围成浮岛，朗诵自创的方言诗歌。  
  - 内涵：承袭楚地"泽畔吟"传统，以水波为韵律，船灯作舞台，创作湘江水系生态民谣。  
  - 意境：墨色江面浮起十数点橙黄渔灯，船头老妪敲打晾网竹架，沙哑吟诵："星子落水变银鱼咯——" 年轻渔夫接腔，波纹将俚语译成粼粼密码。桨声搅碎水中岳麓山倒影，诗句裹着樟叶香顺流而下，岸上夜跑者驻足静听，手机屏幕光渐次熄灭成新星。
5. 麻石巷声景博物馆  
  - 概述：潮宗街残存的百米麻石巷，墙内嵌陶罐收集百年市声。  
  - 内涵：湘江航运鼎盛期的声音记忆工程，收录1920年代纤夫号子至现代轮渡汽笛。  
  - 意境：耳贴沁凉麻石墙，旋开黄铜听筒：民国米市算盘珠脆响撞上现代外卖提示音，某处陶罐突然溢出橘子洲烟花爆破的闷响。穿堂风掠过巷弄时，所有陶罐共鸣成巨大排箫，将茶油香、桐油伞叫卖与婚丧唢呐织成交响，雨滴沿瓦当坠入罐中，溅起半个世纪的回音。

---
三、文化意象
6. 雾网金鳞  
  - 说明：深秋晨雾中，渔人晾晒的尼龙网挂满露珠，如悬浮的星图。  
  - 解读：隐喻"潇湘八景"渔村夕照的现代转译，水滴折射岳麓山轮廓，转瞬即逝的生态之诗。  
  - 诗意：  
银梭织就的晨雾里  
十万颗坠露抱紧岳麓倒影  
风从橘洲摇落枫叶  
碎金跃入经纬纵横的星野  
当第一缕阳光刺破江霭  
整张银河簌簌坠向竹篓  

7. 渡轮光书  
  - 说明：夜航轮渡用舷灯在江面投射诗句，光影随波涛变形。  
  - 解读：工业文明与诗教传统的碰撞，江水成为最灵动的书写卷轴。  
  - 诗意：  
铁兽睁开发烫的独眼  
将屈子的天问烙在波涛  
浪尖拆解墨迹成闪鳞  
漩涡吞咽离骚的偏旁  
待到光柱扫过防波堤  
残句已在礁石绽放成萤  


---
这些故事根植于湘江中路的肌理，以水为魂串联起：  
- 时空对话：荧光石板（瞬时）与桥洞壁画（周期）形成时间维度对照  
- 虚实相生：渡轮茶会（实景）与渔火诗会（声景）构建沉浸场域  
- 物我交融：雾网（自然介入人造物）与光书（人造物介入自然）展现生态哲思  
力求在300米江岸半径内，捕捉容易被忽略的在地灵韵。`,
            '周边竞品酒店调研': `以下基于竞品分析的酒店开发战略洞察，重点突出市场空白与实操机会：


---
一、竞品酒店深度分析
1. 长沙君悦酒店（五星）
- 基础概况：天心区湘江中路核心位，毗坡子街/海信广场；345间客房+江景；高端商务/休闲客群（均价1200-2000元）。  
- 特色亮点：环球餐饮+湘菜本土化；顶奢硬件（泳池/健身）；地标性江景视野。  
- 市场表现：入住率85%+（OTA评分4.8），差评集中于餐饮排队久、服务响应慢。  
- 优劣势：✅ 区位+品牌溢价❌ 服务精细化不足，亲子设施缺位。
2. 长沙世茂希尔顿（五星）
- 基础概况：岳麓区潇湘北路（距湘江中路2.2km）；标准五星配置；商务客主导（均价1000-1600元）。  
- 市场表现：交通便捷性受诟病（差旅客户抱怨距地铁远）；硬件维护评分下滑（4.6分）。  
- 优劣势：✅ 国际品牌背书❌ 区位边缘化，缺乏记忆点。
3. 长沙岳麓万豪（五星）
- 基础概况：湘江中路近岳麓山；283间客房+湖湘文化设计；均价1100-1800元。  
- 特色亮点：“文化+国际美学”概念；全景落地窗；恒温泳池。  
- 市场短板：文化体验仅限装修（无活动深化）；亲子设施空白（家庭客流失）。  
4. 异国印象酒店（四星）
- 核心问题：距湘江中路3.5km（实际脱离核心区）；主题房型老旧；均价600-900元但性价比争议大（评分4.2）。`,
            '周边景点调研': `橘子洲
1. 景区介绍
橘子洲是湘江中最大的沙洲，全长约5公里，因盛产橘树得名。作为长沙标志性景点，它以毛泽东青年艺术雕塑（高32米）为核心，融合“江天暮雪”古潇湘八景文化园、喷泉广场等景观，是集红色教育、自然风光、休闲活动于一体的城市生态公园。  

2. 景观特色：
- 主要特色内容与服务  
  - 观光小火车环岛游览，串联毛泽东雕塑、问天台、诗词碑林等景点。  
  - 提供骑行、草坪野餐、湘江游船（夜游灯光秀）等特色体验。  
  - 定期举办橘子洲国际音乐节和端午节龙舟赛。  
- 人文文化价值  
  - 毛泽东《沁园春·长沙》“独立寒秋，湘江北去”创作地，承载革命历史记忆。  
  - “朱张渡”古址（朱熹、张栻讲学渡口）位于洲尾，象征湖湘学术交流传统。  
- 地方文化特色与故事性  
  - 再现“江天暮雪”意境：冬季雪景与湘江雾霭交融，曾为古代文人吟咏主题。  
  - 橘文化主题园：展示长沙2000余年柑橘种植史，秋季可参与采摘活动。  
- 特色习俗与演出  
  - 周末烟花表演（节假日）：亚洲最大规模江面音乐烟花秀，杜甫江阁为最佳观景点。  
  - 端午龙舟竞渡：百年传统民俗，洲头水域上演激烈赛事与祭屈仪式。  

---
杜甫江阁
1. 景区介绍
杜甫江阁是为纪念唐代诗人杜甫晚年寓居长沙而建的仿唐楼阁，高18米共四层。位于湘江东岸风光带核心段，与橘子洲毛泽东雕塑隔江相望，登阁可俯瞰“山水洲城”全景，是长沙文化地标之一。  

2. 景观特色：
- 主要特色内容与服务  
  - 阁内设杜甫生平展馆、湘江文化长廊、唐代风格茶室。  
  - 提供汉服租赁服务，游客可着古装拍摄江景大片。  
- 人文文化价值  
  - 杜甫在此创作《江南逢李龟年》等50余首诗作，阁内碑林镌刻其长沙诗篇。  
  - 建筑融合唐代楼阁风格与湖湘建筑元素（如封火山墙演变的重檐）。  
- 地方文化特色与故事性  
  - “夜宿江阁”典故：相传杜甫曾夜宿湘江边木楼，听涛声作诗，现阁内复原此场景。  
  - 与天心阁、岳麓书院构成“长沙文化三角”，共述城市文脉。  
- 特色习俗与演出  
  - 中秋诗会：文人雅集朗诵杜甫诗作，配合古筝与江涛声营造古典意境。  
  - 阁楼灯光秀：夜间动态投影讲述杜甫与长沙的故事。  

---
文津码头（朱张渡）
1. 景区介绍
文津码头原为南宋时期“朱张渡”，朱熹与张栻在此摆渡往来岳麓书院讲学。现改造为文化休闲广场，保留古渡口遗址雕塑群，夜晚化身市民文化舞台，是湘江边最具烟火气的开放式景点。  

2. 景观特色：
- 主要特色内容与服务  
  - “朱张会讲”青铜组雕：生动再现两位理学宗师渡江论道场景。  
  - 亲水平台设老长沙茶摊，提供紫苏姜、薄荷凉茶等传统饮品。  
- 人文文化价值  
  - 湖湘学派发源地标志：见证中国学术史上著名的“朱张会讲”事件。  
  - 渡口石碑刻《朱张渡记》，详述理学传播对湖湘文化的影响。  
- 地方文化特色与故事性  
  - “月亮粑粑”童谣墙：展示长沙方言童谣，讲述老渡口市井生活记忆。  
  - 渔民文化展示：湘江渔歌非遗传承人偶在此演唱《摇橹号子》。  
- 特色习俗与演出  
  - 码头戏曲之夜：每周五晚市民自发组织花鼓戏、皮影戏表演。  
  - 渔火节：冬至日重现古渡渔火点点场景，搭配鱼汤锅民俗宴。  

---
渔人码头
1. 景区介绍
渔人码头是湘江西岸的欧式滨江商业区，由23栋维多利亚风格建筑组成。以“长沙外滩”为定位，汇聚中西餐饮、游艇俱乐部、光影艺术装置，是长沙夜经济名片和年轻时尚聚集地。  

2. 景观特色：
- 主要特色内容与服务  
  - 300米江景灯光长廊：激光水幕与建筑轮廓灯联动，打造赛博朋克夜景。  
  - 游艇夜航服务：可乘仿旧式蒸汽船游览橘子洲至杜甫江阁水域。  
- 人文文化价值  
  - 建筑群原型取自长沙开埠时期西式商行，保留海关钟楼元素。  
  - 码头文化墙展示1904年长沙开埠历史老照片。  
- 地方文化特色与故事性  
  - “小龙虾灯塔”：12米高龙虾造型灯光塔，呼应长沙夜宵文化。  
  - 湘江帆船雕塑群：记录民国时期“船帮”商贸往来故事。  
- 特色习俗与演出  
  - 不夜港派对：周末电子音乐节+霓虹舞狮表演，传统与潮流碰撞。  
  - 江畔老电影：夏夜露天放映《湘江北去》等本土题材影片。  

---
湘江风光带（中路段）
1. 景区介绍
湘江中路风光带全长6公里，东起橘子洲大桥，西至杜甫江阁。以“城市画廊”为理念，布局雕塑公园、滨江步道、荧光跑道、市民艺廊，24小时开放的城市公共艺术空间。  

2. 景观特色：
- 主要特色内容与服务  
  - 智能导览系统：扫码获取雕塑故事、诗词AR动画解说。  
  - 分段主题设计：书法广场（湘籍名家石刻）、星城故事墙（老长沙照片）。  
- 人文文化价值  
  - 屈原、贾谊等湖湘历史人物雕塑群，串联湖湘精神谱系。  
  - “诗路花雨”步道：地面镶嵌历代咏湘江诗词铜牌。  
- 地方文化特色与故事性  
  - “湘江九道湾”水文浮雕：讲述江水改道形成的洲岛传说。  
  - 老码头记忆柱：用锻铜工艺呈现潮宗门、大西门等古渡口故事。  
- 特色习俗与演出  
  - 晨光太极阵：每日清晨百人太极方阵在江雾中演练。  
  - 街头艺术季：每月首个周六举办沙画、瓷乐、火宫殿小吃技艺展演。  

---
潮宗街
1. 景区介绍
潮宗街是长沙仅存的明清麻石街古巷群，因临潮宗门得名。在保留真耶稣教堂、金九活动旧址等文保建筑基础上，植入设计师工作室、古着店、咖啡馆，形成“新旧共生”的文旅样本。  

2. 景观特色：
- 主要特色内容与服务  
  - 麻石路探秘：800米原始麻石路面下藏宋代排水系统展示窗。  
  - “时空胶囊”店铺：老粮行改造的怀旧零食馆可体验手打糍粑。  
- 人文文化价值  
  - 金九避难处：韩国国父金九抗日时期寓所，见证中韩友谊。  
  - 民国公馆群：陈云章公馆等建筑展现中西合璧风格。  
- 地方文化特色与故事性  
  - “潮宗夜话”墙绘：动态光影讲述街巷历史典故。  
  - 米市文化体验：在修复的“和丰粮栈”参与古法碾米。  
- 特色习俗与演出  
  - 夜巷戏曲：真耶稣教堂前坪定期上演湘剧《拜月记》。  
  - 麻石匠人工坊：非遗传承人展示麻石雕刻技艺。  

---
太平老街
1. 景区介绍
太平老街是西汉长沙王城护城河遗址上的千年古街，保留贾谊故居、利生盐号等古迹。现以“老字号+新文创”模式汇聚火宫殿、茶颜悦色等品牌，日均客流超10万人次的美食文化街区。  

2. 景观特色：
- 主要特色内容与服务  
  - 贾谊井遗址：西汉水井可体验竹筒打水，井壁有历代题刻。  
  - 非遗工坊集群：湘绣、菊花石雕、棕编等现场制作体验。  
- 人文文化价值  
  - 贾谊故居：现存最古老文人宅邸，承载“屈贾情怀”精神内核。  
  - 乾益升粮栈：毛泽东早期革命活动旧址，外墙保留弹痕。  
- 地方文化特色与故事性  
  - “臭豆腐诞生记”壁画：用珐琅彩呈现慈禧赐名传说。  
  - 封火墙迷宫：8条支巷暗藏“长沙俚语”灯光谜题。  
- 特色习俗与演出  
  - 老街庙会：春节举行傩面巡游+糖画擂台赛。  
  - 火宫殿戏台：每日15：00上演花鼓戏《刘海砍樵》。  
游览贴士：可乘坐湘江观光巴士（日游线：文津码头→渔人码头；夜游线：杜甫江阁→橘子洲大桥），建议购买"文旅一卡通"享景点联票优惠。美食重点推荐：文津码头紫苏桃子姜、渔人码头秘制虾尾、太平老街伍氏猪脚。`
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

    '长沙': [
        {
            mainTitle: '枫声夜语',
            subTitle: '千载红枫见证的未眠诗行',
            elements: ['爱晚亭红叶', '青年毛泽东读书场景', '革命星火', '当代烟火', '诗会传统'],
            description: '暮色漫过朱柱，枫叶在晚风中絮语百年前的诗会。石阶上残留着《沁园春》的平仄韵脚，每当月光穿透檐角铜铃，便会惊起书页翻动声。江对岸的霓虹倒映在琉璃瓦上，将革命星火与当代烟火织成交响。'
        },
        {
            mainTitle: '青砖呼吸录',
            subTitle: '书院砖石记载的千年问答',
            elements: ['岳麓书院建筑', '朱张会讲', '实事求是', '思想传承', '学术精神'],
            description: '讲堂阶前青苔浸透宋雨，每块砖石都封印着辩难的回声。当学子的脚步惊扰砖缝里沉睡的墨香，木梁便簌簌落下哲学尘埃。月光在"实事求是"碑刻上流转，恍见朱熹的袍角掠过廊柱，在当代学子的平板电脑屏上投下思想剪影。'
        },
        {
            mainTitle: '雾江光书',
            subTitle: '荧光笔尖绘就的刹那史诗',
            elements: ['夜光书法', '湘江水文', '文脉传承', '诗词文化', '刹那艺术'],
            description: '子夜雾霭中，银发老者执荧光笔游走堤岸。笔尖在麻石上流淌《离骚》的橘色光痕，江风裹挟杜甫的诗句掠过现代玻璃幕墙。晨光初现时，未干的"湘"字碎成金粉随波而去，恰似千年文脉在潮汐间往复书写。'
        },
        {
            mainTitle: '舟语茶韵',
            subTitle: '渡轮茶局承载的江湖密语',
            elements: ['湘江轮渡', '茶会习俗', '江湖文化', '水上茶局', '君山银针'],
            description: '青瓷盖碗的脆响穿透柴油机轰鸣，铜壶倾出的君山银针在江涛中舒展。老茶客凭窗辨认往昔码头方位，忽有琵琶声从下层甲板漾开，将货轮汽笛译成《潇湘水云》的变奏。茶汤随船身摇晃，倒映两岸千年楼影。'
        },
        {
            mainTitle: '声墙迷径',
            subTitle: '麻石巷里封存的世纪回响',
            elements: ['麻石巷', '声景博物馆', '历史回音', '市井记忆', '时空交响'],
            description: '耳贴沁凉石墙，旋开黄铜听筒：1927年的米市算盘珠与当代外卖提示音共振，某处陶罐突然溢出橘子洲烟花的闷响。穿堂风掠过时，所有容器共鸣成巨大排箫，将纤夫号子、花鼓戏与婚礼唢呐织成交响诗。'
        },
        {
            mainTitle: '桥洞星野',
            subTitle: '水泥褶皱里的神话再生',
            elements: ['桥洞画廊', '湘江治水传说', '神话再生', '现代寓言', '自然艺术'],
            description: '赭石与江泥在桥墩绘出鲧禹治水的现代寓言。月光为娥皇女英裙裾晕染水纹，汛期洪峰将神话冲刷成抽象派杰作。藻类在虞舜的渔网处自然生长，候鸟衔来新颜料，在混凝土裂痕里播种下个千年的故事开端。'
        },
        {
            mainTitle: '渔火星辞',
            subTitle: '乌篷船上的方言诗典',
            elements: ['捞刀河', '渔火读诗会', '方言诗歌', '水上诗会', '民间文学'],
            description: '墨色江面浮起橙黄渔灯，老妪敲打晾网竹架吟诵："星子落水变银鱼咯"。波纹将俚语译成粼粼密码，年轻渔夫对岸应和，惊起白鹭衔走半句韵脚。诗句裹着樟叶香顺流而下，在滨江步道的咖啡杯沿凝结成露。'
        },
        {
            mainTitle: '碑影沉香',
            subTitle: '蝌蚪文镌刻的治水哲思',
            elements: ['禹王碑', '水文崇拜', '当代灯光秀', '治水智慧', '神秘符号'],
            description: '岳麓山巅的77个神秘符号，在激光映射中跃入江面。水波将上古治水智慧拆解成几何光斑，游船驶过带起涟漪，把"岣嵝碑文"重组为都市节水标语。晨雾升起时，碑影化作77只雨燕，衔着水利工程的蓝图掠过橘子洲头。'
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
    const lines = content.split('\n').filter(line => line.trim());
    let formattedHTML = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 处理标题（以数字开头的行）
        if (/^\d+\./.test(line)) {
            formattedHTML += `<h3 class="subsection-title">${line}</h3>`;
        }
        // 处理列表项（以-或•开头的行）
        else if (/^[-•]/.test(line)) {
            const listItem = line.replace(/^[-•]\s*/, '');
            formattedHTML += `<div class="list-item"><span class="bullet">•</span>${listItem}</div>`;
        }
        // 处理普通段落
        else if (line.length > 0) {
            // 检查是否包含特殊格式（如粗体标记）
            let processedLine = line;
            
            // 处理粗体文本（**text** 或 __text__）
            processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            processedLine = processedLine.replace(/__(.*?)__/g, '<strong>$1</strong>');
            
            // 处理斜体文本（*text* 或 _text_）
            processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
            processedLine = processedLine.replace(/_(.*?)_/g, '<em>$1</em>');
            
            // 处理代码片段（`code`）
            processedLine = processedLine.replace(/`(.*?)`/g, '<code>$1</code>');
            
            formattedHTML += `<p class="paragraph">${processedLine}</p>`;
        }
    }
    
    return formattedHTML;
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
    
    // 生成markdown格式的故事文档内容
    let contentHTML = `
        <div class="markdown-document">
            <div class="markdown-header">
                <h1 class="document-title">${storyDocument.title}</h1>
                <div class="document-summary">
                    <p>${storyDocument.summary}</p>
                </div>
            </div>
            
            <div class="markdown-content">
                <div class="markdown-section">
                    <h2 class="section-title">选定主题</h2>
                    <div class="section-content">
                        <div class="selected-themes-markdown">
                            ${selectedThemes.map((theme, index) => `
                                <div class="selected-theme-markdown">
                                    <h3 class="theme-number-title">${index + 1}. ${theme.mainTitle}</h3>
                                    <p class="theme-subtitle-text"><em>${theme.subTitle}</em></p>
                                    <div class="theme-elements-markdown">
                                        <strong>核心元素：</strong>${theme.elements.join('、')}
                                    </div>
                                    <div class="theme-description-markdown">
                                        <p>${theme.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
    `;
    
    // 为每个设计维度创建markdown格式的内容
    for (const [sectionTitle, sectionContent] of Object.entries(storyDocument.sections)) {
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