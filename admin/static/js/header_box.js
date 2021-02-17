/* 更多按钮的动画处理 */
let commMoreArrows = Array.from(document.querySelectorAll('.comm-more-arrow'));
commMoreArrows.forEach(item => {
    let parent = item.parentNode;
    if (!parent) return;
    parent.addEventListener('mouseenter', function () {
        item.style.animation = 'comm-more-arrow 1.5s infinite both';
    });
    parent.addEventListener('mouseleave', function () {
        item.style.animation = 'none';
    });
});

/* 导航滑过显示详情「事件委托」 */
let headerBox = document.querySelector('.header-box'),
    commHeadNavHover = headerBox.querySelector('.comm-head-nav-hover');
const queryParents = ele => {
    let arr = [ele],
        parent = ele.parentNode;
    while (parent) {
        arr.unshift(parent);
        parent = parent.parentNode;
    }
    return arr;
};
document.addEventListener('mouseover', function (ev) {
    let target = ev.target,
        parents = queryParents(target),
        isHeadNav,
        isCommHeadNavHover;
    parents.forEach(item => {
        if (item.classList && item.classList.contains('head-nav')) isHeadNav = true;
        if (item.classList && item.classList.contains('comm-head-nav-hover')) isCommHeadNavHover = true;
    });
    // 鼠标处于HEAD-NAV区域:我们显示详情
    if (isHeadNav) {
        commHeadNavHover.style.display = 'block';
        commHeadNavHover.style.animation = 'app-normal-detail .2s both';
        return;
    }
    // 鼠标处于详情区域:我们啥也不处理
    if (isCommHeadNavHover) return;
    // 其余情况都是让其消失
    commHeadNavHover.style.display = 'none';
    commHeadNavHover.style.animation = 'none';
});