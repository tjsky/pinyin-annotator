<!--
  发版说明（三语）。打 tag 前更新本文件，内容与本次 tag 一一对应；
  构建时 {{VERSION}} 与 {{PREV}} 会被替换为当前 tag 与上一个 tag。
  不更新本文件的话，Release 会沿用上一次的文字——发版时记得改。
  写给用户看：只讲能做什么、怎么用，不写实现细节。
-->

## 简体中文

**这一版就是加了个粤语版，不需要粤语注音可以不更新。** 只做汉语拼音 / 注音的话，v1.7.2 已经够用——功能一个不少，不必为了「有新版本」而更新。想试试粤语版就升级；原有四个版本的操作、排版、打印都和以前一样，升级也不会改变现有用法。

**新增粤语版**：给粤语母语的孩子标读音用的第五个版本（`jyutping.html`）。每个字标出它在粤语里的读法（粤拼 Jyutping，如「春」ceon1），调号用香港语言学学会的基线数字，另加粗与暖色——只变色在黑白打印时会灰掉，靠字重才分得清。文字按粤语词整体排列，一个词不会被拆到两行。

**界面和朗读也跟着变**：简体界面的说明与示例文章用广东说法，繁体界面用香港说法与香港用字（例如「裏」而不是「裡」）。阅读模式会自己挑粤语语音，不会拿国语代读；设备里没装粤语语音时会先提醒你。

**它不是翻译工具**：只按字给出读音，不改变句子本身的用词，也不保证这句话在粤语里会这样说。「更多设置 → 繁简转换」可以把简体转成香港或台湾用字，但香港的**词汇**转换目前只有几十条（多是人名地名），「出租车」「土豆」只会转字，不会变成「的士」「薯仔」——这是 OpenCC 上游的数据现状，遇到没覆盖的词欢迎向该项目反馈。

## 繁體中文

**這一版就是加了個粵語版，不需要粵語注音可以不更新。** 只做漢語拼音 / 注音的話，v1.7.2 已經夠用——功能一個不少，不必為了「有新版本」而更新。想試試粵語版就升級；原有四個版本的操作、排版、列印都和以前一樣，升級也不會改變現有用法。

**新增粵語版**：給粵語母語的孩子標讀音用的第五個版本（`jyutping.html`）。每個字標出它在粵語裡的讀法（粵拼 Jyutping，如「春」ceon1），調號用香港語言學學會的基線數字，另加粗與暖色——只變色在黑白列印時會灰掉，靠字重才分得清。文字按粵語詞整體排列，一個詞不會被拆到兩行。

**介面與朗讀也跟著變**：簡體介面的說明與範例文章用廣東說法，繁體介面用香港說法與香港用字（例如「裏」而不是「裡」）。閱讀模式會自己挑粵語語音，不會拿國語代讀；裝置裡沒裝粵語語音時會先提醒你。

**它不是翻譯工具**：只按字給出讀音，不改變句子本身的用詞，也不保證這句話在粵語裡會這樣說。「更多設定 → 繁簡轉換」可以把簡體轉成香港或台灣用字，但香港的**詞彙**轉換目前只有幾十條（多是人名地名），「出租車」「土豆」只會轉字，不會變成「的士」「薯仔」——這是 OpenCC 上游的資料現狀，遇到沒覆蓋的詞歡迎向該專案回饋。

## English

**This release is almost entirely the Cantonese build — if you don't need it, v1.7.2 is still fine.** For Hanyu Pinyin or zhuyin only, v1.7.2 does everything this version does; there's no reason to upgrade just to stay current. Upgrade if you want to try the Cantonese build — the four existing builds behave exactly as before, in the interface, the layout and printing.

**A Cantonese build is here.** The fifth build (`jyutping.html`) gives Cantonese-speaking children the reading of every character (Jyutping, e.g. 春 ceon1). Tone numbers stay on the baseline as the Linguistic Society of Hong Kong specifies, and are also set in bold and a warm colour — colour alone fades in black-and-white printing, only the weight survives. Words stay together, so a word is never split across two lines.

**The interface and the voice follow.** The Simplified interface speaks in Guangdong terms and the Traditional one in Hong Kong terms and Hong Kong characters (「裏」 rather than 「裡」). Read-aloud picks a Cantonese voice instead of falling back to Mandarin, and tells you once if the device has none.

**It is not a translator.** It only shows how each character is read, without changing the wording and without promising a Cantonese speaker would say it that way. "More settings → Conversion" can turn Simplified into Hong Kong or Taiwan characters, but Hong Kong *wording* conversion covers only a few dozen entries — 出租車 and 土豆 change characters, not into 的士 or 薯仔. That is the state of OpenCC's upstream data; uncovered words are worth reporting there.

---

**Full Changelog**: https://github.com/tjsky/pinyin-annotator/compare/{{PREV}}...{{VERSION}}
