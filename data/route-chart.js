/* 路线图：彩色点为产品公开能力证据，灰点为有来源的公共标准与研究。
   generations 映射定义架构层次；现行文档不是首发日期。common 为详情中的开源实现索引。 */
window.PALANTIR_ROUTE_CHART = {
 gotham:{
  title:'任务数据平台技术树（Gotham 公开证据）',
  stages:['需求与概念','项目与能力形成','应用及跨平台集成','现行接口与可见能力'],
  routes:[
   {id:'R1',color:'#2563eb',name:'对象语义与关系',service:'把异构任务数据组织为可追溯的对象与关系。',technology:'RevDB、对象资源、类型映射与关系查询。',nodes:[['G-M01',1,'早期任务背景'],['G-M02',2,'Army CD-2 数据织网'],['G-M04',4,'RevDB 对象语义'],['G-M07',4,'关系资源']]},
   {id:'R2',color:'#7c3aed',name:'多源接入与解析',service:'保留外部来源边界，并将记录解析为可撤销的对象关联。',technology:'联邦来源、对象解析、来源保持。',nodes:[['G-M02',2,'联邦数据需求'],['G-M05',4,'Federated Sources'],['G-M06',4,'可撤销解析']]},
   {id:'R3',color:'#059669',name:'地时态势与研判',service:'联合地图、轨迹、观测和关系资源支持研判。',technology:'Gaia 地图接口、Tracks/Observations、对象关系。',nodes:[['G-M08',4,'Gaia 地图'],['G-M09',4,'轨迹/观测'],['G-M10',4,'情报领域工作流']]},
   {id:'R4',color:'#ea580c',name:'任务流程与领域 SDK',service:'把研判对象接入任务规划与人工决策流程。',technology:'Target Workbench、Mission Planning、Defense OSDK。',nodes:[['G-M11',3,'Target Workbench'],['G-M12',4,'Mission Planning'],['G-M14',4,'Gotham API / OSDK']]},
   {id:'R5',color:'#0891b2',name:'治理、集成与 AI',service:'保持安全标记和平台边界，并引入受约束的 AI 辅助。',technology:'标记传递、Foundry–Gotham 集成、AI-enabled Operations。',nodes:[['G-M03',3,'平台边界披露'],['G-M13',4,'安全标记传递'],['G-M16',4,'Foundry 集成'],['G-M15',4,'AI 辅助方向']]}
  ],
  common:[
   {id:'C-G1',name:'概率记录链接',project:'Splink',route:'R2',target:'G-M06',source:'WEB-SPLINK',code:'splink/comparison_library.py · splink/clustering.py',note:'Fellegi–Sunter 记录链接的公开实现参照；不证明 Gotham 采用。'},
   {id:'C-G2',name:'策略决策引擎',project:'OPA',route:'R5',target:'G-M13',source:'WEB-OPA',code:'rego/ · topdown/ · server/',note:'策略语言与决策执行参照；不等于 Gotham 权限实现。'},
   {id:'C-G3',name:'持久工作流',project:'Temporal',route:'R4',target:'G-M12',source:'WEB-TEMPORAL',code:'service/ · common/ · schema/',note:'持久状态与人工步骤的通用工程参照。'},
   {id:'C-G4',name:'空间数据引擎',project:'PostGIS',route:'R3',target:'G-M08',source:'WEB-POSTGIS',code:'postgis/ · regress/ · doc/',note:'空间索引与查询机制参照；不等于 Gaia 内核。'},
   {id:'C-G5',name:'数据接入编排',project:'Apache NiFi',route:'R2',target:'G-M05',source:'WEB-NIFI',code:'nifi-framework-bundle/ · nifi-extension-bundles/',note:'连接、转换和路由的公开实现参照。'}
  ],
  forks:[{from:'G-M04',to:'G-M06',label:'对象解析'},{from:'G-M07',to:'G-M08',label:'对象到态势'},{from:'G-M10',to:'G-M12',label:'研判到任务'},{from:'G-M13',to:'G-M15',label:'受控 AI'}]
 },
 maven:{
  title:'任务级 AI 与协同技术树（MSS 公开证据）',
  stages:['需求背景','原型与流程验证','军种应用与集成','联盟/生态与运行'],
  routes:[
   {id:'T1',color:'#2563eb',name:'传感器接入与对象化',service:'把异构传感器与任务数据关联到可用数据资源。',technology:'数据融合、数据资源/管道、时空对象化。',nodes:[['M01',1,'视觉分析需求'],['M06',2,'许可与数据基础'],['M17',3,'ISA/TACDS 接入'],['M20',4,'V Corps 数据资源']]},
   {id:'T2',color:'#7c3aed',name:'视觉检测到人工确认',service:'把检测结果送入图层、人工核验与任务流程。',technology:'BAS-T、实时图层、人员复核。',nodes:[['M01',1,'Project Maven 背景'],['M04',2,'视觉—审批演训'],['M11',3,'军种应用清单'],['M14',4,'ODIN 报告']]},
   {id:'T3',color:'#059669',name:'共同态势与应用协同',service:'通过地图、目标工作台和报告应用组织共同态势。',technology:'Gaia、Target Workbench、ODIN。',nodes:[['M05',2,'MSS 原型合同'],['M07',3,'跨军种扩展'],['M11',3,'Gaia / TWB 清单'],['M14',4,'ODIN 报告']]},
   {id:'T4',color:'#ea580c',name:'接口、跨域与第三方',service:'通过桥接、现场适配和开放采购路径接入异构系统。',technology:'Open DAGIR、AMPS 桥接、ISA/TACDS。',nodes:[['M15',3,'Open DAGIR 路径'],['M16',3,'AMPS 桥接'],['M17',3,'ISA/TACDS 接入'],['M19',4,'Dynamis 协同']]},
   {id:'T5',color:'#0891b2',name:'模型、联盟与治理',service:'让模型能力、联盟实例和受限环境流程纳入治理。',technology:'模型嵌入方向、MSS NATO、人员监督。',nodes:[['M08',3,'NATO 采购'],['M10',3,'模型嵌入方向'],['M13',4,'NATO FTOC'],['M21',4,'联盟演习应用']]}
  ],
  common:[
   {id:'C-M1',name:'数据流编排',project:'Apache NiFi',route:'T1',target:'M17',source:'WEB-NIFI',code:'nifi-framework-bundle/ · nifi-extension-bundles/',note:'通用接入与转换技术参照，不证明 MSS 采用。'},
   {id:'C-M2',name:'持久人工流程',project:'Temporal',route:'T2',target:'M04',source:'WEB-TEMPORAL',code:'service/ · common/ · schema/',note:'流程历史和人工步骤的通用实现参照。'},
   {id:'C-M3',name:'策略约束',project:'OPA',route:'T5',target:'M13',source:'WEB-OPA',code:'rego/ · topdown/ · server/',note:'跨域决策策略的工程参照，非 NATO 配置。'},
   {id:'C-M4',name:'模型注册与评测',project:'MLflow',route:'T5',target:'M10',source:'WEB-MLFLOW',code:'mlflow/ · tests/ · examples/',note:'模型版本和评测工作流参照。'},
   {id:'C-M5',name:'空间对象与查询',project:'PostGIS',route:'T3',target:'M11',source:'WEB-POSTGIS',code:'postgis/ · regress/ · doc/',note:'地理能力通用参照，不等于 Gaia。'}
  ],
  forks:[{from:'M17',to:'M11',label:'数据进入态势'},{from:'M04',to:'M11',label:'审核进入应用'},{from:'M15',to:'M13',label:'生态与联盟'},{from:'M10',to:'M19',label:'模型与受限环境'}]
 }
};

/* Public technical milestones checked against primary pages on 2026-09-30.
   Architectural levels are analytical categories, never product release claims. */
Object.assign(window.PALANTIR_LINEAGE.extraSources, {
 'TECH-PROV':{title:'W3C PROV-O Recommendation · 2013-04-30',type:'开放标准',url:'https://www.w3.org/TR/2013/REC-prov-o-20130430/'},
 'TECH-RDF':{title:'W3C RDF 1.1 Concepts · 2014-02-25',type:'开放标准',url:'https://www.w3.org/TR/2014/REC-rdf11-concepts-20140225/'},
 'TECH-SPARQL':{title:'W3C SPARQL 1.1 Query · 2013-03-21',type:'开放标准',url:'https://www.w3.org/TR/2013/REC-sparql11-query-20130321/'},
 'TECH-RESNET':{title:'Deep Residual Learning for Image Recognition · 2015-12-10',type:'公开论文',url:'https://arxiv.org/abs/1512.03385'},
 'TECH-TRANSFORMER':{title:'Attention Is All You Need · 2017-06-12',type:'公开论文',url:'https://arxiv.org/abs/1706.03762'}
});
const publicMilestones = {
 rdf:{id:'PUBLIC-RDF',date:'2014-02',year:2014.15,stage:1,name:'RDF 1.1 对象关系模型',type:'开放标准',note:'以资源、属性和三元组表达关系；作为对象语义的公共技术参照。',sources:['TECH-RDF']},
 sparql:{id:'PUBLIC-SPARQL',date:'2013-03',year:2013.22,stage:2,name:'SPARQL 1.1 图查询',type:'开放标准',note:'公共图查询语言及查询机制，作为多源关系查询的原理参照。',sources:['TECH-SPARQL']},
 prov:{id:'PUBLIC-PROV',date:'2013-04',year:2013.33,stage:2,name:'PROV-O 来源追溯',type:'开放标准',note:'表达实体、活动与主体之间的来源关系；不等同于访问控制实现。',sources:['TECH-PROV']},
 resnet:{id:'PUBLIC-RESNET',date:'2015-12',year:2015.94,stage:1,name:'深度残差视觉表征',type:'公开论文',note:'残差学习支持深层视觉表征，为视觉分析路线提供公共研究背景；不证明 MSS 采用 ResNet。',sources:['TECH-RESNET']},
 transformer:{id:'PUBLIC-TRANSFORMER',date:'2017-06',year:2017.45,stage:2,name:'Transformer 注意力架构',type:'公开论文',note:'公开的注意力模型架构，为后续模型协同方向提供研究背景；不证明具体生产模型。',sources:['TECH-TRANSFORMER']}
};
window.PALANTIR_ROUTE_CHART.gotham.milestones=[
 {...publicMilestones.rdf,routes:['R1'],targets:['R1:G-M04']},
 {...publicMilestones.sparql,routes:['R2','R3'],targets:['R2:G-M05']},
 {...publicMilestones.prov,routes:['R5'],targets:['R5:G-M13']},
 {...publicMilestones.transformer,routes:['R5'],targets:['R5:G-M15']}
];
window.PALANTIR_ROUTE_CHART.maven.milestones=[
 {...publicMilestones.rdf,routes:['T1','T3'],targets:['T1:M17']},
 {...publicMilestones.resnet,routes:['T2'],targets:['T2:M01']},
 {...publicMilestones.prov,routes:['T5'],targets:['T5:M13']},
 {...publicMilestones.transformer,routes:['T5'],targets:['T5:M10']}
];
window.PALANTIR_ROUTE_CHART.gotham.generations={'G-M02':3,'G-M03':4,'G-M04':1,'G-M05':2,'G-M06':2,'G-M07':2,'G-M08':3,'G-M09':2,'G-M10':3,'G-M11':3,'G-M12':3,'G-M13':3,'G-M14':4,'G-M15':4,'G-M16':4};
window.PALANTIR_ROUTE_CHART.maven.generations={M01:1,M04:2,M05:2,M06:2,M07:3,M08:4,M10:4,M11:3,M13:4,M14:3,M15:4,M16:3,M17:3,M19:4,M20:3,M21:4};

/* Per-route chronological milestones. Levels indicate the observed expansion
   of each route; no historical implementation or release is inferred. */
(()=>{
 const g=window.PALANTIR_ROUTE_CHART.gotham;g.generations={};
 const nodes=[
 [['G-H08',1,'Gotham 平台发布'],['G-H20G',2,'Graph 对象与网络'],['G-H20R',2,'重复对象解析'],['G-M02',3,'CD-2 数据织网'],['G-M04',3,'RevDB 接口截面'],['G-M07',3,'关系资源接口']],
 [['G-H20T',1,'Table 数据检索'],['G-H20F',2,'联邦数据流披露'],['G-M02',3,'跨源融合需求'],['G-M05',3,'外部源接口'],['G-M06',3,'可撤销解析接口']],
 [['G-H20V',1,'视频与地理叠加'],['G-H20TR',2,'移动位置跟踪'],['G-H20A',3,'Gaia 共享地图'],['G-M09',3,'轨迹与观测接口'],['G-M08',3,'地图接口截面'],['G-M10',4,'领域工作流协同']],
 [['G-H20D',1,'Dossier 协同研判'],['G-H20S',2,'表单与复核审批'],['G-H20MP',3,'Gaia 任务规划'],['G-M11',3,'目标工作台截面'],['G-M12',3,'规划领域接口'],['G-M14',4,'Defense OSDK']],
 [['G-H20AI',1,'Ava 主动辅助分析'],['G-H20FW',2,'Forward 断连配置'],['G-H20M',3,'Mobile / Gaia 协作'],['G-M03',3,'平台矩阵披露'],['G-M13',3,'安全标记传递'],['G-M16',4,'Foundry 集成'],['G-M15',4,'AI 协同方向']]
 ];g.routes.forEach((r,i)=>r.nodes=nodes[i]);
 const m=window.PALANTIR_ROUTE_CHART.maven;m.generations={};
 m.routes[0].nodes=[['M01',1,'视觉数据需求'],['M06',2,'许可与数据基础'],['M17',3,'ISA/TACDS 接入'],['M20',4,'军团数据资源']];
 m.routes[1].nodes=[['M01',1,'Project Maven 背景'],['M04',2,'视觉—人员核验'],['M11',3,'军种应用清单'],['M14',4,'ODIN 报告流程']];
 m.routes[2].nodes=[['M02',1,'MSS 形成叙述'],['M03',1,'政府材料提及'],['M05',2,'MSS 原型合同'],['M07',3,'跨军种扩展'],['M11',3,'Gaia / TWB 清单'],['M12',4,'军种使用披露'],['M14',4,'ODIN 报告']];
 m.routes[3].nodes=[['M15',1,'开放接入路径'],['M16',2,'AMPS 桥接'],['M17',3,'ISA/TACDS 接入'],['M22',3,'人工转录限制'],['M19',4,'Dynamis 协同试验']];
 m.routes[4].nodes=[['M08',2,'NATO 采购'],['M10',3,'模型嵌入方向'],['M18',3,'联盟演习整合'],['M21',4,'联盟演习应用'],['M13',4,'NATO FTOC']];
})();
