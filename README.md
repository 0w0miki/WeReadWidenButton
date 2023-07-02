# WeReadWidenButton
给微信读书添加2个拓宽和缩窄的按钮

基于[微信读书加宽度优化版](https://greasyfork.org/zh-CN/scripts/462824-%E5%BE%AE%E4%BF%A1%E8%AF%BB%E4%B9%A6%E5%8A%A0%E5%AE%BD%E5%BA%A6%E4%BC%98%E5%8C%96%E7%89%88)修改

主要改动：
* 修改按钮图标
* 使用`GM_setValue`和`GM_getValue`持久化宽度设置
* 添加宽度限制判断 避免宽度增加过多后要点很多下来恢复宽度
* 将按钮添加到原生的按钮列表容器中，简化代码
