/* 四层原理网图、开源参照与隔离验证字段；均非闭源产品内部架构。 */
window.PALANTIR_DECONSTRUCTION = {
  gotham:{
    nodes:[
      ["P01","统一对象化任务数据",0,"公开能力归纳",["G2"]],["P02","证据与治理闭环",0,"公开能力归纳",["G7"]],
      ["P03","Schema 驱动互操作",1,"工程候选",["G2"]],["P04","可撤销对象解析",1,"公开机制",["G3"]],["P05","联邦查询与缓存",1,"部分公开",["G4"]],
      ["P06","图 / 全文 / 空间 / 时间检索",1,"工程候选",["G2","G5"]],["P07","任务状态机与人工审批",1,"工程候选",["G6","G16"]],["P08","权限 / 标记 / 审计",1,"部分公开",["G7"]],
      ["P09","Entity Resolution 服务",2,"工程候选",["G3"]],["P10","Ontology / Schema Registry",2,"工程候选",["G2"]],
      ["P11","Geospatial / Track 服务",2,"工程候选",["G5"]],["P12","Workflow / Action 服务",2,"工程候选",["G6"]],
      ["P13","连接器 / 索引 / 策略引擎",3,"开源验证单元",["G4","G7"]],["P14","日志 / 评估 / 数据版本",3,"开源验证单元",["G8"]]
    ],
    edges:[
      {from:"P01",to:["P03","P04","P05","P06"],type:"candidate"},{from:"P02",to:["P07","P08"],type:"candidate"},
      {from:"P03",to:["P10"],type:"candidate"},{from:"P04",to:["P09"],type:"observed"},{from:"P05",to:["P13"],type:"candidate"},
      {from:"P06",to:["P11","P13"],type:"candidate"},{from:"P07",to:["P12"],type:"candidate"},{from:"P08",to:["P13","P14"],type:"candidate"},
      {from:"P09",to:["P14"],type:"candidate"},{from:"P10",to:["P13"],type:"candidate"},{from:"P11",to:["P13"],type:"candidate"},{from:"P12",to:["P14"],type:"candidate"}
    ],
    projects:[
      {id:"OS-G01",name:"JanusGraph",category:"图数据与关系",language:"Java",license:"Apache-2.0",node:"P06",url:"https://github.com/JanusGraph/janusgraph",files:"janusgraph-core/ · janusgraph-server/ · janusgraph-test/",flow:"对象/边 → 图索引 → 遍历查询",limits:"不提供领域本体、权限与任务 UI。"},
      {id:"OS-G02",name:"Apache TinkerPop",category:"图数据与关系",language:"Java",license:"Apache-2.0",node:"P06",url:"https://tinkerpop.apache.org/",files:"gremlin-core/ · gremlin-server/ · docs/",flow:"图对象 → Gremlin 遍历 → 结果",limits:"不等于 Gotham 图实现。"},
      {id:"OS-G03",name:"OpenSearch",category:"检索",language:"Java",license:"Apache-2.0",node:"P06",url:"https://github.com/opensearch-project/OpenSearch",files:"server/ · plugins/ · modules/",flow:"文档/对象 → 索引 → 混合查询",limits:"缺对象解析与来源治理。"},
      {id:"OS-G04",name:"Splink",category:"实体解析",language:"Python",license:"MIT",node:"P04",url:"https://github.com/moj-analytical-services/splink",files:"splink/ · tests/ · pyproject.toml",flow:"候选记录 → 匹配概率 → 人工审核",limits:"撤销和业务状态需自建。"},
      {id:"OS-G05",name:"PostGIS",category:"地时态势",language:"C / SQL",license:"GPL-2.0",node:"P11",url:"https://github.com/postgis/postgis",files:"postgis/ · regress/ · doc/",flow:"坐标/轨迹 → 空间索引 → 时空查询",limits:"不等于 Gaia。"},
      {id:"OS-G06",name:"Apicurio Registry",category:"Schema / API",language:"Java",license:"Apache-2.0",node:"P03",url:"https://github.com/Apicurio/apicurio-registry",files:"app/ · common/ · ui/",flow:"Schema 注册 → 兼容检查 → 版本迁移",limits:"不替代领域本体设计。"},
      {id:"OS-G07",name:"Apache Kafka",category:"消息与边缘",language:"Java / Scala",license:"Apache-2.0",node:"P13",url:"https://github.com/apache/kafka",files:"clients/ · connect/ · core/",flow:"生产者 → topic → 消费/重放",limits:"不自动解决断连与跨域治理。"},
      {id:"OS-G08",name:"NATS",category:"消息与边缘",language:"Go",license:"Apache-2.0",node:"P13",url:"https://github.com/nats-io/nats-server",files:"server/ · test/ · go.mod",flow:"发布/订阅 → JetStream → 消费",limits:"不提供统一对象语义。"},
      {id:"OS-G09",name:"Eclipse Zenoh",category:"消息与边缘",language:"Rust",license:"EPL-2.0 / Apache-2.0",node:"P13",url:"https://github.com/eclipse-zenoh/zenoh",files:"zenoh/ · plugins/ · examples/",flow:"发布/查询 → 路由 → 订阅/存储",limits:"边缘治理需单独验证。"},
      {id:"OS-G10",name:"Open Policy Agent",category:"身份与治理",language:"Go",license:"Apache-2.0",node:"P08",url:"https://github.com/open-policy-agent/opa",files:"rego/ · topdown/ · server/",flow:"身份/对象/用途 → 策略 → 允许/拒绝",limits:"不提供客户分类规则。"},
      {id:"OS-G11",name:"Keycloak",category:"身份与治理",language:"Java",license:"Apache-2.0",node:"P08",url:"https://github.com/keycloak/keycloak",files:"services/ · server-spi/ · testsuite/",flow:"用户/角色 → 令牌 → 服务鉴权",limits:"不等于高安全部署认证。"},
      {id:"OS-G12",name:"Temporal",category:"流程与评估",language:"Go",license:"MIT",node:"P07",url:"https://github.com/temporalio/temporal",files:"service/ · common/ · tests/",flow:"工作流 → 人工批准 → 持久历史/恢复",limits:"领域审批规则需自建。"},
      {id:"OS-G13",name:"OpenTelemetry",category:"流程与评估",language:"Go 等",license:"Apache-2.0",node:"P14",url:"https://github.com/open-telemetry/opentelemetry-collector",files:"receiver/ · processor/ · exporter/",flow:"日志/指标/trace → 处理 → 输出",limits:"不等于安全审计系统。"}
    ],
    parameters:[
      ["D01","数据源数量","测试变量","3—8 个合成源","数据"],["D02","对象数量","测试变量","10,000—100,000 个","数据"],["D03","每对象来源数","测试变量","1—5 个","数据"],
      ["D04","Schema 版本","测试变量","3—12 个","数据"],["D05","权限标记类型","测试变量","4—8 类","治理"],["N01","带宽","测试变量","1—50 Mbps","网络"],
      ["N02","端到端延迟","测试变量","40—500 ms","网络"],["N03","丢包率","测试变量","0—20%","网络"],["N04","断连时长","测试变量","2 秒—10 分钟","网络"],
      ["V01","实体解析 F1","判定指标","按真值集计算","质量"],["V02","误合并率","判定指标","按真值集计算","质量"],["V03","来源完整率","判定指标","对象可回溯比例","治理"],
      ["V04","回放一致性","判定指标","前后状态核对","质量"],["V05","审批完整率","判定指标","完整记录比例","流程"],["V06","越权读取率","判定指标","应为 0","治理"],
      ["V07","恢复时间","判定指标","按断连档位统计","网络"]
    ]
  },
  maven:{
    nodes:[
      ["R-G01","多源态势与目标融合",0,"公开能力",["M18","M43"]],["R-G02","人工可控的决策流程",0,"公开能力",["M7"]],["R-G03","异构与联盟协同",0,"部分公开",["M12","M44"]],["R-G04","受治理的 AI 辅助",0,"部分公开",["M19"]],["R-G05","受限通信下任务连续性",0,"部分公开",["M66"]],
      ["R-P01","观测标准化与时空关联",1,"候选机制",["M43"]],["R-P02","候选检测到人工核验",1,"公开任务链",["M7"]],["R-P03","对象—关系—行动表达",1,"通用参照",["M24"]],["R-P04","接口映射与受控交换",1,"公开任务链",["M43","M44"]],["R-P05","跨域/联盟授权审计",1,"候选机制",["M12","M47"]],["R-P06","模型登记评测嵌入",1,"候选机制",["M19"]],["R-P07","断连容忍与恢复",1,"候选机制",["M66"]],
      ["R-F01","源数据适配与登记",2,"候选模块",["M43"]],["R-F02","检测结果与实时图层",2,"公开任务链",["M7"]],["R-F03","人工复核与状态管理",2,"公开任务链",["M7"]],["R-F04","下游任务信息发布",2,"公开任务链",["M7"]],["R-F05","外部系统适配",2,"部分公开",["M44"]],["R-F06","对象/权限/动作绑定",2,"通用参照",["M24"]],["R-F07","模型评测与输出审计",2,"通用参照",["M19"]],["R-F08","模型/LLM 辅助编排",2,"部分公开",["M19"]],["R-F09","本地任务状态与恢复",2,"候选模块",["M66"]],["R-F10","现场反馈与快速迭代",2,"部分公开",["M66"]],
      ["R-U01","源系统连接器",3,"候选单元",["M43"]],["R-U02","时间/位置/来源规范化",3,"候选单元",["M43"]],["R-U03","实时图层/候选记录",3,"公开任务链",["M7"]],["R-U04","人工核验记录",3,"部分公开",["M7"]],["R-U05","外部发布端点",3,"公开路径",["M7"]],["R-U06","跨域/接口桥接",3,"外部桥接",["M43","M44"]],["R-U07","策略执行与审计记录",3,"候选单元",["M47"]],["R-U08","模型注册/评测工作台",3,"通用参照",["M19"]],["R-U09","本地事件队列与续传",3,"候选单元",["M66"]],["R-U10","版本配置与观测反馈",3,"候选单元",["M66"]]
    ],
    edges:[
      {from:"R-G01",to:["R-P01","R-P03"],type:"mixed"},{from:"R-G02",to:["R-P02"],type:"observed"},{from:"R-G03",to:["R-P04","R-P05"],type:"mixed"},{from:"R-G04",to:["R-P06"],type:"candidate"},
      {from:"R-P01",to:["R-F01","R-F02"],type:"candidate"},{from:"R-P02",to:["R-F02","R-F03","R-F04"],type:"observed"},{from:"R-P03",to:["R-F06"],type:"candidate"},
      {from:"R-P04",to:["R-F05","R-U06"],type:"mixed"},{from:"R-P05",to:["R-F06","R-U07"],type:"candidate"},{from:"R-P06",to:["R-F07","R-F08","R-U08"],type:"candidate"},
      {from:"R-F01",to:["R-U01","R-U02"],type:"candidate"},{from:"R-F02",to:["R-U03"],type:"observed"},{from:"R-F03",to:["R-U04"],type:"observed"},{from:"R-F04",to:["R-U05"],type:"observed"},
      {from:"R-F05",to:["R-U06"],type:"mixed"},{from:"R-F06",to:["R-U07"],type:"candidate"},{from:"R-F07",to:["R-U08"],type:"candidate"},
      {from:"R-G05",to:["R-P04","R-P05","R-P07"],type:"mixed"},{from:"R-P07",to:["R-F09","R-U09"],type:"candidate"},{from:"R-P04",to:["R-F10","R-U10"],type:"mixed"},
      {from:"R-F09",to:["R-U09"],type:"candidate"},{from:"R-F10",to:["R-U10"],type:"candidate"}
    ],
    projects:[
      {id:"OS-01",name:"STAC Specification",category:"时空观测",language:"JSON / Markdown",license:"以仓库 LICENSE 为准",node:"R-P01",url:"https://github.com/radiantearth/stac-spec",files:"item-spec/ · examples/ · json-schema/",flow:"资产 → Item/Collection → 校验",limits:"不证明 MSS 使用 STAC。"},
      {id:"OS-02",name:"PostGIS",category:"时空观测",language:"C / SQL",license:"GPL-2.0",node:"R-P01",url:"https://github.com/postgis/postgis",files:"postgis/ · regress/ · doc/",flow:"几何对象 → 空间索引 → 查询",limits:"不代表 MSS 存储引擎。"},
      {id:"OS-03",name:"Apache NiFi",category:"接口接入",language:"Java",license:"Apache-2.0",node:"R-P04",url:"https://github.com/apache/nifi",files:"nifi-framework-bundle/ · nifi-nar-bundles/ · nifi-system-tests/",flow:"源处理器 → 队列 → 转换/路由 → 目标",limits:"不代表 MSS 采用 NiFi。"},
      {id:"OS-04",name:"Apache Kafka",category:"接口接入",language:"Java / Scala",license:"Apache-2.0",node:"R-P04",url:"https://github.com/apache/kafka",files:"clients/ · connect/ · core/",flow:"生产者 → topic → 消费者/重放",limits:"不推断 MSS 事件总线实现。"},
      {id:"OS-05",name:"Temporal",category:"人员工作流",language:"Go",license:"MIT",node:"R-P02",url:"https://github.com/temporalio/temporal",files:"service/ · common/ · schema/",flow:"状态命令 → 持久历史 → 人工任务",limits:"不代表 MSS 使用 Temporal。"},
      {id:"OS-06",name:"MLflow",category:"模型治理",language:"Python / TypeScript",license:"Apache-2.0",node:"R-P06",url:"https://github.com/mlflow/mlflow",files:"mlflow/ · tests/ · tracking/",flow:"模型/评测集 → 指标 → 审核",limits:"不代表 MSS MLOps 工具链。"},
      {id:"OS-07",name:"Open Policy Agent",category:"权限审计",language:"Go",license:"Apache-2.0",node:"R-P05",url:"https://github.com/open-policy-agent/opa",files:"rego/ · topdown/ · server/",flow:"身份/策略 → 允许/拒绝 → 决策日志",limits:"不代表 MSS 安全实现。"},
      {id:"OS-08",name:"OpenTelemetry Collector",category:"权限审计",language:"Go",license:"Apache-2.0",node:"R-P05",url:"https://github.com/open-telemetry/opentelemetry-collector",files:"receiver/ · processor/ · exporter/",flow:"trace/log/metric → 采集 → 输出",limits:"不代表 MSS 运维架构。"},
      {id:"OS-09",name:"Eclipse Zenoh",category:"受限通信",language:"Rust",license:"EPL-2.0 / Apache-2.0",node:"R-P07",url:"https://github.com/eclipse-zenoh/zenoh",files:"zenoh/ · plugins/ · examples/",flow:"发布/查询 → 路由 → 订阅/存储 → 重连",limits:"不证明 MSS 使用 Zenoh。"}
    ],
    parameters:[
      ["V01","数据源类别","公开事实","视觉、电子战、情报、任务数据","数据"],["V02","检测负载等级","测试变量","100 / 1,000 / 10,000 条","数据"],
      ["V03","观测最小字段","测试变量","来源、时间、位置、类别、状态","数据"],["V04","时空关联规则","测试变量","时间窗、空间阈值可调","数据"],
      ["V05","人工复核动作","事实＋测试变量","核验、搁置、否决、理由","流程"],["V06","任务链时限","案例事实","特定演训约 2 小时；非通用 SLA","流程"],
      ["V07","下游输出路由","案例事实","仅模拟外部端点","流程"],["V08","接入模式","事实＋测试变量","直连、桥接、人工转录、失败","接口"],
      ["V09","网络条件","测试变量","正常、受扰、短时断连","网络"],["V10","联盟/安全域上下文","公开事实","NATO / 军种实例分别记录","治理"],
      ["V11","模型身份与版本","测试变量","记录模型/API、版本与回滚","模型"],["V12","模型评测集","测试变量","固定评测集与真值","模型"],
      ["V13","策略与审计字段","测试变量","身份、角色、用途、时间、理由","治理"],["V14","审计完整率","判定指标","按任务 ID 核验链路","治理"],
      ["V15","端到端任务时间","判定指标","按负载和网络分层","流程"],["V16","融合质量","判定指标","准确率、冲突率、血缘覆盖率","数据"],
      ["V17","接口适配质量","判定指标","映射成功率、修复时间","接口"],["V18","模型与人机治理质量","判定指标","越权率、纠错率、可复现性","模型"],
      ["V19","断连持续时间","测试变量","0 / 30 秒 / 5 / 30 分钟","网络"],["V20","待发事件量","测试变量","100 / 1,000 / 10,000 条","网络"],
      ["V21","恢复同步时间","判定指标","链路恢复至一致状态","网络"],["V22","恢复一致性错误","判定指标","丢失、重复、乱序、冲突","网络"]
    ]
  }
};
