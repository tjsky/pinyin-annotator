#!/usr/bin/env node
// 只给 CI 的 dist 分支注入访问统计，main 源码与 Release zip 保持干净。
//
// 为什么不在 template.html / index.html 里硬编码：
//   1. 别人 fork 后自部署，会往维护者的 Umami 上报，等于替别人记账；
//   2. 硬编码会让「本地 node build.js」与「CI 构建」不再逐字节一致，
//      而这条一致性是这个项目用来核对线上产物的手段。
//
// 注入只发生在 dist 目录：build.js 的输出（仓库根目录 + Release zip）完全不受影响，
// 因此 build.js 的字节可复现性原样保留。
//
// 用法：
//   node inject-analytics.js dist                                   # 未设 ID，直接跳过
//   UMAMI_WEBSITE_ID=<uuid> UMAMI_HOST=https://a.example.net \
//     node inject-analytics.js dist                                 # 注入
//
// 环境变量：
//   UMAMI_WEBSITE_ID    Umami 里网站的 UUID，未设置则整体跳过（fork 后默认就是未设置）
//   UMAMI_HOST          Umami 站点根地址，如 https://analytics.example.net
//   UMAMI_SCRIPT_NAME   tracker 文件名，需与实例的 TRACKER_SCRIPT_NAME 一致，默认 script.js

const fs = require("fs");
const path = require("path");

const dir = process.argv[2] || "dist";
const id = (process.env.UMAMI_WEBSITE_ID || "").trim();
const host = (process.env.UMAMI_HOST || "").trim().replace(/\/+$/, "");
const scriptName = (process.env.UMAMI_SCRIPT_NAME || "script.js").trim().replace(/^\/+/, "");

if (!id) {
  console.log("[analytics] UMAMI_WEBSITE_ID 未设置，跳过注入（dist 与源码产物完全一致）");
  process.exit(0);
}
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
  console.error("[analytics] UMAMI_WEBSITE_ID 不是合法 UUID：" + id);
  process.exit(1);
}
if (!/^https?:\/\/[^/]+$/.test(host)) {
  console.error("[analytics] UMAMI_HOST 需要是站点根地址（不带路径与结尾斜杠），如 https://analytics.example.net");
  process.exit(1);
}

// 标记用于幂等：重复执行不会叠第二次
const MARK = "<!--analytics-->";
// 用 file: 协议打开时（有人把网页另存为本地文件）不加载，避免上报出 hostname 为空的数据
const snippet =
  MARK +
  "<script>(function(){if(location.protocol===\"file:\")return;" +
  "var s=document.createElement(\"script\");s.defer=1;" +
  "s.src=" + JSON.stringify(host + "/" + scriptName) + ";" +
  "s.setAttribute(\"data-website-id\"," + JSON.stringify(id) + ");" +
  "s.setAttribute(\"data-host-url\"," + JSON.stringify(host) + ");" +
  "document.head.appendChild(s)})()</script>";

if (!fs.existsSync(dir)) {
  console.error("[analytics] 目录不存在：" + dir);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(function (f) { return /\.html$/i.test(f); });
if (!files.length) {
  console.error("[analytics] " + dir + " 下没有 HTML 文件");
  process.exit(1);
}

let done = 0;
for (const f of files) {
  const p = path.join(dir, f);
  let html = fs.readFileSync(p, "utf8");
  if (html.indexOf(MARK) !== -1) {
    console.log("[analytics] 已注入，跳过 " + f);
    continue;
  }
  const at = html.lastIndexOf("</head>");
  if (at === -1) {
    console.error("[analytics] " + f + " 找不到 </head>，跳过");
    continue;
  }
  fs.writeFileSync(p, html.slice(0, at) + snippet + html.slice(at));
  done++;
  console.log("[analytics] 已注入 " + f);
}
console.log("[analytics] 完成：" + done + " / " + files.length + " 个文件");
