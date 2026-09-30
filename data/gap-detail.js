/* Explicit research estimates; untested baseline, no zero imputation. */
window.PALANTIR_GAP_DETAIL = {
  "components": {
    "splink": {
      "name": "Splink",
      "repo": "moj-analytical-services/splink",
      "version": "v4.0.0",
      "scope": "候选匹配、概率链接；撤销传播与人工复核需自建。",
      "sha": "2e6892093889af6153a3790be47f631123dad37b",
      "objectType": "commit",
      "url": "https://github.com/moj-analytical-services/splink/tree/v4.0.0"
    },
    "nifi": {
      "name": "Apache NiFi",
      "repo": "apache/nifi",
      "version": "rel/nifi-2.0.0",
      "scope": "连接、路由与转换；领域语义及跨系统权限需自建。",
      "sha": "0e330f892c6f15388c1fdf1e01acd5fd8ddaed77",
      "objectType": "tag",
      "url": "https://github.com/apache/nifi/tree/rel/nifi-2.0.0"
    },
    "opa": {
      "name": "OPA",
      "repo": "open-policy-agent/opa",
      "version": "v1.0.0",
      "scope": "策略决策引擎；身份、审计存储和用途模型需外部集成。",
      "sha": "00cc7ae2757b456f60e211ea55319175ae669556",
      "objectType": "commit",
      "url": "https://github.com/open-policy-agent/opa/tree/v1.0.0"
    },
    "temporal": {
      "name": "Temporal",
      "repo": "temporalio/temporal",
      "version": "v1.25.0",
      "scope": "持久工作流；任务领域模型和用户界面需自建。",
      "sha": "be848c89192af6c5f9f01477ab2320b6a40d4b67",
      "objectType": "commit",
      "url": "https://github.com/temporalio/temporal/tree/v1.25.0"
    },
    "postgis": {
      "name": "PostGIS",
      "repo": "postgis/postgis",
      "version": "3.5.0",
      "scope": "空间索引和查询；地图界面、轨迹冲突规则需自建。",
      "sha": "f65af6e76bd169ac59194c2f147b7bbaa7d3214f",
      "objectType": "tag",
      "url": "https://github.com/postgis/postgis/tree/3.5.0"
    },
    "mlflow": {
      "name": "MLflow",
      "repo": "mlflow/mlflow",
      "version": "v2.17.0",
      "scope": "模型登记、实验与评测管理；具体模型、数据和审批规则另行固定。",
      "sha": "2cddebcf613a8f383ffdec721d4bcefc603bd556",
      "objectType": "commit",
      "url": "https://github.com/mlflow/mlflow/tree/v2.17.0"
    }
  },
  "rows": {
    "G01": {
      "components": [
        "nifi",
        "postgis"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "用 10 个对象类型、3 个来源、2 次 schema 升级检查统一模型。",
      "acceptance": "100% 保留类型和来源字段；兼容迁移用例全部通过；新增类型不改已有接口。",
      "rationale": "接口说明支撑对象和类型映射；跨源统一治理只有机制说明，缺同环境实测。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、PostGIS。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G02": {
      "components": [
        "splink",
        "temporal"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "生成 1,000 组带真值的重复对象，加入误合并及人工撤销。",
      "acceptance": "撤销后对象/关系/来源引用一致；误合并率按真值计算并单列阈值曲线；不可用总体准确率替代。",
      "rationale": "解析与取消解析有明确文档；下游撤销传播和误合并率没有公开实测。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Splink、Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G03": {
      "components": [
        "nifi",
        "opa"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "接入 3 个模拟数据源，逐个断开、恢复，并更改源端权限。",
      "acceptance": "来源字段保留率 100%；无权限请求全部拒绝；陈旧数据明确标记；记录恢复时间。",
      "rationale": "联邦访问及来源边界可见，故障和缓存行为尚无同口径结果。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、OPA。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G04": {
      "components": [
        "postgis"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "回放 10 万条带乱序、重复时间戳和不同坐标系的合成观测。",
      "acceptance": "坐标转换真值误差满足预设容差；地图与回放状态一致；公布 p50/p95 延迟，不预填性能。",
      "rationale": "Gaia 与轨迹资源说明了覆盖范围；时间/坐标冲突处理效果待测。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：PostGIS。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G05": {
      "components": [
        "temporal",
        "opa"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "构造提交、复核、退回、批准、回写流程，注入崩溃与重复请求。",
      "acceptance": "未经批准不得进入下一状态；审批记录完整率 100%；重复回写不重复生效。",
      "rationale": "任务领域接口可见，但客户审批、异常恢复和结果回写未形成公开测试。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Temporal、OPA。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G06": {
      "components": [
        "opa",
        "nifi"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "用 4 个角色、3 级标签、允许/拒绝策略矩阵测试跨模块访问。",
      "acceptance": "越权成功数为 0；审计字段完整率 100%；权限撤销后再次访问被拒绝。",
      "rationale": "2024 服务说明涉及细粒度安全及审计；实际部署策略和有效性未独立验证。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：OPA、Apache NiFi。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G07": {
      "components": [
        "temporal",
        "nifi"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "断网 30 分钟，注入重复及冲突记录，再恢复同步。",
      "acceptance": "明确冲突规则；无静默丢弃；列出恢复时间、丢失率和人工处理量。",
      "rationale": "S-1 明确 Forward 支持断连和同步；无法据此估计恢复时间或跨环境一致性。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Temporal、Apache NiFi。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G08": {
      "components": [
        "nifi",
        "temporal"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "固定 20 个代表性 API 契约，执行客户端版本升级及错误输入测试。",
      "acceptance": "契约回归全部通过；错误码可解释；分别记录首次接入与升级工时。",
      "rationale": "公开 API/OSDK 和 2024 REST 说明支持接口方向；不证明全部生产端点兼容。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G09": {
      "components": [
        "mlflow",
        "opa"
      ],
      "product": [
        null,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "固定 100 条合成问答、文档权限和 20 条越权诱导输入。",
      "acceptance": "输出附可定位依据；越权检索为 0；人工复核与拒答均有记录；模型另行固定。",
      "rationale": "白皮书方向不足以判定具体引用、权限继承、人工审批链；暂不评分。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：MLflow、OPA。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G10": {
      "components": [
        "nifi",
        "temporal"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "用两个合成业务场景，由不同人员分别完成建模、接入和培训。",
      "acceptance": "逐项记录人时、变更次数和交付验收；第二场景复用程度单独统计。",
      "rationale": "项目与服务说明证明交付存在，但成本、周期、岗位熟练度无可比数据。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G11": {
      "components": [
        "nifi",
        "postgis"
      ],
      "product": [
        3,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "导出 10 万对象、关系、来源及权限标签，导入独立验证库。",
      "acceptance": "对象/关系/附件数量与校验和一致；列明不可导出字段、工时与依赖。",
      "rationale": "2024 服务定义声称开放格式导出；迁移可行不等于迁移便宜，仍缺实际转换证据。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、PostGIS。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "G12": {
      "components": [
        "opa",
        "temporal"
      ],
      "product": [
        2,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "为合成数据配置用途、保留期限、删除和复核审批。",
      "acceptance": "到期数据无法继续查询；删除覆盖下游副本；审计能解释每次使用的依据。",
      "rationale": "安全标记只是局部线索，不能证明用途、保留与删除链全部完成。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：OPA、Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-01": {
      "components": [
        "temporal",
        "postgis"
      ],
      "product": [
        3,
        3,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "以合成检测结果驱动图层、人员确认与状态记录；不执行真实任务。",
      "acceptance": "所有确认可追溯到输入；重复消息幂等；记录检测输入到人工确认时长。",
      "rationale": "具名案例支撑流程串接；具体模型精度与端到端时间未知。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Temporal、PostGIS。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-02": {
      "components": [
        "mlflow"
      ],
      "product": [
        null,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "固定模型、数据快照与评测脚本后，重复评测并模拟回滚。",
      "acceptance": "同种子评测差异不超过约定容差；回滚可复现；报告漂移告警漏检。",
      "rationale": "MSS 专属评测数据、模型及回滚机制未公开，不能沿用原来的低分估计。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：MLflow。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-03": {
      "components": [
        "nifi",
        "postgis"
      ],
      "product": [
        3,
        3,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "用 3 类模拟传感器流测试时间对齐、来源、重复及矛盾记录。",
      "acceptance": "来源覆盖率 100%；有真值的关联分别报告精确率与召回率；冲突有日志。",
      "rationale": "ISA/TACDS 的具名接入支撑局部流程，不能外推全部数据融合场景。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、PostGIS。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-04": {
      "components": [
        "nifi",
        "temporal"
      ],
      "product": [
        3,
        2,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "分别测试直连接口、桥接和人工转录；加入网络中断。",
      "acceptance": "分路径统计错误率和人工工时；不将某一成功接口当成全面互通。",
      "rationale": "公开案例同时有成功接入、桥接和人工转录，集成范围受部署限制。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-05": {
      "components": [
        "opa",
        "temporal"
      ],
      "product": [
        2,
        null,
        2
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "搭建两个模拟域，使用带标签的合成记录测试批准后共享。",
      "acceptance": "未批准跨域流转为 0；撤销传播有记录；审批链和日志字段齐全。",
      "rationale": "NATO FTOC 是限定实例运行状态；不披露身份、数据主权和跨域配置。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：OPA、Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-06": {
      "components": [
        "mlflow",
        "opa"
      ],
      "product": [
        null,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "用固定模型和合成资料检查带引用的辅助输出及人工批准。",
      "acceptance": "每条结论可定位来源；越权调用为 0；保留提示、模型版本与复核日志。",
      "rationale": "可嵌入模型的公告不足以确认 Agent 或生成式治理生产能力。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：MLflow、OPA。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-07": {
      "components": [
        "nifi",
        "temporal"
      ],
      "product": [
        2,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "固定 20 并发用户，以相同事件负载执行 1 小时稳定性测试。",
      "acceptance": "记录实际吞吐、p95 延迟、失败率、CPU/内存；双方条件不同时不算性能差距。",
      "rationale": "局部用户和合同数据不证明吞吐、可用性或任务效果。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-08": {
      "components": [
        "nifi",
        "postgis"
      ],
      "product": [
        2,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "以开放字段契约接入第三方，再做全量导出与重导入。",
      "acceptance": "字段完整率与关联一致性 100%；单列 API 权利、许可限制及工时。",
      "rationale": "Open DAGIR 证明接入路径，不证明 MSS 的全部核心接口与导出权。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Apache NiFi、PostGIS。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    },
    "GAP-09": {
      "components": [
        "temporal"
      ],
      "product": [
        2,
        null,
        null
      ],
      "baseline": [
        2,
        1,
        null
      ],
      "test": "用 5 名内部测试者完成同一合成流程，记录培训前后表现。",
      "acceptance": "报告任务正确率、完成时间和绕行次数；样本小，不外推组织级效果。",
      "rationale": "具名培训和使用经验存在，缺熟练度与长期采用的可比指标。",
      "baselineRationale": "仅选定可核查的独立组件与拟议连接：Temporal。本专题没有部署或运行该组合；能力覆盖按单组件文档估计为 2，集成按已写明的方案级连接估计为 1，运行验证为待验证。",
      "target": [
        4,
        4,
        4
      ]
    }
  },
  "environment": "方案基线 B0：Ubuntu 24.04；8 vCPU / 32 GB RAM / 200 GB SSD；单机容器、20 个模拟并发用户、10 万条合成记录。全部是拟议条件，本轮未部署；依赖数据库、运行时和镜像摘要须在实施时锁定。模型/推理类测试另需固定模型与硬件，不按此单机条件预填性能。",
  "flow": "合成输入 → NiFi 接入 → 对象/空间存储 → 按需接入 Splink、OPA、Temporal 或 MLflow → 结果、人工复核与审计。箭头是拟议集成，尚无实测。",
  "rubrics": [
    [
      "0：同口径测试证实不具备",
      "1：仅需求/设计",
      "2：有独立组件或局部功能文档",
      "3：多项能力有接口/材料支持",
      "4：明确场景中端到端能力有验证",
      "5：跨场景独立复现"
    ],
    [
      "0：测试证实无法连通",
      "1：只有连接设计",
      "2：接口或多模块协同有说明",
      "3：具名场景中流程可追溯",
      "4：含异常/恢复的独立复现",
      "5：跨部署持续复验"
    ],
    [
      "0：既定验收失败",
      "1：单点可复现测试",
      "2：限定实例有运行/验收披露",
      "3：公开数据、步骤和结果可复核",
      "4：独立复现实验通过",
      "5：跨环境长期复测通过"
    ]
  ]
};
