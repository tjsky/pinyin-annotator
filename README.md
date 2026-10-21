# 构建产物分支 · 请勿直接修改

本分支（`dist`）由 GitHub Actions 自动构建并**强制推送**，内容全部来自 [`main`](https://github.com/tjsky/pinyin-annotator/tree/main) 分支的源码，**没有任何手工维护的文件**。

- 源码（`template.html`、`build.js`、词典与字体等构建依赖）都在 `main` 分支；
- 每次 `main` 有新提交，CI 会重新构建并用 `git push --force` 覆盖本分支——**在这里改任何东西，下次构建就会被清空，不会保留**；
- 本分支同时是线上生产目录（GitHub Pages / Cloudflare Pages / Vercel 的发布分支），**改动会直接影响线上版本**；
- 想改功能、样式、文案或修复 bug，请到 `main` 提 PR；构建流程见 `main` 分支的 `.github/workflows/build.yml`。

## 本地构建（与 CI 一致）

```bash
git clone -b main https://github.com/tjsky/pinyin-annotator.git
cd pinyin-annotator
node build.js
```

产物为 `mini.html` / `pinyin.html` / `plus.html` / `zhuyin.html` 四个单文件页面。

## 版本核对

查看线上任一页面源码 `<head>` 里的 `<!--build:x.y.z-->` 注释，即可确认当前服务的是哪个构建版本。
