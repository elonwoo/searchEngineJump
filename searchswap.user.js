// ==UserScript==
// @name         SearchSwap 双搜互跳
// @namespace    https://github.com/elonwoo/searchswap
// @version      1.0.0
// @description  在 Google 与百度搜索结果页之间带关键词互跳
// @author       elonwoo
// @homepageURL  https://github.com/elonwoo/searchswap
// @supportURL   https://github.com/elonwoo/searchswap/issues
// @updateURL    https://raw.githubusercontent.com/elonwoo/searchswap/master/searchswap.user.js
// @downloadURL  https://raw.githubusercontent.com/elonwoo/searchswap/master/searchswap.user.js
// @license      MIT
// @match        *://www.google.com/search*
// @match        *://www.baidu.com/s*
// @include      /^https?:\/\/www\.google\.[a-z]{2,3}(\.[a-z]{2})?\/search/
// @include      /^https?:\/\/www\.baidu\.com\/(s|baidu)\b/
// @grant        none
// @run-at       document-end
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // ---------- 图标 ----------
    var ICON = {
        google: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='48px' height='48px' viewBox='0 0 48 48' enable-background='new 0 0 48 48' xml:space='preserve'%3E%3Cpath fill='%23FFC107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3Cpath fill='%23FF3D00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3E%3Cpath fill='%234CAF50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3E%3Cpath fill='%231976D2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3C/svg%3E%0A",
        baidu: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E",
    };

    // ---------- 引擎 ----------
    // url() 在渲染时才求值：在 Google 上就用当前域名，避免 www.google.com 在部分网络下打不开
    var ENGINES = {
        google: {
            label: 'Google',
            url: function (q) {
                var host = /(^|\.)google\./.test(location.hostname) ? location.hostname : 'www.google.com';
                return 'https://' + host + '/search?q=' + encodeURIComponent(q);
            },
        },
        baidu: {
            label: '百度',
            url: function (q) {
                return 'https://www.baidu.com/s?wd=' + encodeURIComponent(q) + '&ie=utf-8';
            },
        },
    };

    var ORDER = ['google', 'baidu'];

    // ---------- 当前站点 / 关键词 ----------
    function currentEngine() {
        var h = location.hostname;
        if (/(^|\.)google\./.test(h)) return 'google';
        if (/(^|\.)baidu\.com$/.test(h)) return 'baidu';
        return null;
    }

    function getQuery(engine) {
        var p = new URLSearchParams(location.search);
        if (engine === 'baidu') return p.get('wd') || p.get('word') || '';
        var q = p.get('q');
        if (!q && location.hash) {
            // 老版 Google 的 #q=xxx / #&q=xxx
            q = new URLSearchParams(location.hash.replace(/^#&?/, '')).get('q');
        }
        return q || '';
    }

    // ---------- 插入位置 ----------
    // 按顺序找第一个存在的锚点，把跳转栏插成它的第一个子元素（即搜索框下方、结果上方）
    var ANCHORS = {
        google: ['#center_col', '#rcnt', '#search', 'main'],
        baidu: ['#container', '#content_left', '#wrapper_wrapper'],
    };

    function findAnchor(engine) {
        for (var i = 0; i < ANCHORS[engine].length; i++) {
            var el = document.querySelector(ANCHORS[engine][i]);
            if (el) return el;
        }
        return null;
    }

    // ---------- 样式 ----------
    var CSS = [
        '#sej-lite {',
        '    display: flex;',
        '    align-items: center;',
        '    gap: 2px;',
        '    margin: 8px 0 12px;',
        '    font: 13px/1.6 arial, "PingFang SC", "Microsoft YaHei", sans-serif;',
        '    color: #202124;',
        '}',
        '#sej-lite > * {',
        '    display: inline-flex;',
        '    align-items: center;',
        '    gap: 5px;',
        '    padding: 3px 10px;',
        '    border-radius: 4px;',
        '    text-decoration: none;',
        '    color: inherit;',
        '    transition: background-color .15s;',
        '}',
        '#sej-lite img {',
        '    width: 16px;',
        '    height: 16px;',
        '    display: block;',
        '}',
        '#sej-lite a:hover { background: rgba(0, 0, 0, .07); }',
        '#sej-lite .sej-cur { background: rgba(0, 0, 0, .06); font-weight: 600; cursor: default; }',
        // 深色页面：Google 的深色模式不跟随系统，只能按页面实际背景判断
        '#sej-lite.sej-dark { color: #e8eaed; }',
        '#sej-lite.sej-dark a:hover { background: rgba(255, 255, 255, .12); }',
        '#sej-lite.sej-dark .sej-cur { background: rgba(255, 255, 255, .1); }',
    ].join('\n');

    // 沿祖先链找到第一个不透明的背景色，判断是不是深色页面
    function isDarkPage(el) {
        for (var n = el; n && n.nodeType === 1; n = n.parentElement) {
            var c = getComputedStyle(n).backgroundColor;
            var m = /rgba?\(([^)]+)\)/.exec(c);
            if (!m) continue;
            var p = m[1].split(',').map(function (v) { return parseFloat(v); });
            if (p.length > 3 && p[3] === 0) continue;
            return (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) < 128;
        }
        return false;
    }

    function injectStyle() {
        if (document.getElementById('sej-lite-style')) return;
        var s = document.createElement('style');
        s.id = 'sej-lite-style';
        s.textContent = CSS;
        (document.head || document.documentElement).appendChild(s);
    }

    // ---------- 构建跳转栏 ----------
    // 当前引擎渲染成不可点的 span，另一个是链接，形成互跳
    function buildBar(engine, q) {
        var bar = document.createElement('div');
        bar.id = 'sej-lite';
        ORDER.forEach(function (key) {
            var e = ENGINES[key];
            var node = document.createElement(key === engine ? 'span' : 'a');
            if (key === engine) {
                node.className = 'sej-cur';
            } else {
                node.href = e.url(q);
                node.title = '用' + e.label + '搜索「' + q + '」';
            }
            var img = document.createElement('img');
            img.src = ICON[key];
            img.alt = '';
            node.appendChild(img);
            node.appendChild(document.createTextNode(e.label));
            bar.appendChild(node);
        });
        return bar;
    }

    // ---------- 挂载 ----------
    var bar = null;

    function mount() {
        var engine = currentEngine();
        if (!engine) return;
        var q = getQuery(engine);
        if (!q) return;
        var anchor = findAnchor(engine);
        if (!anchor) return;
        // 已经在最优位置且关键词没变，什么都不做
        if (bar && bar.isConnected && bar.parentElement === anchor &&
            bar.dataset.engine === engine && bar.dataset.q === q) return;
        if (bar) bar.remove();
        injectStyle();
        bar = buildBar(engine, q);
        bar.dataset.engine = engine;
        bar.dataset.q = q;
        anchor.insertAdjacentElement('afterbegin', bar);
        bar.classList.toggle('sej-dark', isDarkPage(anchor));
    }

    // 首屏可能还没渲染出锚点，失败就退避重试，最多约 10 秒
    var tries = 0;
    (function ensure() {
        mount();
        if (!bar && tries++ < 20) setTimeout(ensure, 500);
    })();

    // Google 是前端渲染，结果区会被局部重绘；页面内搜索还会原地换关键词。
    // 统一节流后重新对齐，挂丢了补回、关键词变了重建。
    var lastCheck = 0;
    function sync() {
        var now = Date.now();
        if (now - lastCheck < 500) return;
        lastCheck = now;
        mount();
    }
    new MutationObserver(sync).observe(document.body || document.documentElement, {
        childList: true,
        subtree: true,
    });
    window.addEventListener('pageshow', function () { setTimeout(mount, 200); });
    window.addEventListener('popstate', function () { setTimeout(mount, 300); });
})();
