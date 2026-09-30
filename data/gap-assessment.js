/* 分析性评分，不是产品性能实测，也不是用户现有系统测评。
   每项 0-5：能力覆盖、端到端集成、公开证据；权重 40/35/25，换算为百分制。
   参考基线为单项开源项目可组成的公开候选，尚未完成集成。 */
window.PALANTIR_GAP_ASSESSMENT = {
 criteria:[{name:'能力覆盖',weight:40},{name:'端到端集成',weight:35},{name:'公开证据',weight:25}],
 anchors:['无公开能力或未实现','概念/单点设计','已有基础模块','可复现的多模块原型','公开案例或完整接口','跨来源与场景充分验证'],
 gotham:{label:'Gotham 公开能力',baseline:'开源组件组合参考基线',rows:{
  G01:{product:[4,3,4],baseline:[3,1,4],judgement:'对象 API 已公开，开源组件能存储与查询对象；统一领域语义和跨源治理仍需自建。',path:'建立 Schema Registry 与对象类型映射，再验证版本迁移和来源链。'},
  G02:{product:[4,3,4],baseline:[3,1,4],judgement:'Gotham 文档明确支持解析与取消解析；Splink 解决候选匹配，但撤销传播需自建。',path:'用 Splink 做候选链接，补人工复核、撤销事件和关系一致性检查。'},
  G03:{product:[4,3,4],baseline:[3,1,4],judgement:'Federated Sources 明确外部对象访问边界；开源连接器可读源数据，但来源链和故障策略需跨组件打通。',path:'用 NiFi 建只读连接和来源标记，注入源故障并验证缓存过期与来源保留。'},
  G04:{product:[4,3,3],baseline:[3,1,3],judgement:'Gaia、轨迹和观测资源可见；开源空间库覆盖查询，缺统一态势与交互联动。',path:'以 PostGIS 建立时空索引，用合成观测验证地图、时间线和回放一致性。'},
  G05:{product:[3,2,3],baseline:[2,1,3],judgement:'任务领域接口可见，客户审批配置未公开；单个工作流引擎不提供完整任务模型。',path:'用 Temporal 构造人工审批状态机，验证中断恢复和回写。'},
  G06:{product:[3,2,3],baseline:[3,1,3],judgement:'安全标记传递有集成证据；跨对象用途控制和审计效果需具体部署核验。',path:'OPA 加身份系统构建策略决策，测试越权阻断与审计链。'},
  G07:{product:[2,2,2],baseline:[2,1,3],judgement:'跨环境交付为公司级披露，Gotham 断连指标未知；开源消息组件仅覆盖部分恢复机制。',path:'设置断连、重放、冲突注入，记录恢复时间和一致性。'},
  G08:{product:[4,3,4],baseline:[3,2,4],judgement:'Gotham API 与 Defense OSDK 文档完整度较高；开源 API 需自行维护领域契约。',path:'针对公开接口定义建立 schema 兼容测试和版本迁移流程。'},
  G09:{product:[2,2,2],baseline:[2,1,3],judgement:'AI 白皮书主要为厂商主张；引用、权限与人工复核缺独立测量。',path:'只做权限约束检索与摘要，测试引用覆盖和越权调用。'},
  G10:{product:[4,3,3],baseline:[2,1,3],judgement:'政府场景和平台交付有证据；开源项目缺领域知识、交付流程与认证。',path:'拆分领域模型、数据治理、培训和部署清单，逐项记录工时。'},
  G11:{product:[2,2,2],baseline:[2,1,3],judgement:'接口不直接证明迁移容易；开源替代也需转换数据、权限和使用流程。',path:'先做对象/关系/来源全量导出样例，再估算迁移与培训成本。'},
  G12:{product:[2,2,2],baseline:[2,1,3],judgement:'用途与权利规则在公开层面有限，开源策略引擎只提供执行机制。',path:'定义用途、保留、删除和复核策略，验证可解释审计记录。'}
 }},
 maven:{label:'MSS 公开能力',baseline:'开源组件组合参考基线',rows:{
  'GAP-01':{product:[4,3,4],baseline:[3,1,4],judgement:'BAS-T 结果进入图层并经人员核验有案例；开源检测和工作流需集成。',path:'用合成检测数据串接图层、人工复核和任务状态记录。'},
  'GAP-02':{product:[2,2,2],baseline:[3,1,4],judgement:'MSS 专属模型评测未公开；MLflow 有登记和评测组件，但不等于任务级治理。',path:'建立固定评测集、版本回滚、漂移告警和人工审核记录。'},
  'GAP-03':{product:[4,3,4],baseline:[3,1,4],judgement:'政府表述和 ISA/TACDS 案例支持融合方向；开源连接器缺跨源语义与任务规则。',path:'组合 NiFi、时空索引和来源链，验证关联精度与冲突处理。'},
  'GAP-04':{product:[3,2,4],baseline:[3,1,4],judgement:'直连接入、桥接和人工转录均有实例，说明接口成熟度随部署而异。',path:'分别测直连、桥接、人工转录和断连恢复的成本与错误率。'},
  'GAP-05':{product:[3,3,4],baseline:[2,1,3],judgement:'NATO 采购与 FTOC 证明联盟实例运行；跨域策略和数据主权细节未公开。',path:'构建多租户/多域策略样例，验证共享审批和越权拦截。'},
  'GAP-06':{product:[2,2,2],baseline:[2,1,3],judgement:'模型可接入不证明特定 Agent 已生产运行；开源工具可做局部辅助。',path:'固定模型、提示和数据版本，限制为带引用辅助输出与人工复核。'},
  'GAP-07':{product:[3,3,4],baseline:[2,1,3],judgement:'许可和局部使用规模可见，但不能推断统一性能；开源组合缺同等部署证据。',path:'以负载、并发、可用性和任务周期建立同口径测量。'},
  'GAP-08':{product:[3,2,4],baseline:[3,1,4],judgement:'Open DAGIR 提供第三方接入路径；MSS 核心 API、导出权和替换成本仍未公开。',path:'定义最小开放数据契约，验证第三方接入与全量导出。'},
  'GAP-09':{product:[3,3,3],baseline:[2,1,3],judgement:'军种培训与 V Corps 使用说明流程嵌入重要；开源组件本身不提供岗位训练体系。',path:'设计岗位任务和培训样例，量化达标时间与流程绕行率。'}
 }}
};
