# Gotham 与 Maven Smart System 专题网页

直接打开 [index.html](./index.html) 进入总览，再进入 [Gotham](./gotham.html) 或 [Maven MSS](./maven.html)。页面的脚本、样式、图片和研究数据都在本文件夹中，离线可用；点击公开来源链接需要联网。

## 页面结构

| 板块 | 主要呈现 |
|---|---|
| 产品谱系 | 参照原离线版的分组表格、检索筛选、对象详情与证据抽屉 |
| 技术谱系 | 六层对象 / 公开事件 SVG 图谱；五条路线区分彩色产品节点和灰色通用技术参照，并展示分支关系 |
| 差距分析 | 研究性双序列雷达评分、分项评分依据、补强路径和可验证指标 |
| 技术破解 | 场景实验、四层原理网图、开源项目索引、逐项目参数包与 JSON 导出 |

Gotham 与 MSS 分别有独立页面和证据口径。Gotham 的“现行文档”节点是资料截面，不代表首次发布日期；MSS 的 Project Maven、军种和 NATO 节点保留各自边界。原理网图和开源项目是工程验证候选，不是对 Palantir 内部实现的断言。

## 文件

- `data/base.js`：产品、路线、差距、场景和基础来源。
- `data/lineage.js`：公开事件、分层对象、关系和补充来源。
- `data/route-chart.js`：两类技术节点、五条路线及分支关系。
- `data/gap-assessment.js`：差距研判评分、依据和补强路径。
- `data/deconstruction.js`：四层原理、开源候选和隔离验证参数。
- `css/reference/`：从 `情报服务平台-离线演示版` 拷贝的视觉模块样式。
- `css/topic.css`、`js/topic.js`、`js/technology.js`、`js/gap.js`：专题页面的适配样式、图谱及交互。
- [方案说明.md](./方案说明.md)：研究边界与页面设计。
- [资料索引.md](./资料索引.md)：公开来源索引。

可使用 `gotham.html?tab=technology&sub=graph` 或 `maven.html?tab=restoration&sub=principle` 直接定位。差距页的分值是公开资料研判：对标产品公开能力与开源组件组合参考基线，并非你的现有系统或产品性能实测。若要转为真实对标，还需补入明确的本方基线与同口径测试数据。
