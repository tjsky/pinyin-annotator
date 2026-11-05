// 把 rime-cantonese-upstream 的粤语字表 + 词表打包成内嵌词典
//
// 上游：https://github.com/CanCLID/rime-cantonese-upstream（CC-BY-4.0）
//   char.csv  列：char, jyutping, pron_rank, tone_var, literary_vernacular, comment
//   word.csv  列：char, jyutping
//
// 输出：seg-dict/jyutdict.b64.txt —— gzip+base64 的 TSV，两段，每段以 # 开头标记
//   #char
//   春<TAB>ceon1
//   日<TAB>jat6        多音字用空格分隔，按 pron_rank 排序（預設 在前）
//   #word
//   春日<TAB>ceon1 jat6
//
// 过滤规则：
//   - 字表只保留 pron_rank 为「預設」「常用」的读音（丢弃「罕見」「棄用」）；
//     若某字全部读音都被丢弃，则回退保留它的第一条读音，避免出现无音字。
//   - 词表去重（同词同音只留一条），按词长降序排列，供最长匹配直接顺序扫描。
//
// 用法：node seg-dict/build-jyutping.js <char.csv 路径> <word.csv 路径>
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const SRC_CHAR = process.argv[2];
const SRC_WORD = process.argv[3];
if (!SRC_CHAR || !SRC_WORD) {
  console.error("用法：node seg-dict/build-jyutping.js <char.csv> <word.csv>");
  process.exit(1);
}
const OUT = path.join(__dirname, "jyutdict.b64.txt");

// 极简 CSV 解析：这些文件没有引号包裹，字段里也不含逗号
function parseCsv(text) {
  const lines = text.split(/\r?\n/);
  const head = lines[0].split(",");
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const parts = lines[i].split(",");
    const o = {};
    for (let j = 0; j < head.length; j++) o[head[j]] = parts[j] === undefined ? "" : parts[j];
    rows.push(o);
  }
  return { head, rows };
}

// —— 字表 ——
const charCsv = parseCsv(fs.readFileSync(SRC_CHAR, "utf8"));
const RANK = { "預設": 0, "常用": 1, "罕見": 2, "棄用": 3 };
const KEEP = { "預設": 1, "常用": 1 };

const byChar = new Map();
let charTotal = 0, charDropped = 0;
for (const r of charCsv.rows) {
  const ch = r.char, jy = (r.jyutping || "").trim();
  if (!ch || !jy) continue;
  charTotal++;
  if (!KEEP[r.pron_rank]) { charDropped++; continue; }
  if (!byChar.has(ch)) byChar.set(ch, []);
  byChar.get(ch).push({ jy, rank: RANK[r.pron_rank] === undefined ? 9 : RANK[r.pron_rank] });
}

// 回退：某个字所有读音都被过滤掉时，找回它的第一条（保留可注音能力）
let rescued = 0;
const allByChar = new Map();
for (const r of charCsv.rows) {
  const ch = r.char, jy = (r.jyutping || "").trim();
  if (!ch || !jy) continue;
  if (!allByChar.has(ch)) allByChar.set(ch, jy);
}
for (const [ch, jy] of allByChar) {
  if (!byChar.has(ch)) { byChar.set(ch, [{ jy, rank: 9 }]); rescued++; }
}

// 每个字内按 rank 排序（預設 在前），同音去重
const charLines = [];
let polyCount = 0;
for (const [ch, arr] of byChar) {
  arr.sort((a, b) => a.rank - b.rank);
  const seen = new Set(), keep = [];
  for (const x of arr) { if (!seen.has(x.jy)) { seen.add(x.jy); keep.push(x.jy); } }
  if (keep.length > 1) polyCount++;
  charLines.push(ch + "\t" + keep.join(" "));
}
// 按码位排序，让产物稳定可复现
charLines.sort((a, b) => a.codePointAt(0) - b.codePointAt(0));

// —— 词表 ——
const wordCsv = parseCsv(fs.readFileSync(SRC_WORD, "utf8"));
const wordSeen = new Set();
const wordLines = [];
let wordDup = 0, wordBad = 0;
for (const r of wordCsv.rows) {
  const w = r.char, jy = (r.jyutping || "").trim();
  if (!w || !jy) { wordBad++; continue; }
  // 音节数必须与汉字数一致，否则连排时对不齐，直接丢弃
  if (jy.split(/\s+/).length !== Array.from(w).length) { wordBad++; continue; }
  const key = w + "\t" + jy;
  if (wordSeen.has(key)) { wordDup++; continue; }
  wordSeen.add(key);
  wordLines.push(key);
}
// 词长降序（最长匹配），同长按码位排序保证稳定
wordLines.sort((a, b) => {
  const la = a.indexOf("\t"), lb = b.indexOf("\t");
  const ca = Array.from(a.slice(0, la)).length, cb = Array.from(b.slice(0, lb)).length;
  if (cb !== ca) return cb - ca;
  return a < b ? -1 : a > b ? 1 : 0;
});

// —— 打包 ——
const payload = "#char\n" + charLines.join("\n") + "\n#word\n" + wordLines.join("\n") + "\n";
const gz = zlib.gzipSync(Buffer.from(payload, "utf8"), { level: 9 });
const b64 = gz.toString("base64");
fs.writeFileSync(OUT, b64);

console.log("字表：读入 " + charTotal + " 条读音，" + charDropped + " 条因 pron_rank 被丢弃");
console.log("     保留 " + byChar.size + " 字（多音字 " + polyCount + " 个），回退救回 " + rescued + " 字");
console.log("词表：保留 " + wordLines.length + " 条（重复 " + wordDup + "，格式不符 " + wordBad + "）");
console.log("载荷：" + payload.length + " 字节 → gzip " + gz.length + " 字节 → base64 " + b64.length + " 字节");
console.log("输出：" + OUT);
