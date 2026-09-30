/* Route renderer adapted from the supplied offline trend-analysis module.
 * Preserves reference SVG layers, symbols, stage geometry, filters and playback. */
window.TopicTechnology = (() => {
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let productLabel='', cleanup=null;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text).replaceAll('${PRODUCT}',productLabel);return n;};
 const svgElement=(tag,cls,attrs={},text)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);if(cls)n.setAttribute('class',cls);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text!==undefined)n.textContent=String(text);return n;};
 const button=(text,style,fn)=>{const n=el('button','topic-button'+(style==='primary'?' topic-button--primary':''),text);n.type='button';n.addEventListener('click',fn);return n;};
 const metrics=items=>{const n=el('div','topic-metrics');n.innerHTML=items.map(i=>`<div class="topic-metric"><strong>${escape(i.value)}</strong><small>${escape(i.label)}</small></div>`).join('');return n;};
 const section=(title,note,body,actions)=>{const n=el('section','intel-section');const h=el('div','intel-section__head');h.append(el('h3','',title),el('p','topic-note',note));n.append(h,actions,body);return n;};
 function routeData(ctx){
   const cfg=window.PALANTIR_ROUTE_CHART[ctx.key], ev=Object.fromEntries(ctx.graph.events.map(e=>[e.id,e]));
   const route_evolution=[];
   cfg.routes.forEach(r=>r.nodes.forEach(([id,stage,label])=>{const e=ev[id];if(!e||id==='G-M01')return;route_evolution.push({route_id:r.id+':'+id,技术路线:r.name,时间:e.date,时间值:e.year,阶段:cfg.generations?.[id]||stage,节点名称:label,节点状态:e.kind,节点说明:e.title+'。'+e.note,evidence_type:e.kind,eventId:id,sources:e.sources,boundary:e.note});}));
   const common_nodes=cfg.milestones.map(n=>({...n,route_id:n.id,时间:n.date,时间值:n.year,time_value:n.year,阶段:n.stage,节点名称:n.name,节点状态:'公开标准 / 研究',节点说明:n.note,evidence_type:n.type,boundary:'公共技术原理参照，不证明 Gotham 或 MSS 采用该标准或实现。',repositories:cfg.common.filter(r=>n.routes.includes(r.route))}));
   const branch_relations=cfg.milestones.flatMap(n=>n.targets.map(target=>({source:n.id,target,type:'机制参照'})));
   return {route_evolution,route_chart:{routes:cfg.routes,maturity_stages:['基础能力与需求','工具与流程形成','平台化应用','跨系统与生态协同'].map((label,i)=>({value:i+1,label})),common_nodes,branch_relations,route_forks:[],relations:cfg.forks.map(f=>({source:route_evolution.find(n=>n.eventId===f.from)?.route_id,target:route_evolution.find(n=>n.eventId===f.to)?.route_id,type:f.label})).filter(r=>r.source&&r.target)}};
 }

  function renderRoutes(mount, ctx) {
    const data = routeData(ctx);
    var panel = el("div", "intel-tab-panel");
    var chartConfig = data.route_chart || {};
    var palette = ["#2563eb", "#7c3aed", "#059669", "#ea580c", "#0891b2", "#db2777"];
    var routeNames = Array.from(new Set(data.route_evolution.map(function (item) { return item.技术路线; })));
    var routeDefinitions = (chartConfig.routes || []).slice();
    routeNames.forEach(function (name, index) {
      if (routeDefinitions.some(function (route) { return route.name === name; })) return;
      routeDefinitions.push({ id: "route-" + (index + 1), name: name, color: palette[index % palette.length], service: "围绕" + name + "形成持续演进能力。", technology: "根据节点技术和公开证据动态归纳。", maturity_dimension: "core-network" });
    });
    var stages = (chartConfig.maturity_stages || [
      { value: 1, label: "能力形成" },
      { value: 2, label: "工程验证" },
      { value: 3, label: "规模应用" },
      { value: 4, label: "体系融合" }
    ]).slice().sort(function (a, b) { return a.value - b.value; });
    var overrides = chartConfig.node_overrides || {};
    var relations = chartConfig.relations || [];
    var routeMap = {};
    routeDefinitions.forEach(function (route, index) {
      route.color = route.color || palette[index % palette.length];
      route.order = index;
      routeMap[route.name] = route;
    });
    var commonRoute = {
      id: "common-foundation",
      name: "通用研究与公共技术",
      color: "#7b8a9a",
      service: "提供可被多条技术路线吸收的公共研究、标准与工程方法。",
      technology: "公开论文、开放标准与通用开源技术；仅表示推动关系，不代表目标产品采用。",
      maturity_dimension: ""
    };

    function parseTime(value) {
      var values = [];
      var matcher = /(20\d{2})(?:-(0[1-9]|1[0-2]))?/g;
      var match;
      while ((match = matcher.exec(String(value || "")))) values.push(Number(match[1]) + ((Number(match[2] || 1) - 1) / 12));
      if (!values.length) return 0;
      return values.reduce(function (sum, item) { return sum + item; }, 0) / values.length;
    }

    function formatTime(value) {
      var year = Math.floor(value);
      var month = Math.round((value - year) * 12) + 1;
      if (month > 12) { year += 1; month = 1; }
      return month === 1 ? String(year) : year + "-" + String(month).padStart(2, "0");
    }

    var routeNodes = data.route_evolution.map(function (node) {
      var route = routeMap[node.技术路线];
      var detail = overrides[node.route_id] || {};
      return Object.assign({}, node, detail, {
        route: route,
        timeValue: Number(detail.time_value || node.时间值) || parseTime(node.时间),
        maturityDimension: detail.maturity_dimension || route.maturity_dimension
      });
    });
    var commonNodes = (chartConfig.common_nodes || []).map(function (node) {
      return Object.assign({}, node, {
        route: commonRoute,
        node_kind: "common",
        timeValue: Number(node.time_value) || parseTime(node.时间),
        maturityDimension: node.maturity_dimension || "core-network"
      });
    });
    var nodes = routeNodes.concat(commonNodes);
    var branchRelations = chartConfig.branch_relations || [];
    var routeForks = chartConfig.route_forks || [];
    var minTime = Math.floor(Math.min.apply(null, nodes.map(function (node) { return node.timeValue; })));
    var maxTime = Math.ceil(Math.max.apply(null, nodes.map(function (node) { return node.timeValue; })));
    var minStage = Math.min.apply(null, stages.map(function (stage) { return stage.value; }));
    var maxStage = Math.max.apply(null, stages.map(function (stage) { return stage.value; }));
    if (minStage === maxStage) maxStage = minStage + 1;

    panel.appendChild(metrics([
      { label: "技术路线", value: routeDefinitions.length + " 条" },
      { label: "技术树节点", value: nodes.length + "（通用" + commonNodes.length + "）" },
      { label: "分支推动关系", value: (branchRelations.length + routeForks.length) + " 组" },
      { label: "时间跨度", value: minTime + "—当前" }
    ]));

    var actions = el("div", "intel-route-actions");
    var relationToggle = button("隐藏跨路线关系", "secondary", toggleRelations);
    relationToggle.setAttribute("aria-pressed", "true");
    var playButton = button("播放技术演化", "primary", playEvolution);
    actions.appendChild(relationToggle);
    actions.appendChild(playButton);

    var workspace = el("div", "intel-route-workspace");
    var chartColumn = el("div", "intel-route-chart-column");
    var legend = el("div", "intel-route-legend");
    legend.appendChild(el("span", "intel-route-legend__title", "路线筛选"));
    var typeLegend = el("div", "intel-route-type-legend");
    var viewport = el("div", "intel-route-svg-viewport");
    var svg = svgElement("svg", "intel-route-svg", { viewBox: "0 0 1460 640", role: "img", "aria-label": "关键技术路线演化折线图" });
    var defs = svgElement("defs");
    var marker = svgElement("marker", "", { id: "intel-route-arrow", viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse" });
    marker.appendChild(svgElement("path", "", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#64748b" }));
    defs.appendChild(marker);
    svg.appendChild(defs);
    var bandLayer = svgElement("g", "intel-route-bands");
    var gridLayer = svgElement("g", "intel-route-grid");
    var branchLayer = svgElement("g", "intel-route-tree-branches");
    var forkLayer = svgElement("g", "intel-route-forks");
    var relationLayer = svgElement("g", "intel-route-relations");
    var lineLayer = svgElement("g", "intel-route-lines");
    var pointLayer = svgElement("g", "intel-route-points");
    svg.appendChild(bandLayer);
    svg.appendChild(gridLayer);
    svg.appendChild(branchLayer);
    svg.appendChild(forkLayer);
    svg.appendChild(relationLayer);
    svg.appendChild(lineLayer);
    svg.appendChild(pointLayer);
    viewport.appendChild(svg);
    chartColumn.appendChild(legend);
    [["公开研究 / 通用技术", "common"], [productLabel + " 路线节点", "milestone"], ["专利 / 原理", "diamond"], ["测试 / 演示", "square"]].forEach(function (entry) {
      var item = el("span", "intel-route-type-legend__item");
      item.appendChild(el("i", "intel-route-type-legend__shape intel-route-type-legend__shape--" + entry[1]));
      item.appendChild(document.createTextNode(entry[0]));
      typeLegend.appendChild(item);
    });
    chartColumn.appendChild(typeLegend);
    chartColumn.appendChild(viewport);
    var chartNote = el("p", "intel-route-chart-note", "点击上方路线或任一彩色节点即可只看该路线；点击“全部路线”恢复全景。灰色小点是公开研究、标准和通用技术，灰线只表示对路线的推动，不代表 ${PRODUCT} 实际采用；彩色节点表示 ${PRODUCT} 的公开能力证据。纵轴为架构层次归纳，不是性能或成熟度评分。现行文档节点只表示能力截面，虚线不表示发布先后。同一披露日期的节点按能力层次排列，不代表同日依次发布。");
    chartColumn.appendChild(chartNote);
    var detail = el("aside", "intel-route-detail intel-detail-panel");
    workspace.appendChild(chartColumn);
    workspace.appendChild(detail);

    var left = 178;
    var right = 62;
    var top = 120;
    var bottom = 112;
    var width = 1460;
    var height = 640;
    function baseXFor(node) {
      return left + ((node.timeValue - minTime) / Math.max(1, maxTime - minTime)) * (width - left - right);
    }
    function xFor(node) {
      return baseXFor(node) + (node.chartXOffset || 0);
    }
    function yFor(node) { return height - bottom - ((Number(node.阶段) - minStage) / (maxStage - minStage)) * (height - top - bottom); }

    // Date-first ordering, then level. Every route and every row is forward-only.
    const orderedNodes=nodes.slice().sort((a,b)=>a.timeValue-b.timeValue||Number(a.阶段)-Number(b.阶段)||a.route.order-b.route.order);
    const rowEnds={},routeEnds={};
    orderedNodes.forEach(n=>{const stage=Number(n.阶段),route=n.node_kind==='common'?null:n.route.id;let x=Math.max(baseXFor(n),(rowEnds[stage]??(left-30))+30,route?(routeEnds[route]??left):left);n.chartXOffset=x-baseXFor(n);rowEnds[stage]=x;if(route)routeEnds[route]=x;});
    const farthest=Math.max(...nodes.map(xFor));
    if(farthest>width-right){const scale=(width-right-left)/(farthest-left);nodes.forEach(n=>{n.chartXOffset=left+(xFor(n)-left)*scale-baseXFor(n);});}

    var pointCoordinates = {};
    nodes.forEach(function (node) { pointCoordinates[node.route_id] = { x: xFor(node), y: yFor(node), node: node }; });

    var stageStep = (height - top - bottom) / Math.max(1, stages.length - 1);
    stages.forEach(function (stage, stageIndex) {
      var y = height - bottom - ((stage.value - minStage) / (maxStage - minStage)) * (height - top - bottom);
      var bandTop = Math.max(top, y - stageStep / 2);
      var bandBottom = Math.min(height - bottom, y + stageStep / 2);
      bandLayer.appendChild(svgElement("rect", "intel-route-band " + (stageIndex % 2 ? "intel-route-band--alt" : ""), { x: left, y: bandTop, width: width - left - right, height: Math.max(0, bandBottom - bandTop), rx: "10" }));
      gridLayer.appendChild(svgElement("line", "intel-route-grid__line", { x1: left, y1: y, x2: width - right, y2: y }));
      gridLayer.appendChild(svgElement("text", "intel-route-grid__label", { x: left - 14, y: y + 4, "text-anchor": "end" }, stage.label));
    });
    var yearTicks = [];
    for (var tickYear = minTime; tickYear <= maxTime; tickYear += 2) yearTicks.push(tickYear);
    if (yearTicks[yearTicks.length - 1] !== maxTime) yearTicks.push(maxTime);
    yearTicks.forEach(function (tickValue) {
      var tickX = left + ((tickValue - minTime) / Math.max(1, maxTime - minTime)) * (width - left - right);
      gridLayer.appendChild(svgElement("line", "intel-route-grid__tick", { x1: tickX, y1: top, x2: tickX, y2: height - bottom }));
      gridLayer.appendChild(svgElement("circle", "intel-route-grid__tick-dot", { cx: tickX, cy: height - bottom, r: "3" }));
      gridLayer.appendChild(svgElement("text", "intel-route-grid__time", { x: tickX, y: height - 58, "text-anchor": "middle" }, tickValue === maxTime ? tickValue + " / 当前" : String(tickValue)));
    });
    gridLayer.appendChild(svgElement("text", "intel-route-grid__axis-title", { x: 22, y: 30 }, "技术代际 / 架构范式"));
    gridLayer.appendChild(svgElement("text", "intel-route-grid__axis-title", { x: width - right, y: height - 16, "text-anchor": "end" }, "公开年份 / 资料截面（节点避让，间距非等比例）"));

    branchRelations.forEach(function (relation) {
      var source = pointCoordinates[relation.source];
      var target = pointCoordinates[relation.target];
      if (!source || !target || target.x < source.x || target.y > source.y) return;
      var middleX = source.x + ((target.x - source.x) * .54);
      var path = svgElement("path", "intel-route-tree-branch", {
        d: "M" + source.x + " " + source.y + " C" + middleX + " " + source.y + " " + middleX + " " + target.y + " " + target.x + " " + target.y,
        fill: "none"
      });
      path.dataset.source = relation.source;
      path.dataset.target = relation.target;
      path.appendChild(svgElement("title", "", {}, relation.type + "｜通用技术推动关系，不代表产品采用"));
      branchLayer.appendChild(path);
    });

    routeForks.forEach(function (fork) {
      var source = pointCoordinates[fork.source];
      var target = pointCoordinates[fork.target];
      if (!source || !target || target.node.node_kind === "common") return;
      var childRoute = target.node.route;
      var splitX = source.x + Math.max(24, (target.x - source.x) * .48);
      var path = svgElement("path", "intel-route-fork", {
        d: "M" + source.x + " " + source.y + " C" + splitX + " " + source.y + " " + splitX + " " + target.y + " " + target.x + " " + target.y,
        fill: "none",
        stroke: childRoute.color
      });
      path.dataset.route = childRoute.id;
      path.dataset.source = fork.source;
      path.dataset.target = fork.target;
      path.appendChild(svgElement("title", "", {}, (fork.label || "路线分叉") + "｜" + source.node.节点名称 + " → " + target.node.节点名称));
      forkLayer.appendChild(path);
      if (fork.label) {
        var labelX = splitX;
        var labelY = ((source.y + target.y) / 2) - 8;
        var label = svgElement("text", "intel-route-fork__label", { x: labelX, y: labelY, "text-anchor": "middle", fill: childRoute.color }, fork.label);
        label.dataset.route = childRoute.id;
        forkLayer.appendChild(label);
      }
    });

    function evidenceShape(node) {
      if (node.node_kind === "common") return "common";
      if (node.is_key_maturity) return "focus";
      var type = String(node.evidence_type || node.节点状态 || "");
      if (type.indexOf("专利") >= 0 || type.indexOf("原理") >= 0 || type.indexOf("接口") >= 0) return "diamond";
      if (type.indexOf("演示") >= 0 || type.indexOf("验证") >= 0 || type.indexOf("测试") >= 0 || type.indexOf("演训") >= 0 || type.indexOf("试验") >= 0) return "square";
      if (type.indexOf("运行") >= 0 || type.indexOf("部署") >= 0 || type.indexOf("任务") >= 0) return "circle";
      return "hexagon";
    }

    function appendNodeSymbol(point, node, route) {
      var filled = node.节点状态.indexOf("验证") >= 0 || Number(node.阶段) >= 3 || node.evidence_level === "高";
      var attrs = { fill: filled ? route.color : "#fff", stroke: route.color, "stroke-width": "4" };
      var shape = evidenceShape(node);
      if (shape === "common") {
        point.appendChild(svgElement("circle", "intel-route-point__symbol intel-route-point__symbol--common", { r: "4.5", fill: "#fff", stroke: route.color, "stroke-width": "2" }));
      } else if (shape === "focus") {
        point.appendChild(svgElement("circle", "intel-route-point__focus-halo", { r: "17", fill: "none", stroke: route.color, "stroke-width": "3" }));
        point.appendChild(svgElement("circle", "intel-route-point__symbol intel-route-point__symbol--focus", { r: "10", fill: route.color, stroke: "#fff", "stroke-width": "3" }));
        point.appendChild(svgElement("circle", "intel-route-point__focus-core", { r: "3", fill: "#fff" }));
      } else if (shape === "diamond") {
        attrs.points = "0,-9 9,0 0,9 -9,0";
        point.appendChild(svgElement("polygon", "intel-route-point__symbol", attrs));
      } else if (shape === "square") {
        attrs.x = "-8"; attrs.y = "-8"; attrs.width = "16"; attrs.height = "16"; attrs.rx = "3";
        point.appendChild(svgElement("rect", "intel-route-point__symbol", attrs));
      } else if (shape === "hexagon") {
        attrs.points = "-9,0 -5,-8 5,-8 9,0 5,8 -5,8";
        point.appendChild(svgElement("polygon", "intel-route-point__symbol", attrs));
      } else {
        attrs.r = "8";
        point.appendChild(svgElement("circle", "intel-route-point__symbol", attrs));
      }
    }

    function createPoint(node, route) {
      var modifier = node.node_kind === "common" ? " intel-route-point--common" : (node.is_key_maturity ? " intel-route-point--focus" : " intel-route-point--milestone");
      var point = svgElement("g", "intel-route-point" + modifier, { role: "button", tabindex: "0", "aria-label": route.name + "，" + node.节点名称 + "，" + node.时间 });
      point.dataset.node = node.route_id;
      point.dataset.route = route.id;
      point.setAttribute("transform", "translate(" + xFor(node) + " " + yFor(node) + ")");
      if (node.evidence_level === "高" && node.node_kind !== "common" && !node.is_key_maturity) point.appendChild(svgElement("circle", "intel-route-point__evidence", { r: "13", fill: "none", stroke: route.color }));
      if (node.is_new) point.appendChild(svgElement("circle", "intel-route-point__pulse", { r: "18", fill: "none", stroke: route.color }));
      point.appendChild(svgElement("circle", "intel-route-point__hit", { r: node.is_key_maturity ? "26" : "20", fill: "transparent" }));
      appendNodeSymbol(point, node, route);
      point.appendChild(svgElement("text", "intel-route-point__time", { y: "-18", "text-anchor": "middle", fill: route.color }, node.时间));
      var shortTitle = node.节点名称.length > 22 ? node.节点名称.slice(0, 21) + "…" : node.节点名称;
      var labelWidth = Math.max(200, Math.min(330, shortTitle.length * 14 + 36));
      var labelOffset = Number(node.阶段) >= maxStage ? 62 : -64;
      var absoluteX = xFor(node);
      var labelShiftX = absoluteX + (labelWidth / 2) > width - 8 ? (width - 8 - absoluteX - (labelWidth / 2)) : (absoluteX - (labelWidth / 2) < 8 ? (8 - absoluteX + (labelWidth / 2)) : 0);
      var selectedLabel = svgElement("g", "intel-route-point__label", { transform: "translate(" + labelShiftX + " " + labelOffset + ")" });
      selectedLabel.appendChild(svgElement("rect", "", { x: -labelWidth / 2, y: "-28", width: labelWidth, height: "56", rx: "9", fill: "#fff", stroke: route.color, "stroke-width": "1.5" }));
      selectedLabel.appendChild(svgElement("text", "intel-route-point__label-type", { y: "-8", "text-anchor": "middle", fill: route.color }, (node.is_key_maturity ? "成熟度分析对象" : (node.evidence_type || node.节点状态)) + " · " + node.时间));
      selectedLabel.appendChild(svgElement("text", "intel-route-point__label-title", { y: "16", "text-anchor": "middle", fill: "#203b53" }, shortTitle));
      point.appendChild(selectedLabel);
      point.appendChild(svgElement("title", "", {}, node.节点名称 + "｜" + node.节点说明));
      point.addEventListener("click", function () { activateNode(node, point); });
      point.addEventListener("keydown", function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activateNode(node, point); } });
      pointLayer.appendChild(point);
      return point;
    }

    var routeGroups = {};
    var routeControls = {};
    var commonPointControls = {};
    var activeRoutes = {};
    var allRoutesControl = el("button", "intel-route-legend__item intel-route-legend__item--all");
    allRoutesControl.type = "button";
    allRoutesControl.setAttribute("aria-pressed", "true");
    allRoutesControl.title = "显示全部技术路线";
    allRoutesControl.appendChild(el("i"));
    allRoutesControl.appendChild(document.createTextNode("全部路线"));
    allRoutesControl.addEventListener("click", function () {
      stopPlayback();
      setRouteFilter(null, false);
    });
    legend.appendChild(allRoutesControl);
    routeDefinitions.forEach(function (route) {
      activeRoutes[route.id] = true;
      var seriesNodes = routeNodes.filter(function (node) { return node.route.id === route.id; }).sort(function (a, b) { return a.timeValue - b.timeValue || a.阶段 - b.阶段; });
      if (!seriesNodes.length) return;
      var group = svgElement("g", "intel-route-series");
      group.dataset.route = route.id;
      var pathData = seriesNodes.map(function (node, index) { return (index ? "L" : "M") + xFor(node) + " " + yFor(node); }).join(" ");
      seriesNodes.slice(1).forEach(function(node,i){const previous=seriesNodes[i];const snapshot=/现行|白皮书/.test(node.时间)||/现行|白皮书/.test(previous.时间);group.appendChild(svgElement("path","intel-route-series__path",{d:"M"+xFor(previous)+" "+yFor(previous)+" L"+xFor(node)+" "+yFor(node),fill:"none",stroke:route.color,"stroke-width":"2.6","stroke-opacity":snapshot?".52":".78","stroke-dasharray":snapshot?"3 5":"none","stroke-linecap":"round","stroke-linejoin":"round"}));});
      lineLayer.appendChild(group);
      routeGroups[route.id] = { line: group, points: [] };

      seriesNodes.forEach(function (node) {
        var point = createPoint(node, route);
        routeGroups[route.id].points.push(point);
      });

      var control = el("button", "intel-route-legend__item");
      control.type = "button";
      control.setAttribute("aria-pressed", "false");
      control.title = "只看“" + route.name + "”路线";
      control.style.setProperty("--route-color", route.color);
      var dot = el("i"); dot.style.background = route.color;
      control.appendChild(dot);
      control.appendChild(document.createTextNode(route.name));
      if (route.focus_branch) control.appendChild(el("small", "", "研究分支"));
      control.addEventListener("click", function () {
        stopPlayback();
        setRouteFilter(route.id, true);
      });
      routeControls[route.id] = control;
      legend.appendChild(control);
    });
    commonNodes.forEach(function (node) { commonPointControls[node.route_id] = createPoint(node, commonRoute); });

    var showRelations = true;
    var selectedNode = null;
    var playbackTimer = null;

    function setSvgVisibility(element, visible) {
      element.hidden = !visible;
      element.classList.toggle("is-filtered-out", !visible);
      element.style.display = visible ? "" : "none";
    }

    function activateNode(node, point) {
      stopPlayback();
      if (node.node_kind !== "common") setRouteFilter(node.route.id, false);
      selectNode(node, point);
    }

    function setRouteFilter(routeId, focusRoute) {
      var showAll = !routeId || !routeGroups[routeId];
      legend.classList.toggle("is-filtered", !showAll);
      allRoutesControl.setAttribute("aria-pressed", showAll ? "true" : "false");
      Object.keys(routeGroups).forEach(function (id) {
        var visible = showAll || id === routeId;
        activeRoutes[id] = visible;
        setSvgVisibility(routeGroups[id].line, visible);
        routeGroups[id].points.forEach(function (point) { setSvgVisibility(point, visible); });
        if (routeControls[id]) routeControls[id].setAttribute("aria-pressed", !showAll && id === routeId ? "true" : "false");
      });
      Array.prototype.forEach.call(branchLayer.querySelectorAll(".intel-route-tree-branch"), function (path) {
        var target = pointCoordinates[path.dataset.target];
        setSvgVisibility(path, showAll || (target && target.node.route.id === routeId));
      });
      Array.prototype.forEach.call(forkLayer.querySelectorAll("[data-route]"), function (item) {
        setSvgVisibility(item, showAll || item.dataset.route === routeId);
      });
      Object.keys(commonPointControls).forEach(function (commonId) {
        var supportsSelectedRoute = branchRelations.some(function (relation) {
          var target = pointCoordinates[relation.target];
          return relation.source === commonId && target && target.node.route.id === routeId;
        });
        setSvgVisibility(commonPointControls[commonId], showAll || supportsSelectedRoute);
      });
      if (!showAll && focusRoute !== false) {
        var candidates = routeNodes.filter(function (node) { return node.route.id === routeId; }).sort(function (a, b) { return a.timeValue - b.timeValue || a.阶段 - b.阶段; });
        var targetNode = candidates.find(function (node) { return node.is_key_maturity; }) || candidates[candidates.length - 1];
        var targetControl = targetNode ? pointLayer.querySelector('[data-node="' + targetNode.route_id + '"]') : null;
        if (targetNode && targetControl) selectNode(targetNode, targetControl);
      } else {
        drawRelations(selectedNode);
      }
    }

    function drawRelations(node) {
      relationLayer.replaceChildren();
      if (!showRelations || !node) return;
      relations.filter(function (relation) { return relation.source === node.route_id || relation.target === node.route_id; }).forEach(function (relation) {
        var source = pointCoordinates[relation.source];
        var target = pointCoordinates[relation.target];
        if (!source || !target || target.x < source.x || target.y > source.y || !activeRoutes[source.node.route.id] || !activeRoutes[target.node.route.id]) return;
        var middleX = (source.x + target.x) / 2;
        var curve = "M" + source.x + " " + source.y + " C" + middleX + " " + source.y + " " + middleX + " " + target.y + " " + target.x + " " + target.y;
        relationLayer.appendChild(svgElement("path", "intel-route-relation", { d: curve, fill: "none", stroke: "#64748b", "stroke-width": "2", "stroke-dasharray": "7 6", "marker-end": "url(#intel-route-arrow)" }));
        relationLayer.appendChild(svgElement("text", "intel-route-relation__label", { x: middleX, y: ((source.y + target.y) / 2) - 7, "text-anchor": "middle" }, relation.type));
      });
    }

    function selectNode(node, control) {
      selectedNode = node;
      ctx.state.routeNode = node.route_id;
      pointLayer.querySelectorAll('.intel-route-point').forEach(p => p.classList.toggle('is-selected', p === control));
      branchLayer.querySelectorAll('.intel-route-tree-branch').forEach(p => p.classList.toggle('is-active', p.dataset.source === node.route_id || p.dataset.target === node.route_id));
      detail.innerHTML = `<span class="intel-kicker">${escape(node.route.name)} · ${escape(node.时间)}</span><h3>${escape(node.节点名称)}</h3><p>${escape(node.节点说明)}</p><div class="intel-route-detail__badges"><span class="topic-status">${escape(node.evidence_type)}</span><span class="topic-status">${escape(stages.find(s=>s.value===node.阶段)?.label)}</span></div><div class="intel-route-progression">${[['功能服务',node.route.service],['核心技术',node.route.technology],['判断边界',node.boundary]].map(([k,v],i)=>`<article class="intel-route-progression__item"><span>0${i+1} · ${k}</span><p>${escape(v)}</p></article>`).join('')}</div><article class="intel-route-evidence-card"><strong>公开依据</strong>${ctx.sourceList(node.sources||[])}</article>`;
      if(node.eventId){const eventButton=el('button','topic-button','查看完整事件依据 →');eventButton.dataset.act='event';eventButton.dataset.id=node.eventId;detail.appendChild(eventButton);}
      if(node.repositories?.length){detail.appendChild(el('h3','','相关开源实现'));node.repositories.forEach(r=>{const box=el('div','intel-route-evidence-card');box.innerHTML=`<strong>${escape(r.project)}</strong><p>${escape(r.note)}</p><code>${escape(r.code)}</code>${ctx.sourceList([r.source])}`;detail.appendChild(box);});}
      detail.appendChild(el('small','intel-route-detail__note','技术代际为研究归纳；公共技术关联不证明产品采用。现行文档节点不代表首次发布。'));
      drawRelations(node);
    }

    function toggleRelations() {
      showRelations = !showRelations;
      relationToggle.setAttribute("aria-pressed", showRelations ? "true" : "false");
      relationToggle.textContent = showRelations ? "隐藏跨路线关系" : "显示跨路线关系";
      drawRelations(selectedNode);
    }

    function stopPlayback() {
      if (!playbackTimer) return;
      window.clearInterval(playbackTimer);
      playbackTimer = null;
      playButton.disabled = false;
      playButton.textContent = "重新播放";
    }

    function playEvolution() {
      stopPlayback();
      setRouteFilter(null, false);
      var ordered = nodes.slice().sort(function (a, b) { return a.timeValue - b.timeValue || a.阶段 - b.阶段; });
      var index = 0;
      playButton.disabled = true;
      playButton.textContent = "演化播放中 1 / " + ordered.length;
      var firstControl = pointLayer.querySelector('[data-node="' + ordered[0].route_id + '"]');
      selectNode(ordered[0], firstControl);
      playbackTimer = window.setInterval(function () {
        if (!mount.isConnected) { stopPlayback(); return; }
        index += 1;
        if (index >= ordered.length) { stopPlayback(); return; }
        playButton.textContent = "演化播放中 " + (index + 1) + " / " + ordered.length;
        var control = pointLayer.querySelector('[data-node="' + ordered[index].route_id + '"]');
        selectNode(ordered[index], control);
      }, 720);
    }

    var routeSection = section("关键技术树与路线演化图", "主干和分支共同展示通用研究、公共技术、路线里程碑与当前研究对象；同代等高、同刻横向错开；文档截面不代表首发。", workspace, actions);
    panel.appendChild(routeSection);
    var requestedFocus = ctx.state.routeNode;
    var initialNode = nodes.find(function (node) { return node.route_id === requestedFocus; }) || nodes.find(function (node) { return node.route_id === "R022"; }) || nodes[0];
    var initialControl = pointLayer.querySelector('[data-node="' + initialNode.route_id + '"]');

    if (initialNode && initialControl) selectNode(initialNode, initialControl);
    panel.classList.add("topic-route-reference");
    mount.replaceChildren(panel);
    return stopPlayback;
  }


 // Reference event graph: compact semantic layers, badges at first evidence,
 // first-to-last lifelines, explicit event endpoints, fit / actual size.
 function renderGraph(mount,ctx){
  const {key,product,graph,state}=ctx;
  const referenceWidth=1540,header=84;
  const layout={},rows={};let bottom=header;
  graph.layers.forEach((layer,i)=>{const objects=graph.objects.filter(o=>o.layer===layer.id);const height=Math.max(78,objects.length*40+26);layout[layer.id]={y:bottom,height,objects,index:i};objects.forEach((o,j)=>rows[o.id]=bottom+30+j*40);bottom+=height;});
  const historic=graph.events.filter(e=>key!=='gotham'||(e.id!=='G-M01'&&e.year!==2026.75));
  const snapshots=key==='gotham'?graph.events.filter(e=>e.year===2026.75):[];
  const visibleEvents=[...historic,...snapshots];
  // The original relation data expresses capability association, not dated evolution.
  // Bind only statements with named public evidence. Keep these dashed.
  const links=key==='gotham'?[
   ['G-H20G','G-H20R','S-1 Graph 对象解析'],['G-H20A','G-H20M','S-1 Mobile 与 Gaia 原生协作'],['G-H20FW','G-H20M','S-1 Mobile 与 Forward 原生协作'],
   ['G-M04','G-M06','对象资源与解析 · 接口机制归纳'],['G-M08','G-M09','地图与轨迹 · 时空能力归纳'],['G-M14','G-M12','Defense OSDK 领域接口'],['G-M16','G-M13','集成资料中的安全标记传递']
  ]:[['M01','M04','视觉需求与人员核验 · 案例归纳'],['M07','M11','军种扩展与组件清单 · 范围不同'],['M15','M19','开放接入与协同试验 · 机制关联']];
  const root=el('div','fsg-root topic-event-reference');
  root.innerHTML=`<section class="fsg-context"><div class="fsg-context__item"><span class="fsg-context__label">专题对象</span><strong class="fsg-context__value">${escape(product.fullName)}</strong></div><div class="fsg-context__item"><span class="fsg-context__label">阅读方式</span><strong class="fsg-context__value">按层看对象 · 按时间看证据</strong></div><div class="fsg-context__metrics"><span class="fsg-count">${graph.objects.length} 个对象</span><span class="fsg-count">${visibleEvents.length} 个图内证据节点</span></div></section>`;
  const toolbar=el('div','fsg-toolbar');const label=el('label','','检索对象或事件 ');const input=el('input','fsg-search');input.id='graph-search';input.value=state.graphSearch||'';input.placeholder='名称、日期或事件';label.append(input);toolbar.append(label);
  toolbar.append(button('适应窗口','secondary',()=>{state.graphActual=false;draw();}),button('原始比例','secondary',()=>{state.graphActual=true;draw();}),button(state.graphRelations===false?'显示关系线':'隐藏关系线','secondary',()=>{state.graphRelations=state.graphRelations===false;renderGraph(mount,ctx);}));root.append(toolbar);
  const legend=el('div','fsg-legend');legend.innerHTML='<span class="fsg-legend__item"><i class="fsg-legend__sample fsg-legend__sample--object"></i>能力对象</span><span class="fsg-legend__item"><i class="fsg-legend__sample fsg-legend__sample--event"></i>公开证据</span><span class="fsg-legend__item"><i class="fsg-legend__sample fsg-legend__sample--evolution"></i>同一对象的时间线</span><span class="fsg-legend__item"><i class="fsg-legend__sample fsg-legend__sample--association"></i>接口或机制关联</span>';root.append(legend);
  const frame=el('div','fsg-frame'),grid=el('div','fsg-graph-grid'),rail=el('aside','fsg-layer-rail');
  rail.style.height=bottom+'px';
  rail.innerHTML=`<div class="fsg-layer-rail__corner" style="height:${header}px"><span class="fsg-layer-rail__corner-label">能力层级</span><strong>公开资料逻辑重组</strong></div>`+graph.layers.map((l,i)=>`<section class="fsg-layer" style="height:${layout[l.id].height}px"><div class="fsg-layer__heading"><span class="fsg-layer__index">0${i+1}</span><strong class="fsg-layer__title">${escape(l.label)}</strong></div><span class="fsg-layer__english">${escape(l.en)}</span></section>`).join('');
  const scroller=el('div','fsg-scroll');scroller.style.height=bottom+'px';grid.append(rail,scroller);frame.append(grid);root.append(frame);
  root.append(el('p','fsg-method-note',key==='gotham'?'2003 年为公司创立背景，不作为 Gotham 首发事件。左侧为 2008 年发布回溯及 2020—2026 年有日期的公开证据（2020 年前后采用不同时间尺度，回溯年份不等于首发），右侧为截至 2026 年 9 月的现行文档截面；右侧节点不代表首次发布。空白表示暂缺该时期的可核查节点。':'Project Maven 是需求背景。时间线表示公开证据日期，不代表版本发布；不同军种、NATO 实例与采购范围分别保留在节点详情中。'));
  mount.replaceChildren(root);
  function draw(){
   const width=state.graphActual?referenceWidth:Math.max(700,scroller.clientWidth||1000);scroller.classList.toggle('is-actual-size',!!state.graphActual);
   const svg=svgElement('svg','fsg-svg',{viewBox:`0 0 ${width} ${bottom}`,width,height:bottom,role:'img','aria-label':product.name+' 分层事件图谱'});svg.style.width=width+'px';svg.style.height=bottom+'px';
   const xStart=key==='gotham'?112:160,xEnd=key==='gotham'?width*.76:width-40;
   const timeX=year=>key==='gotham'?(year<2020?xStart+(year-2008)/12*(width*.36-xStart):width*.36+(year-2020)/6.5*(xEnd-width*.36)):xStart+(year-2017)/10*(xEnd-xStart);
   const positions={},byObject={};visibleEvents.slice().sort((a,b)=>a.year-b.year).forEach(e=>{const list=byObject[e.object]||(byObject[e.object]=[]);const duplicate=list.filter(p=>p.event.year===e.year).length;const p={x:snapshots.includes(e)?width-72:timeX(e.year)+duplicate*18,y:rows[e.object],event:e,eventIndex:list.length,duplicateIndex:duplicate};positions[e.id]=p;list.push(p);});
   graph.layers.forEach(l=>{const g=layout[l.id];svg.append(svgElement('rect','fsg-svg-layer--'+(g.index%2?'even':'odd'),{x:0,y:g.y,width,height:g.height}),svgElement('line','fsg-svg-layer-rule',{x1:0,y1:g.y+g.height,x2:width,y2:g.y+g.height}));});
   const stages=key==='gotham'?[{x:0,w:width*.80,t:'2008—2026 历史方向、项目与披露'},{x:width*.80,w:width*.20,t:'现行能力截面 · 非首发'}]:[{x:0,w:timeX(2021),t:'需求与平台形成'},{x:timeX(2021),w:timeX(2025)-timeX(2021),t:'流程验证与采购'},{x:timeX(2025),w:width-timeX(2025),t:'军种与联盟扩展'}];
   stages.forEach((s,i)=>svg.append(svgElement('rect','fsg-svg-stage--'+(i%2?'even':'odd'),{x:s.x,y:0,width:s.w,height:39}),svgElement('text','fsg-svg-stage-label',{x:s.x+12,y:25},s.t)));
   const ticks=key==='gotham'?[2008,2013,2017,2020,2022,2024,2026]:[2017,2019,2021,2023,2025,2027];ticks.forEach(year=>svg.append(svgElement('line','fsg-svg-year-line',{x1:timeX(year),y1:39,x2:timeX(year),y2:bottom}),svgElement('text','fsg-svg-year',{x:timeX(year),y:66,'text-anchor':'middle'},year)));
   if(key==='gotham'){svg.append(svgElement('rect','topic-snapshot-band',{x:width*.80,y:39,width:width*.20,height:bottom-39}),svgElement('text','fsg-svg-year',{x:width*.90,y:66,'text-anchor':'middle'},'资料截面 · 2026-09'));}
   
   svg.append(svgElement('line','fsg-svg-header-rule',{x1:0,y1:header,x2:width,y2:header}));
   if(state.graphRelations!==false)links.forEach(([from,to,text])=>{const a=positions[from],b=positions[to];if(!a||!b)return;const bend=Math.min(58,Math.max(28,Math.abs(b.y-a.y)*.34));const path=svgElement('path','fsg-relation fsg-relation--association',{d:`M${a.x},${a.y} C${a.x+bend},${a.y} ${b.x+bend},${b.y} ${b.x},${b.y}`});path.append(svgElement('title','',{},text));svg.append(path);});
   graph.objects.forEach(o=>{
    const list=byObject[o.id]||[],first=list[0],last=list[list.length-1];
    if(list.length>1)svg.append(svgElement('line','fsg-lifeline',{x1:first.x,y1:rows[o.id],x2:last.x,y2:rows[o.id]}));
    const nodeWidth=Math.max(64,Math.min(178,Array.from(o.name).reduce((n,c)=>n+(/[\u4e00-\u9fff]/.test(c)?13:7),0)+20));
    const x=first?Math.max(4,first.x-16-nodeWidth):width-230;
    const group=svgElement('g','fsg-object-node'+(state.graphSearch&&o.name.toLowerCase().includes(state.graphSearch.toLowerCase())?' is-highlighted':''),{'data-act':'object','data-id':o.id,tabindex:0,role:'button','aria-label':o.name+' 对象详情'});
    group.append(svgElement('rect','fsg-object-node__rect',{x,y:rows[o.id]-10,width:nodeWidth,height:20,rx:3}),svgElement('text','fsg-object-node__text',{x:x+nodeWidth/2,y:rows[o.id]+4,'text-anchor':'middle'},o.name),svgElement('title','',{},o.name));
    if(first)svg.append(svgElement('line','fsg-object-connector',{x1:x+nodeWidth,y1:rows[o.id],x2:first.x-6,y2:rows[o.id]}));
    else group.append(svgElement('text','fsg-event__date',{x:x+nodeWidth/2,y:rows[o.id]+25,'text-anchor':'middle'},'暂无独立日期'));
    svg.append(group);
   });
   Object.values(positions).forEach(p=>{const e=p.event,hit=state.graphSearch&&`${e.id} ${e.title} ${e.date}`.toLowerCase().includes(state.graphSearch.toLowerCase());const group=svgElement('g','fsg-event'+(hit?' is-highlighted':''),{'data-act':'event','data-id':e.id,tabindex:0,role:'button','aria-label':e.date+' '+e.title});group.append(svgElement('title','',{},e.date+'｜'+e.title),svgElement('circle','fsg-event__hit',{cx:p.x,cy:p.y,r:15}),svgElement('circle','fsg-event__node',{cx:p.x,cy:p.y,r:6}));if(p.duplicateIndex===0&&!snapshots.includes(e))group.append(svgElement('text','fsg-event__date',{x:p.x,y:p.y+(p.eventIndex%2?17:-11),'text-anchor':'middle'},e.date));svg.append(group);});
   scroller.replaceChildren(svg);
  }
  draw();let resize=new ResizeObserver(()=>{if(!mount.isConnected){resize.disconnect();return;}draw();});resize.observe(scroller);
  return ()=>resize.disconnect();
 }
 return {renderGraph(c,ctx){if(cleanup)cleanup();cleanup=renderGraph(c,ctx);},renderRoutes(c,ctx){if(cleanup)cleanup();productLabel=ctx.product.name;cleanup=renderRoutes(c,ctx);}};

})();
