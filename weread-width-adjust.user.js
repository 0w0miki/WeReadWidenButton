// ==UserScript==
// @name         微信读书加宽度优化版
// @namespace    在原作者yw基础上优化
// @version      1.0
// @description  微信读书宽度调整，能存储设置
// @author       miki0w0
// @match        https://weread.qq.com/web/reader/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @license      GPL-3.0-only
// ==/UserScript==

(function () {
  "use strict";

  const content = $(".readerContent .app_content");
  const topBar = $(".readerContent .readerTopBar");

  // 基础方法
  function $(selector) {
    return document.querySelector(selector);
  }

  function changeWidth(increse) {
    changeContentWidth(increse);
    window.dispatchEvent(new Event("resize"));
  }

  function limitValue(value, lower, upper) {
    return Math.min(Math.max(value, lower), upper)
  }

  function changeContentWidth(increse) {
    const step = 100;
    const maxWidth = window.innerWidth, minWidth = maxWidth / 4;
    const currentValue = content.offsetWidth;
    let changedValue;

    if (increse) {
      changedValue = currentValue + step;
    } else {
      changedValue = currentValue - step;
    }
    changedValue = limitValue(changedValue, minWidth, maxWidth);
    GM_setValue('wereadWidth', changedValue);
    content.style.maxWidth = `${changedValue}px`;
    topBar.style.maxWidth = `${changedValue}px`;
  }

  function initMenus() {
    // 添加内容
    let buttons = ``;
    buttons += `<button id='widenButton' class="readerControls_item widen"><span class="tabler-icons">&#xebf4;</span></button>`;
    buttons += `<button id='narrowButton' class="readerControls_item narrow"><span class="tabler-icons">&#xebf3;</span></button>`;
    $('.readerControls.readerControls').insertAdjacentHTML('afterbegin', buttons);
    // 添加样式
    GM_addStyle(`
        @import url(https://cdn.jsdelivr.net/npm/@tabler/icons-webfont/tabler-icons.min.css);
        .tabler-icons {
            font-family: "tabler-icons";
            font-size: 23px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
    `);
    // 添加监听
    $("#widenButton").addEventListener("click", () => changeWidth(true));
    $("#narrowButton").addEventListener("click", () => changeWidth(false));
  };

  function initWidth() {
    const width = GM_getValue('wereadWidth', 1000);
    content.style.maxWidth = `${width}px`;
    topBar.style.maxWidth = `${width}px`;
  }

  initWidth();
  initMenus();
})();
