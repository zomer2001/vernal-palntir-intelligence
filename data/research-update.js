/* Primary standards and dated Gotham evidence verified 2026-09-30.
 * Dates below distinguish historical year, disclosure date and actual event date. */
(()=>{
 const L=window.PALANTIR_LINEAGE,R=window.PALANTIR_ROUTE_CHART;
 const sources={
 'G-Q122':{title:'Palantir Q1 2022 Business Update · pp.6,8,22',type:'厂商投资者材料',url:'https://investors.palantir.com/files/Palantir%20Q1%202022%20Business%20Update.pdf'},
 'G-GC24':{title:'Gotham G-Cloud 14 服务定义 · 2024 · pp.3–5,17,23',type:'政府平台刊载的厂商服务说明',url:'https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/92736/801146272055049-service-definition-document-2024-05-02-1537.pdf'},
 'G-COURT23':{title:'德国联邦宪法法院 · 2023-02-16 · 18/2023',type:'司法一手材料',url:'https://www.bundesverfassungsgericht.de/SharedDocs/Pressemitteilungen/EN/2023/bvg23-018.html'},
 'G-DW25':{title:'DW · German police expands use of Palantir surveillance software · 2025-08-04',type:'具名媒体报道',url:'https://www.dw.com/en/german-police-expands-use-of-palantir-surveillance-software/a-73497117'},
 'TECH-OAUTH':{title:'RFC 6749 · OAuth 2.0 · 2012-10',type:'IETF 标准',url:'https://www.rfc-editor.org/rfc/rfc6749'},
 'TECH-JWT':{title:'RFC 7519 · JWT · 2015-05',type:'IETF 标准',url:'https://www.rfc-editor.org/rfc/rfc7519'},
 'TECH-GEOJSON':{title:'RFC 7946 · GeoJSON · 2016-08',type:'IETF 标准',url:'https://www.rfc-editor.org/rfc/rfc7946'},
 'TECH-OPENAPI':{title:'OpenAPI 3.0.0 · 2017-07-26',type:'开放规范',url:'https://spec.openapis.org/oas/v3.0.0.html'},
 'TECH-RAFT':{title:'Raft · USENIX ATC 2014 · pp.305–319',type:'公开论文',url:'https://www.usenix.org/conference/atc14/technical-sessions/presentation/ongaro'},
 'TECH-MODELCARDS':{title:'Model Cards for Model Reporting · 首次提交 2018-10-05',type:'公开论文',url:'https://arxiv.org/abs/1810.03993'},
 'TECH-DATASHEETS':{title:'Datasheets for Datasets · 首次提交 2018-03-23',type:'公开论文',url:'https://arxiv.org/abs/1803.09010'},
 'TECH-RAG':{title:'Retrieval-Augmented Generation · 首次提交 2020-05-22',type:'公开论文',url:'https://arxiv.org/abs/2005.11401'}
 };Object.assign(L.extraSources,sources);
 const g=L.gotham;
 [['deployments','项目与部署','external'],['edge-direction','边缘 AI 生态方向','governance']].forEach(([id,name,layer])=>{g.objects.push({id,name,layer});g.layers.find(l=>l.id===layer).objects.push(id)});
 const historic=[
 ['G-2013',2013,'intelligence','HUMINT 应用方向','2022 年路线图回溯标注 2013 年 HUMINT；只证明厂商历史定位，不是可验证的功能首发。'],
 ['G-2014',2014,'federated','情报共同体全源方向','2022 年路线图回溯标注 All sources within intelligence community；不等于现行联邦 API 当年发布。'],
 ['G-2015',2015,'intelligence','防务情报与 J2 方向','2022 年厂商路线图的历史应用范围标注。'],
 ['G-2016',2016,'deployments','执法、司法与反欺诈扩展','2022 年路线图回溯标注的市场和应用方向。'],
 ['G-2017',2017,'mission','情报与行动结合','2022 年路线图标注 Operations（intelligence + operations）；不能据此推断任务流程内部实现。'],
 ['G-2018',2018,'deployments','战备与后勤应用方向','2022 年路线图历史定位，非具体客户验收。'],
 ['G-2019',2019,'mission','AI-enabled mission command 方向','2022 年路线图回溯所列方向，非模型性能或自动化程度指标。'],
 ['G-2021E',2021,'edge-direction','EdgeAI / MetaConstellation / Titan 生态方向','2022 年路线图将三者列在 Gotham 栏的 2021 年；表达生态与应用方向，不归为 Gotham 内部模块。']
 ];historic.forEach(([id,year,object,title,note])=>g.events.push({id,year,object,title,date:String(year)+'（回溯）',kind:'官方路线图回溯',note,sources:['G-Q122']}));
 const dated=[
 ['G-2022U','2022 Q1',2022.24,'gaia','Gaia / Gotham 支持乌克兰相关任务披露','材料第 6 页列出 Gaia、Gotham 等用于客户任务和邻国救援；不是特定部署性能或全部能力验收。','G-Q122','厂商使用披露'],
 ['G-2022B','2022 Q1',2022.24,'deployments','德国框架协议与巴伐利亚首单','材料第 22 页明确 Gotham 与 Foundry 框架协议及巴伐利亚警方首单；不等于德国所有警方完成部署。','G-Q122','采购披露'],
 ['G-2023L','2023-02-16',2023.13,'provenance','hessenDATA 所涉自动分析授权受到司法约束','法院认定相关法律授权缺少充分干预门槛。Hesse 实际使用 hessenDATA，Hamburg 尚未使用；这是法律适用事件，不是对 Gotham 算法能力的判决。Gotham 与德国部署关系参见 DW 报道。','G-COURT23','司法与治理事件'],
 ['G-2024O','2024（服务说明）',2024.34,'revdb','对象语义与数据建模说明','服务定义第 4 页描述将结构化及非结构化记录建模为对象；只支撑语义能力，不确认 RevDB 内核。','G-GC24','采购材料能力披露'],
 ['G-2024F','2024（服务说明）',2024.34,'federated','内外部数据联邦检索说明','服务定义第 4 页说明跨内部、外部来源单点查询，保留外部系统的数据。','G-GC24','采购材料能力披露'],
 ['G-2024S','2024（服务说明）',2024.34,'provenance','细粒度安全、审计与低带宽协同','服务定义第 4 页描述安全、审计、历史和低带宽高时延环境协作；为厂商说明，非独立测量。','G-GC24','采购材料能力披露'],
 ['G-2024API','2024（服务说明）',2024.34,'api','REST API 与开放格式导出说明','服务定义第 5、23 页涉及 API、安全校验及非专有格式导出；不证明全部部署的迁移成本或法律权利。','G-GC24','采购材料能力披露'],
 ['G-2024I','2024（服务说明）',2024.34,'foundry','Gotham / Foundry 协同能力说明','服务定义第 3 页称利用 Foundry 能力形成互操作方案；两者仍是不同产品。','G-GC24','平台集成说明'],
 ['G-2024D','2024（报道回溯）',2024.5,'deployments','巴伐利亚 VeRA 获得软件','DW 于 2025-08-04 回溯称 2024 年提供软件；月份未披露，图中年内位置只用于排布。','G-DW25','部署回溯'],
 ['G-2025C','截至 2025-05',2025.36,'deployments','VeRA 约百起案件使用报道','DW 转引德国媒体称截至 2025 年 5 月约 100 起案件；是报道中的局部使用情况，未独立复核，不代表用户规模。','G-DW25','局部使用报道'],
 ['G-2025D','2025-08-04',2025.59,'deployments','德国三州使用与一州计划部署报道','DW 报道 Bavaria、Hesse、North Rhine-Westphalia 已使用；Baden-Württemberg 为计划。不得把计划计为已部署。','G-DW25','部署状态报道']
 ];dated.forEach(([id,date,year,object,title,note,source,kind])=>g.events.push({id,date,year,object,title,note,kind,sources:source==='G-COURT23'?[source,'G-DW25']:[source]}));
 const additions={R1:[['G-2013',1,'HUMINT 历史方向'],['G-2024O',3,'对象语义说明']],R2:[['G-2014',1,'全源情报历史方向'],['G-2024F',3,'联邦检索说明']],R3:[['G-2022U',3,'Gaia 具名使用披露']],R4:[['G-2017',1,'情报与行动结合'],['G-2019',2,'AI 任务指挥方向'],['G-2024API',3,'开放接口与导出']],R5:[['G-2021E',3,'边缘 AI 生态方向'],['G-2024S',3,'安全与审计说明']]};
 R.gotham.routes.forEach(r=>r.nodes.push(...(additions[r.id]||[])));
 R.gotham.routes.find(r=>r.id==='R4').nodes.find(n=>n[0]==='G-H20D')[1]=2;
 const common=[
 ['OAUTH','2012-10',2012.75,2,'OAuth 2.0 授权框架','受限访问授权流程；不等同于产品实际身份架构。','R5','G-M13','T5','M13'],
 ['RAFT','2014-06',2014.45,1,'Raft 复制日志共识','公开的复制日志与成员变更机制；不证明断连数据合并算法。','R5','G-H20FW','T4','M19'],
 ['JWT','2015-05',2015.34,2,'JWT 声明表示','跨系统传递签名声明；不等于完整授权与审计体系。','R5','G-M13','T5','M13'],
 ['GEOJSON','2016-08',2016.59,2,'GeoJSON 空间交换','地理要素、属性及空间范围的交换格式。','R3','G-H20A','T3','M11'],
 ['OPENAPI','2017-07',2017.56,2,'OpenAPI 3.0 接口契约','机器可读 API 描述，用于接口与客户端协作。','R4','G-M14','T4','M17'],
 ['DATASHEETS','2018-03',2018.22,1,'数据集说明卡','记录数据来源、采集、用途和限制；不是数据血缘实现。','R2','G-2024F','T1','M20'],
 ['MODELCARDS','2018-10',2018.76,2,'模型卡与适用边界','报告模型性能、用途和限制，支撑可审查的模型治理。','R5','G-M15','T5','M10'],
 ['RAG','2020-05',2020.39,2,'检索增强生成','结合参数化模型与外部检索，为带依据的辅助生成提供研究参照。','R5','G-M15','T5','M10']
 ];for(const key of ['gotham','maven'])common.forEach(([id,date,year,stage,name,note,gr,gt,mr,mt])=>{const route=key==='gotham'?gr:mr,target=key==='gotham'?gt:mt;R[key].milestones.push({id:'PUBLIC-'+id,date,year,stage,name,note,type:sources['TECH-'+id].type,sources:['TECH-'+id],routes:[route],targets:[route+':'+target]})});
})();
