// 构建脚本：从 template.html 生成四个发布版本
//  - mini.html    轻量版（无分词词典，隐藏分词控件，体积更小）
//  - pinyin.html  主线版（内嵌现代汉语常用词典 top3万，智能分词可用；简体用户默认入口）
//  - plus.html    完整词典版（内嵌 complete 全量词典 33.7万词 + OpenCC 简↔繁转换）
//  - zhuyin.html  注音版（默认繁体界面 + 注音 + 台湾读音 + OpenCC，面向港澳台用户）
// index.html 不由本脚本生成：它是版本选择/落地页（SEO 承接 + 记忆跳转 + Plus 加载进度条），手工维护
// 注入点（template.html 中的占位注释）：
//  - /*__ANDIKA_FACE__*/  内置 Andika 拼音字体 @font-face（woff2 base64，fonts/andika-face.css.txt）
//  - /*__BPMF_FACE__*/    内置注音符号字体 @font-face（Noto Sans TC 子集，woff2 base64）
//  - /*__PINYIN_PRO__*/   pinyin-pro 引擎完整代码（内嵌，离线可用，vendor/engine-3.29.5.js）
//  - /*__PY2ZY__*/        拼音→注音 转换算法（vendor/py2zy.snippet.js）
//  - /*__SEG_DICT__*/null 分词词典 base64（pinyin/plus/zhuyin 注入对应词典，mini 保持 null）
//  - /*__TW_DIFF__*/null  台湾读音差异表 base64（萌典数据 diff 产物，含简繁双键，全版本注入）
//  - /*__OPENCC__*/null   OpenCC full.js UMD（gzip+base64，仅 zhuyin/plus 注入）
//  - /*__VARIANT__*/null  构建变体默认值 JSON（zhuyin: 繁体界面/注音/台湾读音/opencc）
// 构建版本号：手工维护，发版时随 tag 递增；注入为每个产物 head 内的隐藏注释 <!--build:x.y.z>，
// 用于部署验证——curl 任一线上页面 grep 该串即可确认平台是否在服务最新 dist（固定常量保证产物逐字节可复现）。
const BUILD_VERSION = "v1.8.0";
//  - <!--__SEO_META__-->  各版本 SEO meta（canonical / og 标签，按版本注入）
const fs = require("fs");
const path = require("path");

const root = __dirname;
const template = fs.readFileSync(path.join(root, "template.html"), "utf8");

// 1) Andika @font-face 块（:root 之前，已资产化）
const andikaBlock = fs.readFileSync(path.join(root, "fonts", "andika-face.css.txt"), "utf8");

// 2) pinyin-pro 引擎代码（与运行时一致的 3.29.5 UMD）
const engineCode = fs.readFileSync(path.join(root, "vendor", "engine-3.29.5.js"), "utf8").trim();

// 3) 分词词典 base64
const zlib = require("zlib");
// —— 「一 / 不」变调修正 ——
// 上游 complete.json 词条里的「一 / 不」标注不一致：常用词已按变调标注（一样 yí、一见钟情 yí），
// 但大量词条保留原调（一小 yī、第一次 dì yī）。引擎对「词典命中的词组」直接采用词条注音、
// 不再套用字级变调规则，导致「一小盘点心」标成 yī。构建时按变调规则改写词条内音节：
//   一：四声前读 yí，一 / 二 / 三声前读 yì；词末、后接「一 / 不」或「的而之后也还是」保持原调；
//   不：四声前读 bú，其余读 bù；词末、后接「一」或「的而之后也还地」保持原调；
//   V一V / A不A 叠词中间读轻声（yi / bu）。
// 保守边界：含 ≥2 个「一」（或 ≥2 个「不」）的词条视为上游已人工校对（一一对应、一对一、
// 一心一意等固定语原调是有意的），整条跳过，避免把词典既定标注改错。
const SANDHI_STOP = { "一": "的而之后也还是", "不": "的而之后也还地" };
function sylTone(s) {
  if (/[āōēīūǖē]/.test(s)) return 1;
  if (/[áóéíúǘ]/.test(s)) return 2;
  if (/[ǎǒěǐǔǚ]/.test(s)) return 3;
  if (/[àòèìùǜ]/.test(s)) return 4;
  return 0;   // 轻声 / 无调号
}
function fixSandhiTSV(b64) {
  const tsv = zlib.gunzipSync(Buffer.from(b64, "base64")).toString("utf8");
  const lines = tsv.split("\n");
  let fixed = 0;
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (line.indexOf("一") === -1 && line.indexOf("不") === -1) continue;
    const f = line.split("\t");
    if (f.length < 2 || !f[1]) continue;
    const chars = Array.from(f[0]);
    const syls = f[1].split(" ");
    if (syls.length !== chars.length) continue;   // 儿化等不对齐词条不动
    let nYi = 0, nBu = 0;
    for (const c of chars) { if (c === "一") nYi++; else if (c === "不") nBu++; }
    if (nYi >= 2 || nBu >= 2) continue;           // 多「一 / 不」词条视为已校对
    let changed = false;
    for (let i = 0; i < chars.length - 1; i++) {
      const ch = chars[i];
      if (ch !== "一" && ch !== "不") continue;
      const cur = syls[i];
      const isYi = ch === "一";
      if (isYi ? ["yī", "yí", "yì"].indexOf(cur) < 0 : ["bù", "bú"].indexOf(cur) < 0) continue;  // 已轻声 / 异形不动
      const nextCh = chars[i + 1];
      if (SANDHI_STOP[ch].indexOf(nextCh) >= 0) continue;            // 例外后字 → 原调
      if (nextCh === "一" || nextCh === "不") continue;              // 说一不二 / 一一 → 原调
      const t = sylTone(syls[i + 1]);
      let exp = "";
      if (i > 0 && chars[i - 1] === nextCh && nextCh !== ch) exp = isYi ? "yi" : "bu";   // V一V / A不A → 轻声
      else if (t === 4) exp = isYi ? "yí" : "bú";
      else if (isYi && t >= 1 && t <= 3) exp = "yì";
      if (exp && exp !== cur) { syls[i] = exp; changed = true; }
    }
    if (changed) { f[1] = syls.join(" "); lines[li] = f.join("\t"); fixed++; }
  }
  console.log("  一/不变调修正: " + fixed + " 条词条被改写");
  return zlib.gzipSync(Buffer.from(lines.join("\n"), "utf8")).toString("base64");
}
const segB64 = fixSandhiTSV(fs.readFileSync(path.join(root, "seg-dict", "segdict.b64.txt"), "utf8").trim());
const segB64Complete = fixSandhiTSV(fs.readFileSync(path.join(root, "seg-dict", "segdict-complete.b64.txt"), "utf8").trim());

// 3.4) 台湾读音差异表 base64（教育部《重編國語辭典修訂本》/ g0v 萌典，构建期 diff 生成，简繁双键）
const twDiffB64 = fs.readFileSync(path.join(root, "seg-dict", "twdiff.b64.txt"), "utf8").trim();

// 3.5) 注音符号字体 @font-face（Noto Sans TC 子集：37 注音符号 + 调号，woff2 base64）
const bpmfB64 = fs.readFileSync(path.join(root, "fonts", "bpmf-face.b64.txt"), "utf8").trim();
const bpmfBlock = [
  "  /* 注音符号字体：Noto Sans TC 子集（ㄅ-ㄩ + 调号 ˉˊˇˋ˙），仅 4.4KB，SIL OFL 授权 */",
  "  @font-face {",
  '    font-family: "BpmfSubset";',
  "    font-style: normal;",
  "    font-weight: 400;",
  "    src: url(data:font/woff2;base64," + bpmfB64 + ') format("woff2");',
  "  }",
  ""
].join("\n");

// 3.6) 拼音→注音 转换算法（snippet 去掉 CommonJS 导出尾部后原样内嵌）
const py2zyCode = fs.readFileSync(path.join(root, "vendor", "py2zy.snippet.js"), "utf8")
  .replace(/if \(typeof module[\s\S]*$/, "");

// 3.7) OpenCC full.js UMD（gzip+base64，简↔繁转换；nk2028/opencc-js，Apache-2.0）
const openccB64 = fs.readFileSync(path.join(root, "seg-dict", "opencc.b64.txt"), "utf8").trim();
const jyutDictB64 = fs.readFileSync(path.join(root, "seg-dict", "jyutdict.b64.txt"), "utf8").trim();

// 3.8) 注音芫荽 IVS 读音表（bpmfvs 规格phonic_table_Z 产物，构建期由 seg-dict/gen-bpmf-ivs.py 生成；
//      仅注音版注入——「HTML+CSS 注音」格式直排 + BpmfIansui 字体时按 IVS 写入正确读音）
const bpmfIvsData = fs.readFileSync(path.join(root, "seg-dict", "bpmf-ivs.json"), "utf8").trim();

// 4) 各版本 SEO meta（canonical 指向主部署域名）
const SITE = "https://pinyin-annotator.tjsky.net";
const COMMON_DESC = "把文章一键转成汉字上方带拼音或注音的读物：教材式排版、一/不变调、轻声儿化自动处理、A4 分页打印导出，纯本地运行离线可用，专为幼儿园到小学低年级孩子做朗读材料。";
function seoMeta(file, label, desc) {
  const url = SITE + "/" + file;
  return [
    '<meta name="description" content="' + desc + '">',
    '<link rel="canonical" href="' + url + '">',
    '<meta property="og:title" content="拼音注音小助手 · ' + label + '">',
    '<meta property="og:description" content="' + desc + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:url" content="' + url + '">'
  ].join("\n");
}
const SEO = {
  "mini.html": seoMeta("mini.html", "轻量版", "拼音注音小助手轻量版（约 0.9 MB）：固定逐字注音，不内置分词词典，" + COMMON_DESC),
  "pinyin.html": seoMeta("pinyin.html", "主线版", "拼音注音小助手主线版：内置约 3 万常用词词典，支持智能分词（词组连排注音、手动断词合词）。" + COMMON_DESC),
  "plus.html": seoMeta("plus.html", "完整词典版", "拼音注音小助手完整词典版：内嵌 33.7 万词全量词典与 OpenCC 简↔繁转换，成语、专有名词等长尾词也能整体成词，分词更准。" + COMMON_DESC),
  "zhuyin.html": seoMeta("zhuyin.html", "注音版", "拼音注音小助手注音版：預設繁體介面、注音符號（ㄅㄆㄇ，橫排 / 直排）與臺灣讀音（教育部《重編國語辭典修訂本》），內建 OpenCC 簡↔繁轉換與智慧分詞。" + COMMON_DESC),
  "jyutping.html": seoMeta("jyutping.html", "粵語版", "拼音注音小助手粵語版：給粵語母語的孩子標漢字讀音，粵拼（Jyutping）標注、9.4 萬粵語詞表定音、簡繁與港台用字轉換。這不是普通話翻粵語的翻譯工具。" + COMMON_DESC)
};

// 5) 构建变体默认值（zhuyin 版差异化：繁体界面 + 注音 + 台湾读音 + OpenCC）
const VARIANT = {
  "mini.html": null,
  "pinyin.html": null,
  "plus.html": { opencc: true },
  "zhuyin.html": { lang: "tw", tw: true, ph: "zy", opencc: true },
  /* 粤拼版：繁体界面（香港用繁体）、粤拼引擎、OpenCC 三地转换。
     lang 暂用 tw 包 —— 香港用字（説/裏/衞）与台湾（說/裡/衛）有别，
     界面文案待补第四套 hk 包；正文用字由 OpenCC 的 s2hk 负责，不受影响。 */
  "jyutping.html": { lang: "tw", jyut: true, opencc: true }
};

function build(file, segDictB64, opencc, jyut) {
  let out = template.replace("/*__ANDIKA_FACE__*/", () => andikaBlock);
  out = out.replace("/*__BPMF_FACE__*/", () => bpmfBlock);
  out = out.replace("/*__PINYIN_PRO__*/", () => engineCode);
  out = out.replace("/*__PY2ZY__*/", () => py2zyCode);
  out = out.replace("/*__SEG_DICT__*/null", () => segDictB64 ? JSON.stringify(segDictB64) : "null");
  out = out.replace("/*__TW_DIFF__*/null", () => JSON.stringify(twDiffB64));
  out = out.replace("/*__OPENCC__*/null", () => opencc ? JSON.stringify(openccB64) : "null");
  out = out.replace("/*__JYUTDICT__*/null", () => jyut ? JSON.stringify(jyutDictB64) : "null");
  out = out.replace("/*__BPMF_IVS__*/null", () => file === "zhuyin.html" ? bpmfIvsData : "null");
  out = out.replace("/*__VARIANT__*/null", () => JSON.stringify(VARIANT[file] || null));
  out = out.replace("<!--__SEO_META__-->", () => SEO[file] + "<!--build:" + BUILD_VERSION + "-->");
  if (out.indexOf("__ANDIKA_FACE__") !== -1 || out.indexOf("__PINYIN_PRO__") !== -1 || out.indexOf("__SEG_DICT__") !== -1 || out.indexOf("__SEO_META__") !== -1 || out.indexOf("__BPMF_FACE__") !== -1 || out.indexOf("__PY2ZY__") !== -1 || out.indexOf("__TW_DIFF__") !== -1 || out.indexOf("__OPENCC__") !== -1 || out.indexOf("__JYUTDICT__") !== -1 || out.indexOf("__VARIANT__") !== -1 || out.indexOf("__BPMF_IVS__") !== -1) {
    throw new Error("存在未替换的注入占位符");
  }
  return out;
}

fs.writeFileSync(path.join(root, "mini.html"), build("mini.html", null, false, false));
fs.writeFileSync(path.join(root, "pinyin.html"), build("pinyin.html", segB64, false, false));
fs.writeFileSync(path.join(root, "plus.html"), build("plus.html", segB64Complete, true, false));
fs.writeFileSync(path.join(root, "zhuyin.html"), build("zhuyin.html", segB64, true, false));
fs.writeFileSync(path.join(root, "jyutping.html"), build("jyutping.html", segB64, true, true));
console.log("build ok:",
  fs.statSync(path.join(root, "pinyin.html")).size, "bytes (pinyin 主线版),",
  fs.statSync(path.join(root, "mini.html")).size, "bytes (mini 轻量版),",
  fs.statSync(path.join(root, "plus.html")).size, "bytes (plus 完整词典版),",
  fs.statSync(path.join(root, "zhuyin.html")).size, "bytes (zhuyin 注音版),",
  fs.statSync(path.join(root, "jyutping.html")).size, "bytes (jyutping 粤语版)");
