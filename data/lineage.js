/* 专题图形数据：事件日期是公开资料中的事件或资料截面，不代表内部首发。 */
window.PALANTIR_LINEAGE = {
  extraSources: {
    M1:{title:"DoD Project Maven 起点",type:"政府一手材料",url:"https://www.defense.gov/News/News-Stories/Article/Article/1254719/project-maven-to-deploy-computer-algorithms-to-war-zone-by-years-end/"},
    M4:{title:"DoD MSS 原型合同",type:"政府一手材料",url:"https://www.defense.gov/News/Contracts/Contract/Article/3790490/"},
    M5:{title:"DoD MSS 用户许可和支持合同",type:"政府一手材料",url:"https://www.defense.gov/News/Contracts/Contract/Article/3910169/"},
    M6:{title:"Palantir MSS 军种扩展公告",type:"厂商资料",url:"https://palantir2020ipo.q4web.com/news-details/2024/Palantir-Expands-Maven-Smart-System-AIML-Capabilities-to-Military-Services/default.aspx"},
    M20:{title:"DoD MSS 软件许可合同修改",type:"政府一手材料",url:"https://www.defense.gov/News/Contracts/Contract/Article/4194643/"},
    M25:{title:"参议院军事委员会 Hansell 书面问答",type:"政府一手材料",url:"https://www.armed-services.senate.gov/imo/media/doc/Hansell_APQs_08-06-20.pdf"},
    M26:{title:"美国陆军数据素养指南",type:"军方一手材料",url:"https://api.army.mil/e2/c/downloads/2025/04/18/6ff620cd/25-10-944-cdr-and-staff-guide-to-data-literacy-apr-25-public.pdf"},
    M29:{title:"美国海军陆战队 FY27 姿态说明",type:"军方一手材料",url:"https://www.armed-services.senate.gov/imo/media/doc/smith_testimony8.pdf"},
    M48:{title:"NATO Steadfast Duel 25",type:"NATO 一手材料",url:"https://www.ncia.nato.int/newsroom/news/ncia-enables-steadfast-duel-25-natos-largest-computerassisted-command-post-exercise"},
    M49:{title:"NATO Steadfast Deterrence 2026",type:"NATO 一手材料",url:"https://www.jwc.nato.int/article/exercise-steadfast-deterrence-2026-concludes/"},
    "WEB-SPLINK":{title:"Splink 开源仓库与核心代码目录（2026-09-30 核查）",type:"开源仓库",url:"https://github.com/moj-analytical-services/splink/tree/master/splink"},
    "WEB-OPA":{title:"OPA 开源仓库与策略引擎代码目录（2026-09-30 核查）",type:"开源仓库",url:"https://github.com/open-policy-agent/opa"},
    "WEB-TEMPORAL":{title:"Temporal 开源服务仓库（2026-09-30 核查）",type:"开源仓库",url:"https://github.com/temporalio/temporal"},
    "WEB-NIFI":{title:"Apache NiFi 开源仓库（2026-09-30 核查）",type:"开源仓库",url:"https://github.com/apache/nifi"},
    "WEB-MLFLOW":{title:"MLflow 开源仓库（2026-09-30 核查）",type:"开源仓库",url:"https://github.com/mlflow/mlflow"},
    "WEB-POSTGIS":{title:"PostGIS 空间数据库扩展仓库（2026-09-30 核查）",type:"开源仓库",url:"https://github.com/postgis/postgis"},
    G9:{title:"Army CD-2 数据织网公告",type:"官方项目资料",url:"https://investors.palantir.com/news-details/2021/Army-Selects-Palantir-for-Intelligence-Data-Fabric-and-Analytics-Solution"}
  },
  gotham: {
    stages:[{label:"2003—2020 任务需求与平台形成",start:2003,end:2021},{label:"2021—2024 联邦数据与领域应用",start:2021,end:2025},{label:"2025—2026 公开接口与 AI 方向",start:2025,end:2027}],
    layers:[
      {id:"platform",label:"核心平台与任务交互",en:"Core Platform",objects:["gotham"]},
      {id:"data",label:"对象语义与数据接入",en:"Semantic Data",objects:["revdb","federated","resolution"]},
      {id:"situational",label:"关系、地理与时间态势",en:"Graph & Geotime",objects:["graph","gaia","tracks"]},
      {id:"workflow",label:"研判与领域工作流",en:"Mission Workflow",objects:["intelligence","target-workbench","mission"]},
      {id:"governance",label:"治理、接口与 AI 协同",en:"Governance & API",objects:["provenance","api","aip"]},
      {id:"external",label:"平台协同与部署场景",en:"Ecosystem",objects:["foundry","apollo"]}
    ],
    objects:[
      {id:"gotham",name:"Gotham",layer:"platform"},{id:"revdb",name:"RevDB",layer:"data"},{id:"federated",name:"Federated Sources",layer:"data"},{id:"resolution",name:"Object Resolution",layer:"data"},
      {id:"graph",name:"Graph",layer:"situational"},{id:"gaia",name:"Gaia Maps",layer:"situational"},{id:"tracks",name:"Tracks / Observations",layer:"situational"},
      {id:"intelligence",name:"Intelligence",layer:"workflow"},{id:"target-workbench",name:"Target Workbench",layer:"workflow"},{id:"mission",name:"Mission Planning",layer:"workflow"},
      {id:"provenance",name:"权限 / 来源",layer:"governance"},{id:"api",name:"Gotham API / OSDK",layer:"governance"},{id:"aip",name:"AI 协同",layer:"governance"},
      {id:"foundry",name:"Foundry（相邻平台）",layer:"external"},{id:"apollo",name:"Apollo（相邻平台）",layer:"external"}
    ],
    events:[
      {id:"G-M01",date:"2003",year:2003,object:"gotham",kind:"公司历史背景",title:"Palantir 创立及早期情报任务背景",note:"公司历史与 Gotham 早期问题背景；不是当前产品功能发布日。",sources:["G1"]},
      {id:"G-M02",date:"2021",year:2021,object:"gotham",kind:"政府项目",title:"Army CD-2 联邦情报数据织网",note:"支持多源、跨安全级别数据融合的项目需求；不等于 Gotham 内部模块清单。",sources:["G9"]},
      {id:"G-M03",date:"2025 财年报告",year:2026.0,object:"gotham",kind:"公司披露",title:"Gotham 与 Foundry、Apollo、AIP 并列披露",note:"确认平台级产品边界；不将另外三平台的能力全部归入 Gotham。",sources:["G1"]},
      {id:"G-M04",date:"现行文档",year:2026.75,object:"revdb",kind:"公开接口截面",title:"RevDB / 动态对象语义可见",note:"是截至调研日的接口证据，不能当成首次发布时间。",sources:["G2"]},
      {id:"G-M05",date:"现行文档",year:2026.75,object:"federated",kind:"公开接口截面",title:"Federated Sources 外部源访问",note:"文档确认外部对象边界，具体缓存和连接器未知。",sources:["G4"]},
      {id:"G-M06",date:"现行文档",year:2026.75,object:"resolution",kind:"公开接口截面",title:"Object Resolution 可撤销解析",note:"文档支持保留历史和取消解析；算法未知。",sources:["G3"]},
      {id:"G-M07",date:"现行文档",year:2026.75,object:"graph",kind:"公开接口截面",title:"对象与关系资源",note:"确认关系查询方向，不证明内部图引擎。",sources:["G2"]},
      {id:"G-M08",date:"现行文档",year:2026.75,object:"gaia",kind:"公开接口截面",title:"Gaia 地图与图层接口",note:"不推断客户底图、配置或实时性能。",sources:["G5"]},
      {id:"G-M09",date:"现行文档",year:2026.75,object:"tracks",kind:"公开接口截面",title:"Tracks / Observations 资源",note:"仅确认资源类型，不推断传感器格式或吞吐。",sources:["G2"]},
      {id:"G-M10",date:"现行文档",year:2026.75,object:"intelligence",kind:"公开领域截面",title:"情报领域工作流",note:"领域接口可见，客户流程因部署而异。",sources:["G2","G6"]},
      {id:"G-M11",date:"现行文档",year:2026.75,object:"target-workbench",kind:"厂商产品截面",title:"Target Workbench 生命周期描述",note:"厂商产品资料，效果未独立核验。",sources:["G16"]},
      {id:"G-M12",date:"现行文档",year:2026.75,object:"mission",kind:"公开领域截面",title:"Mission Planning / Defense OSDK",note:"有领域接口，不代表所有 Gotham 客户启用。",sources:["G6"]},
      {id:"G-M13",date:"现行文档",year:2026.75,object:"provenance",kind:"集成资料截面",title:"类型映射与安全标记传递",note:"集成文档支持标记传递，部署级规则未知。",sources:["G7"]},
      {id:"G-M14",date:"现行文档",year:2026.75,object:"api",kind:"公开接口截面",title:"Gotham API 与 Defense OSDK",note:"确认开发者接口方向，版本和覆盖度需按接口核验。",sources:["G2","G6"]},
      {id:"G-M15",date:"公开白皮书",year:2026.75,object:"aip",kind:"厂商方向",title:"AI-enabled Operations 共同态势与规划",note:"厂商主张的方向，非独立性能测评。",sources:["G8"]},
      {id:"G-M16",date:"现行文档",year:2026.75,object:"foundry",kind:"相邻平台截面",title:"Foundry–Gotham 集成",note:"是协同关系，不代表 Foundry 为 Gotham 子产品。",sources:["G7"]},
      {id:"G-M17",date:"2025 财年报告",year:2026.0,object:"apollo",kind:"相邻平台披露",title:"Apollo 与 Gotham 同属 Palantir 平台矩阵",note:"Apollo 是独立平台，实际 Gotham 部署拓扑未公开。",sources:["G1"]}
    ],
    relations:[
      {from:"gotham",to:"revdb",type:"solid",label:"对象能力归属"},{from:"gotham",to:"gaia",type:"solid",label:"公开地图接口"},{from:"gotham",to:"api",type:"solid",label:"公开开发接口"},
      {from:"revdb",to:"resolution",type:"dash",label:"对象解析协同"},{from:"federated",to:"revdb",type:"dash",label:"外部对象呈现"},{from:"gaia",to:"tracks",type:"dash",label:"时空分析协同"},
      {from:"api",to:"mission",type:"dash",label:"领域接口"},{from:"api",to:"target-workbench",type:"dash",label:"目标资源"},{from:"foundry",to:"gotham",type:"dash",label:"平台集成"},{from:"aip",to:"gotham",type:"dash",label:"AI 协同方向"}
    ]
  },
  maven: {
    stages:[{label:"2017—2020 需求背景与 MSS 出现",start:2017,end:2021},{label:"2021—2024 视觉流程与采购",start:2021,end:2025},{label:"2025—2026 军种、生态与联盟扩展",start:2025,end:2027}],
    layers:[
      {id:"core",label:"核心平台与任务交互",en:"Core Platform",objects:["mss-core"]},
      {id:"data",label:"数据融合与资源管道",en:"Data Foundation",objects:["mss-data-fusion","data-resources-pipelines"]},
      {id:"vision",label:"视觉检测与人工流程",en:"Vision & Human Review",objects:["vision-tasking","human-target-workflow"]},
      {id:"apps",label:"地图、目标与报告应用",en:"Mission Applications",objects:["gaia","target-workbench","odin"]},
      {id:"integration",label:"接口、生态与模型",en:"Integration & AI",objects:["interface-cross-domain","third-party-onboarding","model-ai-workflow"]},
      {id:"governance",label:"部署、安全与联盟治理",en:"Deployment & Governance",objects:["deployment-security-governance"]}
    ],
    objects:[
      {id:"mss-core",name:"MSS 核心平台",layer:"core"},{id:"mss-data-fusion",name:"数据融合",layer:"data"},{id:"data-resources-pipelines",name:"数据资源 / 管道",layer:"data"},
      {id:"vision-tasking",name:"视觉任务化",layer:"vision"},{id:"human-target-workflow",name:"人员审核流程",layer:"vision"},
      {id:"gaia",name:"Gaia",layer:"apps"},{id:"target-workbench",name:"Target Workbench",layer:"apps"},{id:"odin",name:"ODIN",layer:"apps"},
      {id:"interface-cross-domain",name:"接口 / 跨域适配",layer:"integration"},{id:"third-party-onboarding",name:"Open DAGIR 接入",layer:"integration"},{id:"model-ai-workflow",name:"模型 / AI 工作流",layer:"integration"},
      {id:"deployment-security-governance",name:"部署 / 安全治理",layer:"governance"}
    ],
    events:[
      {id:"M01",date:"2017-04",year:2017.25,object:"vision-tasking",kind:"需求背景",title:"Project Maven 视觉分析需求",note:"政府项目背景，不是 MSS 发布或版本。",sources:["M1"]},
      {id:"M02",date:"2018（厂商说法）",year:2018,object:"mss-core",kind:"产品形成叙述",title:"厂商称 2018 年开发 MSS",note:"不等于正式首发或全面部署日期。",sources:["M24"]},
      {id:"M03",date:"2020-08",year:2020.6,object:"mss-core",kind:"政府公开提及",title:"参议院材料出现 MSS 名称",note:"早期政府提及，非正式产品首发。",sources:["M25"]},
      {id:"M04",date:"2023-06",year:2023.5,object:"human-target-workflow",kind:"演训案例",title:"Scarlet Dragon 视觉—审批流程",note:"支持该案例的人员审核链，不是通用效果指标。",sources:["M26"]},
      {id:"M05",date:"2024-05",year:2024.42,object:"mss-core",kind:"原型合同",title:"DoD 授予 MSS 原型合同",note:"证明采购和原型交付阶段，不证明全部功能验收。",sources:["M4"]},
      {id:"M06",date:"2024-09",year:2024.72,object:"mss-data-fusion",kind:"许可与支持",title:"MSS 用户许可、支持和硬件合同",note:"金额不等于用户或性能。",sources:["M5"]},
      {id:"M07",date:"2024-09",year:2024.75,object:"mss-core",kind:"厂商扩展披露",title:"MSS 扩展至多个军种",note:"厂商方向，具体军种启用需逐项核验。",sources:["M6"]},
      {id:"M08",date:"2025-03",year:2025.24,object:"deployment-security-governance",kind:"联盟采购",title:"NCIA 采购 MSS NATO",note:"只证明 NATO 实例。",sources:["M12"]},
      {id:"M09",date:"2025-05",year:2025.38,object:"mss-core",kind:"许可扩展",title:"DoD 软件许可合同修改",note:"许可规模不能推断技术性能。",sources:["M20"]},
      {id:"M10",date:"2025-07",year:2025.54,object:"model-ai-workflow",kind:"模型接入方向",title:"CDAO 称前沿模型可嵌入 MSS",note:"不证明特定模型或 Agent 已在生产运行。",sources:["M19"]},
      {id:"M11",date:"2025-08",year:2025.65,object:"gaia",kind:"军种许可",title:"海军陆战队许可与组件清单",note:"列出 Foundry、Gaia、TWB 等；仅该军种范围。",sources:["M27"]},
      {id:"M12",date:"2026-05",year:2026.38,object:"mss-core",kind:"局部使用规模",title:"海军陆战队报告 4,900 余人使用",note:"局部使用规模，不是 DoD 总用户或日活。",sources:["M29"]},
      {id:"M13",date:"2026-06",year:2026.48,object:"deployment-security-governance",kind:"联盟运行节点",title:"MSS NATO 达到 FTOC",note:"NATO 实例状态，不代表美军版。",sources:["M47"]},
      {id:"M14",date:"2026-07",year:2026.52,object:"odin",kind:"具名应用",title:"ODIN 成为海军陆战队报告工具",note:"限该军种报告应用。",sources:["M33"]},
      {id:"M15",date:"2025-01",year:2025.03,object:"third-party-onboarding",kind:"生态接入",title:"Open DAGIR 建立接入路径",note:"不披露 MSS 核心 API 或数据权利。",sources:["M55"]},
      {id:"M16",date:"2025-06",year:2025.45,object:"interface-cross-domain",kind:"互操作补强",title:"AMPS 经 TAIS/ACO 桥接",note:"特定场景的工作性桥接。",sources:["M44"]},
      {id:"M17",date:"2025-07",year:2025.55,object:"mss-data-fusion",kind:"跨域接入",title:"ISA/TACDS 数据写入 MSS",note:"单次成功案例，不代表通用 SLA。",sources:["M43"]},
      {id:"M18",date:"2025-10",year:2025.8,object:"deployment-security-governance",kind:"联盟演习",title:"Steadfast Duel 25 整合平台",note:"演习总人数不能当作 MSS 用户数。",sources:["M48"]},
      {id:"M19",date:"2026-03",year:2026.22,object:"interface-cross-domain",kind:"受限通信试验",title:"Dynamis 跨域跨网协同",note:"证明场景与人员监督，不公开断连指标。",sources:["M66"]},
      {id:"M20",date:"2026-04",year:2026.25,object:"data-resources-pipelines",kind:"军团使用",title:"V Corps 公开数据资源组件",note:"名称级组件证据，代码和结构未知。",sources:["M37"]},
      {id:"M21",date:"2026-05",year:2026.36,object:"deployment-security-governance",kind:"联盟演习规模",title:"JWC 约 550 人使用 MSS NATO",note:"特定演习使用规模，不等于日活。",sources:["M49"]},
      {id:"M22",date:"2025-10",year:2025.79,object:"interface-cross-domain",kind:"人工转录缺口",title:"EWPMT—Maven 人工转录",note:"特定单位限制，不代表全局接口缺失。",sources:["M77"]}
    ],
    relations:[
      {from:"mss-core",to:"mss-data-fusion",type:"solid",label:"能力归属"},{from:"mss-core",to:"gaia",type:"dash",label:"协同应用"},{from:"mss-core",to:"target-workbench",type:"dash",label:"协同应用"},
      {from:"vision-tasking",to:"mss-data-fusion",type:"dash",label:"结果接入"},{from:"vision-tasking",to:"human-target-workflow",type:"dash",label:"人员审核"},{from:"target-workbench",to:"human-target-workflow",type:"dash",label:"任务协同"},
      {from:"model-ai-workflow",to:"mss-core",type:"dash",label:"模型嵌入方向"},{from:"odin",to:"mss-core",type:"dash",label:"报告应用"},{from:"data-resources-pipelines",to:"mss-data-fusion",type:"dash",label:"数据处理支撑"},
      {from:"interface-cross-domain",to:"mss-data-fusion",type:"dash",label:"跨域接入"},{from:"interface-cross-domain",to:"mss-core",type:"dash",label:"桥接"},{from:"third-party-onboarding",to:"mss-core",type:"dash",label:"第三方接入"},
      {from:"third-party-onboarding",to:"data-resources-pipelines",type:"dash",label:"数据环境"},{from:"deployment-security-governance",to:"mss-core",type:"dash",label:"运行约束"},{from:"mss-core",to:"human-target-workflow",type:"dash",label:"人工监督"}
    ]
  }
};

/* SEC primary-source supplement, checked 2026-09-30. 2020 entries are
   disclosure dates, not component release dates. S-1 pp. 119, 133–140. */
window.PALANTIR_LINEAGE.extraSources['G-SEC-S1']={title:'Palantir S-1 · 2020-08-25 · Gotham 产品说明 pp.133–140',type:'SEC 上市申报',url:'https://www.sec.gov/Archives/edgar/data/1321655/000119312520230013/d904406ds1.htm'};
(()=>{
 const g=window.PALANTIR_LINEAGE.gotham;
 const objects=[['dossier','Dossier','workflow'],['stencil','Stencil','workflow'],['video','Video','situational'],['table','Table','data'],['ava','Ava','governance'],['forward','Forward','external'],['mobile','Mobile','external']];
 objects.forEach(([id,name,layer])=>{g.objects.push({id,name,layer});g.layers.find(l=>l.id===layer).objects.push(id)});
 g.events.push({id:'G-H08',date:'2008',year:2008,object:'gotham',kind:'产品发布回溯',title:'Gotham 首个平台发布',note:'2020 年 S-1 明确回溯称 2008 年发布 Gotham，面向情报领域客户；具体月份未披露。',sources:['G-SEC-S1']});
 const rows=[
 ['G-H20G','graph','Graph 对象与网络分析','白板式实体关系探索；支持属性编辑、时间分析与网络分析插件。'],
 ['G-H20R','resolution','Graph 重复对象解析','Graph 描述允许解析重复对象；不据此推断现行 Object Resolution 的后端算法。'],
 ['G-H20A','gaia','Gaia 共享实时地图','共享地图支持规划、执行与报告，可从其他 Gotham 应用拖入对象。'],
 ['G-H20D','dossier','Dossier 协同研判文档','实时协同文档保留分析与上下文，支持跨团队情报成果。'],
 ['G-H20S','stencil','Stencil 结构化表单与审批','结构化录入、多用户协作以及可定制复核与审批流程。'],
 ['G-H20V','video','Video 流式与历史视频','支持不同格式视频，并叠加地理信息及其他来源数据。'],
 ['G-H20T','table','Table 交互式大规模检索','支持低信噪比、事件型数据的筛选与可视化；规模为厂商披露，非独立测评。'],
 ['G-H20AI','ava','Ava 主动辅助调查','AI 系统分析内部及联邦数据流，向分析人员提示潜在关联。'],
 ['G-H20F','federated','Ava 联邦数据流分析披露','Ava 描述明确包含 federated data streams；不等同于当前 Federated Sources API 的首发。'],
 ['G-H20FW','forward','Forward 弱网与断连配置','Gotham 的专门配置支持断连分析及后续同步；实际性能未公开。'],
 ['G-H20M','mobile','Mobile 移动协作','移动设备提交报告、图片与视频，查询数据并与 Forward、Gaia 协作。'],
 ['G-H20TR','tracks','Mobile 位置跟踪披露','披露队友位置跟踪能力；不证明现行 Tracks / Observations API 当时已发布。'],
 ['G-H20I','intelligence','分析向任务执行交接','Gotham 平台说明包含分析人员与行动人员的工作交接。'],
 ['G-H20MP','mission','Gaia 规划、执行与报告','任务规划能力在 Gaia 产品说明中已披露；不等同于现行 Mission Planning API 首发。']
 ];
 rows.forEach(([id,object,title,note])=>g.events.push({id,object,title,date:'2020-08',year:2020.65,kind:'上市材料能力披露',note:note+' 2020-08 为材料披露时间，不是该组件首发时间。',sources:['G-SEC-S1']}));
})();
