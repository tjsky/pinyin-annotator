# 汉语拼音注音小助手 (Pinyin Annotator)

<p align="center">
  <b>语言 / Language</b><br />
  <a href="README.md"><img alt="简体中文" src="https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-Current-brightgreen?style=flat-square"></a>
  <a href="README.zh-TW.md"><img alt="繁體中文" src="https://img.shields.io/badge/%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87-Switch-lightgrey?style=flat-square"></a>
  <a href="README.en.md"><img alt="English" src="https://img.shields.io/badge/English-Switch-lightgrey?style=flat-square"></a>
</p>

> 一键给中文文章加上拼音或注音（共九种音标写法），生成适合**幼儿园至小学低年级儿童**与**海外汉语学习用户**的注音读物。
>   
> 纯前端 · 单文件 · 离线可用 · 文章内容永不上传
>
> 开源仓库：<https://github.com/tjsky/pinyin-annotator> · 作者博客：[秋风于渭水](https://www.tjsky.net)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![拼音引擎](https://img.shields.io/badge/%E6%8B%BC%E9%9F%B3%E5%BC%95%E6%93%8E-pinyin--pro-orange)](https://github.com/zh-lx/pinyin-pro) [![繁简转换](https://img.shields.io/badge/%E7%B9%81%E7%AE%80%E8%BD%AC%E6%8D%A2-OpenCC-blue)](https://github.com/nk2028/opencc-js) [![台湾读音](https://img.shields.io/badge/%E5%8F%B0%E6%B9%BE%E8%AF%BB%E9%9F%B3-%E8%90%8C%E5%85%B8-green)](https://github.com/g0v/moedict-data) [![注音 IVS](https://img.shields.io/badge/%E6%B3%A8%E9%9F%B3%20IVS-bpmfvs-blueviolet)](https://github.com/ButTaiwan/bpmfvs)

**在线使用：**[拼音注音小助手(Github Page)](https://tjsky.github.io/pinyin-annotator/) |[拼音注音小助手(Cloudflare Page)](https://pinyin-annotator.tjsky.net/)

---

## 为什么做这个

给低年级孩子生成带汉语拼音注音的读物时，网上工具要么弹广告、要么把文章上传到服务器、要么多音字错得离谱还不能改。这个小工具就是解决这些痛点的：

- **内容不出本地**：所有注音转换都在浏览器里完成，处理校内稿件、孩子姓名都没有隐私顾虑；
- **准确率第一梯队**：基于 [pinyin-pro](https://github.com/zh-lx/pinyin-pro)（官方基准准确率 99.846%），词组级多音字消歧（银行 / 行走 / 睡着了）；
- **错了能改**：点任意生字手动改读音，轻声（子 zi、地 de、着 zhe）、儿化音都能强制指定。

## 工具界面预览

- 版本选择界面

![版本选择界面](https://img.tjsky.net/2026/09/5bbf3c657c59e7ff99e46278390c3002.webp)

- 生成拼音

  ![](https://img.tjsky.net/2026/09/4bcbd5e35d68f6e4f6f0b03056e6fba6.webp)
- 生成注音

  ![](https://img.tjsky.net/2026/09/67a338385a65ab3b3e32f62f78ff993f.webp)

## 功能特性

### 音标与读音

**九种音标方案**：侧栏「音标方案」一键切换。读音一律按拼音存储，切方案只换写法——手动改过的读音、台湾读音标准照常生效，预览、打印与五种复制格式同步。

| 方案 | 写法特点 | 例：春天来了 |
| --- | --- | --- |
| 汉语拼音 | 教材与《汉语拼音方案》的写法，调号标在主要元音上 | chūn tiān lái le |
| 注音符号（ㄅㄆㄇ） | 台湾注音符号，可横排或直排（标在字右侧） | ㄔㄨㄣ ㄊㄧㄢ ㄌㄞˊ ˙ㄌㄜ |
| 通用拼音 | zh→jh、j/q/x→j/c/s、舌尖元音 -ih、ㄩ 系作 yu、-iou / -uei 不缩写；一声与轻声不标调 | chun tian lái le |
| 耶鲁拼音（国语耶鲁） | zh/ch/sh→j/ch/sh、z/c/s→dz/ts/s、x 作 sy、-un 作 -wun、-ui 作 -wei；七个空韵用空格调号 | chwūn tyān lái le· |
| 威妥玛（严式） | 老派英文汉学写法：保留送气符 ʻ、ü 与上标调号 | chʻun¹ tʻien¹ lai² le⁵ |
| 威妥玛（简式） | 同上但省略送气符；可切「数字 / 不标」与「ü / u」 | chun¹ tien¹ lai² le⁵ |
| 注音二式（MPS2） | ㄐ/ㄑ/ㄒ 与翘舌同作 j/ch/sh，空韵翘舌后作 r、舌齿后作 z，ü 作 iu、ao 作 au | chuēn tiān lái le |
| 国语罗马字（GR） | **不用调号，靠拼写区分四声**：一声基式、二声加 r 或换 y/w、三声双写或换 e/o、四声改韵尾或缀 h；轻声缀「.」 | chuen tian lai .le |
| 西里尔转写（Палладиус） | 俄语圈沿用至今的标准；上标数字调 ¹—⁵，可关掉；预览与打印自动切系统西文字体栈 | чунь¹ тянь¹ лай² лэ⁵ |

威妥玛简式与西里尔转写的「声调」可关；拉丁字母方案可把音标放到字的右侧（「拼音位置」），注音可横排 / 直排（「注音方向」）。

- **教材式上下注音排版，轻声自动不标调**（妈妈 mā ma）。
- **一/不变调**：标变调（一个 yí gè，语流中的实际读音）或标本调（一个 yī gè，词典里的声调），按教材习惯选择。
- **儿化音双模式**：**分开标**（花儿 huā er，适合指读认字）/ **合并标**（花儿 huār，符合汉语拼音方案），女儿、儿童等真音节词自动修正。
- **单字手动改读音**：点击生字弹出候选（含轻声/助词读音），改过的字标橙色。
- **按词连排**（主线版 / 完整词典版）：内置约 3 万现代汉语常用词词典，「连排方式」可选「按词连排」（词组的字连在一起注音、词间留空隙，更贴近教材词组排版；多字词读音按词典标注更准，如 长长 cháng cháng、银行 yín háng）、「从后匹配」与「逐字注音」（默认）；也可点击任意生字在弹窗中手动断词 / 合词，修正机器分词错误。
- **保存设置 / 恢复默认**：调好的排版存为下次打开的默认值；改乱了点「恢复默认」一键还原。
- **单字儿化修正**：人名「润儿」误判成儿化？点「儿」字一键强制儿化 / 非儿化。
- **易错字标色**：用底色标出多音字、儿化音、的 / 地 / 得、一 / 不 变调、常见轻声字，扫一眼就知道该核对哪里。
- **内置常用轻声词典**：豆子、椅子、高兴地、慢慢地等直接标对
- **拼音引擎内嵌离线可用**，同时支持联网同步上游更新（jsDelivr / npmmirror 双源）

### 排版与输出

- 汉字 16–48px 字号；汉字字体可选楷体 / 宋体 / 黑体，或霞鹜文楷 GB / 霞鹜文楷 TC / 芫荽 Iansui（在线字体，按需加载并自动缓存）；音标字体独立设置，也可选本机已安装的字体。
- **简⇄繁转换引擎**：由 OpenCC 驱动，「更多设置 → 繁简转换」可选 **简体 ⇆ 标准繁体 / 台湾繁体 / 香港繁体**；勾选「同时转换常用词汇」后可以连地区用词一并转换（鼠标→滑鼠、软件→軟體、打印→列印），一字多繁（头发→頭髮、发财→發財）始终实现自动区分。
- **内嵌拼音 / 注音专用字体**：楷体、宋体等常见中文字体里的拼音是普通拉丁字母写法（双层 a），不是教材拼音。工具内嵌 Andika 拼音字体（默认，显示教材单层 ɑ / 单层 g）与 ㄅㄆㄇ 注音字体 BpmfSubset（注音模式自动选用，也可在「音标字体」手动指定），**无需额外安装任何字体**；以上均以 SIL OFL 1.1 协议开源，**可免费商用**。
- **可选「印氪先生拼音字体」**：一款更接近教材上的拼音效果的拼音字体，在检测到本机已安装时会**自动切换**；未安装而手动选择时会提示下载并给出安装步骤（下载 → 解压 → 双击 ttf → 点「安装」→ **重启浏览器**后点「重新检测」）。安装后即可默认调用，注意该字体**仅限非商业场景使用**，项目代码不包含字体文件，详见下方「字体版权说明」。
- **列出本机所有字体**：默认只列常用字体，避免下拉列表过长；勾选后浏览器会请求「字体访问」权限，本机字体按名称去重排序，以「本地已安装字体」分组追加到汉字字体与音标字体两个下拉框，取消勾选即恢复。该功能只有电脑版 Chrome / Edge 支持，手机 / 平板用内置字体即可。
- **A4 纸样式预览**：按 A4 纸宽高自动分页（每页容纳字数随字号、间距自动变化），所见即所印；手机等窄屏自动改为适应屏幕宽度的连续排版。
- **长文模式（整本书支持）**：粘贴或导入超过 3 万字时自动进入（上限 200 万字），全文切成约 3 万字的块逐块排版，边处理边可翻阅（进度条实时显示）；预览只渲染当前页，翻页时再按需排版，不卡浏览器界面。输入框转为只读摘要状态，点「退出长文模式」恢复编辑。
- **字间距 / 行间距 / 段间距滑杆实时调节**，解决长拼音黏连问题。
- **三档对齐**：默认「左对齐」；「居中」所有内容都居中（律诗、绝句、歌词）；「诗词」按最长的一行居中后，其他文字再与它左对齐（词、赋、现代诗）。诗词档下点预览左侧的行号（手机长按某一行），可以单独调整这一行。
- **翻页 / 连续滚动**两种预览方式：翻页按 A4 逐页显示（翻页按钮或键盘 ←→），连续滚动一屏到底。
- **打印 / PDF**：A4 教材排版输出全部页面，页脚水印可勾选去除。长文模式下改为弹出打印对话框：可按**页码范围**打印，或**分批打印全书**（每批 100 页，上一批保存后自动弹出下一批），再用对话框里的「合并 PDF 文件」把各批按文件名顺序合成一个 PDF（使用pdf-lib 在你的浏览器内合并，全程本地不上传；仅合并工具本身首次使用时需联网加载）。
- **五种复制格式**：粘贴到 Word（保留注音排版）、网页 ruby 标签、网页注音（HTML+CSS，网页源码，引用随站点部署的 `zhuyin.css`，横排 / 直排都与预览一致，可选配 font.emtech.cc 在线字体如芫荽 Iansui / 霞鹜文楷 TC）、字-音标 对照、只复制音标（保留原文标点与分段，适合出练习题）；音标随当前模式——拼音模式复制拼音，注音模式复制注音（ㄅㄆㄇ）。Word 对注音声调定位支持有限（要在 Word 里精确注音，得逐一适配多种注音字体，超出了这么一个几 MB 在线工具的能力），所以「粘贴到 Word」出来的注音是横排、声调符号缀在音节末尾。
- **注音芫荽 IVS 模式**：「网页注音（HTML+CSS）」直排 + 网页字体选「注音芫荽 BpmfIansui」时，每个字的正确读音以 IVS 异体字选择符（U+E01E0+序号，规格见 ButTaiwan/bpmfvs）写入文字，由字体自行标注右侧注音；多音字读音随本工具的台湾读音数据选取，读音表（18,626 字，构建期从 bpmfvs 读音表 `phonic_table_Z.txt` 生成，仅注入注音版）未收的字自动切回常规字形并用结构标注，不会显示字体默认的错误读音。横排时该字体仅用于注音符号（其汉字字形自带注音，整段套用会重复标注）；装有注音芫荽字体的 Word 等软件可直接使用带 IVS 的文字，输出真实正确的注音。
- **阅读模式**：隐藏编辑区，设备直接递给小朋友，方向键翻页；底部还有一条跟读工具条：逐句高亮、自动滚动 / 翻页，可以用浏览器语音朗读课文，也能开麦克风让孩子跟着读（实验功能），点课文里的字直接跳到那一句；关掉时记住读到哪，下次进来接着读。

### 导入

- TXT 文件导入，自动识别 UTF-8 / GBK 编码；单个文件上限 2 MB。

## 快速开始

- **在线使用：**[拼音注音小助手(海外用户推荐访问)](https://tjsky.github.io/pinyin-annotator/) |[拼音注音小助手(国内用户推荐访问)](https://pinyin-annotator.tjsky.net/)

  首次访问会展示四个版本的对比卡片，选一个进入即可；选过之后浏览器会记住，下次自动进入上次用的版本（也可在页面换版本）；
- **本地使用**：
  1. 前往 [Releases](https://github.com/tjsky/pinyin-annotator/releases) 下载最新版（Assets 里的 `pinyin-annotator-vX.Y.Z.zip`）；
  2. 解压后双击 `index.html`（版本选择页）——完成，不需要安装任何东西；首次访问会展示四个版本的对比卡片，选一个进入即可，浏览器会记住选择、下次自动进入（也可在页面换版本；本地打开旧入口 `main.html` 会提示改用 `pinyin.html`）；
  3. 粘贴文章 → 选音标、调字号与间距 → 勾「易错字」过一遍 → 打印 / 导出 PDF，或复制进 Word；也可以点「阅读模式」直接递给孩子读。

| 版本          | 文件            | 体积       | 与其他版本的差别                                                        |
| ----------- | ------------- | -------- | --------------------------------------------------------------- |
| **版本选择页**   | `index.html`  | 约 20 KB  | 简 / 繁 / 英文三语、四版本对比、记住上次选择、完整词典版下载进度                             |
| **轻量版**     | `mini.html`   | 约 1 MB   | 没有词组词典，只能逐字注音；**其余功能与其他版本一致**                                   |
| **主线版**（推荐） | `pinyin.html` | 约 1.4 MB | 内置 3 万常用词，可按词连排；在线演示默认进入这个版本                                    |
| **完整词典版**   | `plus.html`   | 约 7.2 MB | 词典扩到 33.7 万词（成语、人名地名也能整词排）+ OpenCC 简 ⇄ 繁                          |
| **注音版**     | `zhuyin.html` | 约 2.3 MB | 预设繁体界面 + 注音符号 + 台湾读音 + OpenCC 简 ⇄ 繁 + 注音芫荽 IVS 读音表              |

四个版本的界面、排版、打印、阅读模式完全一致，只差词典大小与简繁转换。

全部版本均支持 **简体 / 繁體 / English 界面**、**九种音标方案**（汉语拼音 / 注音符号 / 通用拼音 / 耶鲁拼音 / 威妥玛严式、简式 / 注音二式 / 国语罗马字 / 西里尔转写），以及 **一/不变调**（标变调 / 标本调）。拉丁字母方案均可切「拼音位置」（**上方**默认 / **右侧**）；注音模式提供「注音方向」切换：**横排**（符号横写标在字上方，调号标在末符上方）与**直排**（台湾直式教科书风格，符号自上而下竖排、标注在汉字右侧，调号标在末符右方）；切换后 A4 预览自动重新分页，打印 / 导出 PDF 所见即所印。

「更多设置 → 读音标准」可切换 **普通话读音 / 台湾读音**（拼音与注音模式都生效）：普通话读音以《现代汉语词典》为准（数据来源 [zh-lx/pinyin-pro](https://github.com/zh-lx/pinyin-pro)）；台湾读音以《重編國語辭典修訂本》为准（数据来源 [g0v 萌典](https://github.com/g0v/moedict-data)），覆盖约 1.5 万词、200 字（简繁字形均可命中，如垃圾 ㄌㄜˋㄙㄜˋ、期待 ㄑ丨ˊ、攜帶 ㄒ丨、血液 ㄒ丨ㄝˇ、混淆 ㄏㄨㄣˋ丨ㄠˊ），词典文本授权为 CC BY-ND 3.0 臺灣（许可协议要求保留的原始署名：教育部）。

`zhuyin.html` 与 `plus.html` 内嵌 [OpenCC（nk2028/opencc-js）](https://github.com/nk2028/opencc-js)（Apache-2.0），输入区提供「转为简体 / 转为繁体」一键转换；「更多设置 → 繁简转换」可选 **简体 ⇆ 标准繁体 / 台湾繁体 / 香港繁体**，配合「同时转换常用词汇」勾选（台湾 / 香港繁体时可用）连地区用词一并转换；`zhuyin.html` 首次打开即为繁体界面、注音符号与台湾读音（可随时切换）。

> 推荐使用 Chrome / Edge 等现代浏览器，手机 / 平板同样可用：界面会自动改成上下排列，翻页变为连续滑动；手机上装不了本地字体，用内置的 Andika 拼音字体即可，阅读模式的朗读与跟读照常可用。全部功能在本地运行、文章永不上传；联网仅用于可选的拼音引擎更新检查与在线字体加载（不选在线字体即完全离线）。
>
> 自行部署到静态托管（GitHub Pages / Cloudflare Pages / Vercel 等）时，使用 **`dist` 分支**的内容（或 Releases zip 解压）放到根目录即可，入口即版本选择页；帖子里分享指定版本可用 `https://你的域名/?v=plus` 这样的参数直接访问对应版本（`?v=pinyin` / `?v=zhuyin` / `?v=mini` 同理，旧链接 `?v=main` 自动兼容跳转主线版）。详见下方「部署在线版」。

## 部署在线版（GitHub Pages / Cloudflare Pages / Vercel）

本仓库采用**源码与成品分离**的架构：

| 分支 / 位置 | 内容 | 用途 |
| --- | --- | --- |
| `main` | 源码：`template.html` + `build.js` + 构建依赖（fonts / vendor / seg-dict） | 开发与 PR，**不含工具成品** |
| `dist` | CI 自动构建的工具成品：`index.html` + `main.html` + `zhuyin.css` + 四个版本页 + `.nojekyll` | **三平台线上托管的生产分支**，由 CI 自动构建覆盖 |
| Releases | 每个版本 tag 的成品 zip | 本地使用下载 |

### Fork 后自建部署（三平台任选）

1. **Fork 本仓库**，确认 Fork 的 **Actions 已启用**（Fork 仓库页 Actions 标签页 → 如提示已禁用则点启用）；Fork 默认只有 main 分支——手动触发一次工作流即可生成 dist：Actions → Build & Deploy → Run workflow，或随便改点代码发一个新提交；
2. 按所用平台选择：
   - **GitHub Pages**：Settings → Pages → Build and deployment → Source 选 **Deploy from a branch** → Branch 选 **`dist`**，目录 **/ (root)** → Save；
   - **Cloudflare Pages**：连接 Fork 仓库，**Production branch 填 `dist`**，Build command 留空、输出目录填 `/`；
   - **Vercel**：导入仓库后，Settings → Git → **Production Branch 改为 `dist`**（无需构建命令）；
3. 等 1–2 分钟构建完成，用分配的域名或自定义域名访问即可。

> 往后更新只需同步上游 `main`（Fork 页面 Sync fork），CI 会自动重建 `dist`，三平台自动跟随发布，全程无需手工下载或上传任何文件。任一线上页面执行 `curl -s <页面地址> | grep -o "build:v[0-9.]*"` 可核对部署的构建版本号。

## 本地构建

环境要求：**Node.js ≥ 18**（推荐 22，与自动化构建使用的版本一致），零 npm 依赖，克隆后直接构建：

```bash
git clone https://github.com/tjsky/pinyin-annotator.git
cd pinyin-annotator
node build.js
```

构建会在仓库根目录生成 `mini.html` / `pinyin.html` / `plus.html` / `zhuyin.html` 四个单文件成品（`index.html`、`main.html`、`zhuyin.css` 为手工维护的源文件，不参与构建）。

- **构建版本号**：`build.js` 内 `BUILD_VERSION` 常量随发版递增，注入为每个产物 head 内的隐藏注释 `<!--build:x.y.z-->`，用于线上部署核对；
- **可复现性**：相同 Node 版本下产物应当逐字节一致；换系统或换 Node 版本时，zlib 压缩结果可能不同，产物哈希会与仓库里的不一致（词典解压后完全一致，功能没有差异）。CI 固定使用 Node 22.22.2；
- **词典再生成**：`seg-dict/` 内包含 `build-complete.js`、`build-tw-diff.js`、`gen-bpmf-ivs.py`，仅在需要更新上游词典 / 萌典差异 / 注音读音表数据时使用，日常构建无需运行。
- **多音补表自检**：`template.html` 里的 `POLY_EXTRA` 收录引擎缺失的读音（如 骑 jì、偕 jiē）。升级引擎后运行 `node check-poly-extra.js`，会列出「上游已收录（可删除）」「上游仍缺失」两类条目，避免与引擎重复或冲突。
- **音标转写对照**：`node check-translit.js` 用 kfcd/pinyin 的 2095 条音节逐条核对通用拼音、耶鲁拼音、威妥玛（严式 / 简式）、注音二式、国语罗马字、西里尔转写的拼写与调值（国语罗马字拼写即承载声调；国语罗马字与西里尔都直接逐字符比对）；简式的两个开关也会自检。汉语拼音与注音符号是基准写法，不参与比对。先在仓库根目录放一份对照表：`gh api repos/kfcd/pinyin/contents/pinyinbiao -H "Accept: application/vnd.github.raw" > .ty-biao.tsv`（该文件不入库）。
- **候选读音自检**：`node check-alts.js` 扫描全部多音字，检查九种方案下的候选是否混入方案外的字符（如注音模式里出现拉丁字母）或显示重复的选项。
- **内嵌字体**：`fonts/build-andika.py <Andika-Regular.ttf>` 重建 Andika 子集，`fonts/check-coverage.py` 检查两个内嵌字体是否覆盖所有音标方案用到的字符（含组合调号与 unicode-range）。两者需要 `pip install fonttools brotli`，仅改字体时使用。
- **访问统计（可选，仅官方部署）**：统计代码不写在源码里，由 `inject-analytics.js` 在 CI 推送 `dist` 前注入，因此**本地构建的成品与 Release 包都是干净的**。想给自己的部署接统计，设好 `UMAMI_WEBSITE_ID` 与 `UMAMI_SCRIPT_URL`（tracker 的完整地址，如 `https://ana.example.net/main.js`）再运行 `node inject-analytics.js dist`；未设置时脚本直接跳过，不会失败。**多个域名指向同一个网站没问题**：Umami 不按域名拦截上报，用 hostname 过滤即可区分。

## 参与贡献

欢迎 Issue 与 PR！提交前请先看 [已知问题](#已知问题) 与 [开发计划](#开发计划待修复问题)，避免重复劳动。

**提交流程（重要：只改源码，不要手改成品）：**

1. Fork 仓库，从 `main` 拉出功能分支；
2. **所有功能改动都在 `template.html`（唯一源文件）里做**；改构建脚本与词典数据则分别改 `build.js` 与 `seg-dict/`。main 分支没有四个工具页——它们由自动化构建脚本构建，**请不要在 PR 里出现任何成品文件的改动**；
3. 本地 `node build.js` 自测通过后提交，发起 PR；
4. CI 会自动构建，产物挂在 workflow run 的 **Artifacts** 上，可直接下载验证效果；
5. 审查合并后，`dist` 分支与线上页面自动更新，无需任何手工发布步骤。

### 贡献者

<!-- readme: contributors -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/tjsky">
                    <img src="https://avatars.githubusercontent.com/u/7272911?v=4" width="100;" alt="tjsky"/>
                    <br />
                    <sub><b>去年夏天</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/wang90">
                    <img src="https://avatars.githubusercontent.com/u/18193621?v=4" width="100;" alt="wang90"/>
                    <br />
                    <sub><b>wang90</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: contributors -end -->


## 隐私与安全说明

- 所有注音转换在浏览器本地完成，**文章内容不上传到任何服务器**；
- 「检查拼音引擎更新」仅向 jsDelivr / npmmirror 请求引擎版本号与代码，不涉及文章内容；
- 在线字体（霞鹜文楷 GB / TC、芫荽等）仅在主动选择时从 CDN 加载字体文件，不涉及文章内容；
- 长文模式「合并 PDF」所用的合并组件（pdf-lib）首次使用时从 CDN 加载，之后走浏览器缓存，合并过程完全在本机完成；
- 阅读模式的「朗读」用浏览器内置语音，念的就是页面上这篇文章，不经过任何服务器；「麦克风跟读」走浏览器的语音识别，浏览器厂商可能会处理音频（首次开启前会先询问一次），介意的话不开就行；
- 工具不收集任何个人信息，无广告。**官方在线版**带有一个自建的匿名访问统计（不使用 Cookie、不读取也不上传文章内容、不记录可识别个人的信息），记录的只是「哪个页面被打开了、大致来自哪类设备」，用途仅限了解大致使用量、判断哪些功能值得继续维护；**从 Release 下载的离线文件、以及 fork 后自建的部署都不含这段统计代码**。

## 准确性说明

拼音引擎准确率约 99.8%，但**不承诺 100% 正确**——多音字、轻声、儿化音在特定语境（尤其是人名、专名）下仍可能误判。各版本内嵌词典不同、多音字处理能力也不同（完整词典版最高，预览框底部有相应提示）。工具因此提供：

- 易错字标色，扫一眼就知道哪里该核对（教学场景建议逐字过一遍）；
- 单字手动改读音、单字儿化修正。

## 技术栈

- 纯原生 HTML / CSS / JavaScript；源码为 `template.html` 模板 + `build.js` 构建脚本，产出四个单文件成品（成品零依赖，可直接双击打开）
- 拼音引擎：[pinyin-pro](https://github.com/zh-lx/pinyin-pro)（内嵌 + 可在线更新）
- 分词词典：取自 [@pinyin-pro/data](https://www.npmjs.com/package/@pinyin-pro/data) modern（gzip 内嵌，启动时解压注册）
- 繁简转换引擎：[nk2028/opencc-js](https://github.com/nk2028/opencc-js)（gzip+base64 内嵌，懒解压）
- 音标转换层：拼音 → 通用拼音 / 耶鲁 / 威妥玛 / 注音二式 / 国语罗马字 / 西里尔的转写规则，按各方案的官方规范自行实现（[kfcd/pinyin](https://github.com/kfcd/pinyin) 对照表只用于校验，不引入其代码）
- 台湾读音差异表：[g0v/萌典](https://github.com/g0v/moedict-data)（构建期生成，内嵌）
- 注音 IVS 读音表：[ButTaiwan/bpmfvs](https://github.com/ButTaiwan/bpmfvs)（构建期生成，仅注入注音版内嵌）
- 感谢 [zh-lx](https://github.com/zh-lx)、[nk2028](https://github.com/nk2028/opencc-js)、[g0v 萌典](https://github.com/g0v/moedict-data)、[ButTaiwan](https://github.com/ButTaiwan) 等开源项目与作者。

## 字体版权说明

### 内嵌字体（随文件分发，无需安装）

**Andika（拼音专用，免费商用）**

- 内嵌 [Andika](https://software.sil.org/andika/) Regular 的拼音字形子集：拼音字母、四声调号、ê 与鼻音叹词 ḿ ń ň ǹ、组合调号。本子集未修改字形设计。
- 注音模式的 ㄅㄆㄇ 另用 Noto Sans TC 子集（37 个符号 + 5 个调号）。
- 两者均以 **SIL Open Font License 1.1** 授权，可免费用在个人与商业场景、可内嵌分发，保留版权与许可声明即可。

### 在线字体（按需从网络加载，代码里不含字体文件）

**霞鹜文楷 GB / 霞鹜文楷 TC / 芫荽 Iansui / 注音芫荽 BpmfIansui**

- 霞鹜文楷 GB 从 jsDelivr CDN 加载 [lxgw-wenkai-gb-web](https://github.com/CMBill/lxgw-wenkai-gb-web) 的字体分包；霞鹜文楷 TC、芫荽 Iansui、注音芫荽从免费字体服务 [font.emtech.cc](https://font.emtech.cc/) 加载。
- 四者均以 **SIL Open Font License 1.1** 授权，可免费商用；版权归原作者（lxgw、[ButTaiwan](https://github.com/ButTaiwan) 等）。
- 「注音芫荽 BpmfIansui」只用于「网页注音（HTML+CSS）」直排 + IVS 模式，其余场景用不到。

> **关于 OFL 1.1 的共同提醒**：部分地区版权机构不认可 OFL 1.1 协议的效力，会要求提供传统「授权证明」。真遇到这种情况，以上字体建议改用能开具授权证明的免费商用字体，或购买商业版权字体。

### 本机字体（不含字体文件，只在已安装时调用）

**印氪先生拼音字体（优化版 W4，更接近教材）**

- 工具只在这台设备已安装该字体时调用它；没装会提示下载地址与安装步骤，不装也不影响任何功能（拼音可用内嵌的 Andika）。手机 / 平板装不了本地字体，用 Andika 就行。
- 版权归作者**印氪先生**所有，**仅限非商业场景使用**；如需商用或内嵌，请自行联系作者购买授权：[印氪先生（知乎主页）](https://www.zhihu.com/people/zou-wen-biao)。
- **免责声明**：README 与仓库中的演示截图展示了该字体的效果（截图所用字体即「印氪先生汉语拼音 优化版 W4」），仅为说明工具的拼音显示能力；**本开源项目不提供该字体文件**。
- 提醒：设备自带的黑体、宋体、雅黑等同样有版权。网页调用本地已安装字体没问题，但打印成成品分发时，请留意所用字体的授权范围。

## 开发计划&待修复问题

### 计划中

- 音标方案已覆盖主要体系（九种），暂不再新增；華語羅馬拼音 (THL) 经评估后放弃实现。
- 粤语拼音（粤拼）支持：粤音标音标准较混乱，不保证效果，目前暂未找到权威标准文件（如政府标准、学校教材）与可用开源库，欢迎提供参考资料。

## 已知问题

- 读音错误 / 缺音：注音由内置的拼音引擎自动判断，个别字可能读错或读音不全。我针对常见问题做过补充，但没法覆盖全部情况。遇到错音可以直接点那个字手动改；如果点了发现候选里也没有正确读音，欢迎反馈给我，我补上。
- 阅读模式：
  - 朗读读音由手机 / 电脑 / 浏览器内置的语音引擎决定，多音字读法可能和标注不一致，目前没找到兼顾低成本与体验的解法；
  - 句子正好跨在两页的分界上时，翻页的地方朗读会顿一下再继续，属于性能与功能的取舍，近期不打算解决；
  - 麦克风跟读靠识别出的字对齐进度，遇到两三个字的常用短语偶尔会定位错句；
  - 朗读高亮按字符位置定位，文章里如果有 emoji 符号，高亮可能会出现偏移。

## Star History

<a href="https://github.com/tjsky/pinyin-annotator/tree/star-history">
<img alt="Star History Chart" src="https://raw.githubusercontent.com/tjsky/pinyin-annotator/star-history/star-history.svg" />
</a>

## License

[MIT](LICENSE)
