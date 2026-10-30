# searchswap 双搜互跳

在 Google 和百度之间一键互跳，关键词自动带上。只在两家的搜索结果页生效。

```
百度  |  Google        ← 当前站点不可点，另一个点一下就跳
──────────────────
搜索结果……
```

## 安装

装好 Tampermonkey 后，直接打开：

https://raw.githubusercontent.com/elonwoo/searchswap/master/searchswap.user.js

Tampermonkey 会识别出安装页面，点「安装」即可。

## 更新

脚本头里的 `@updateURL` / `@downloadURL` 都指向本仓库的 raw 地址，Tampermonkey 按 `@version` 自动检查更新。

改完脚本记得同步提升 `@version`，否则不会触发更新。

## 生效范围

只在这两类页面上注入：

- `www.google.com/search*`，以及 `www.google.<地区域名>/search`（如 google.com.hk）
- `www.baidu.com/s*`

其它页面（包括两家的首页）一律不加载，不会出现跳转栏。

## 行为

- 跳转栏插在搜索框下方、搜索结果上方，随页面滚动，不固定到顶端
- 另一个引擎排在前面，当前站点排在后面；当前站点渲染成不可点的文字，另一个是链接，点一下带着关键词跳到对方
- Google 的结果区是前端渲染的，锚点晚到或被重绘时会自动重新对齐；页面内换关键词后链接同步更新
- 跟随页面深浅色自动切换文字颜色

## 依赖

无。单个 `.user.js` 文件，不加载任何远程资源，图标是内联的 SVG data URI。

## 许可

MIT。
