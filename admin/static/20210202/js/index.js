// import './header_box.js';
// import './swiper_container_home.js';
// import './news_box.js';

/* 更多按钮的动画处理 */
let commMoreArrows = Array.from(document.querySelectorAll('.comm-more-arrow'));
commMoreArrows.forEach(item => {
    let parent = item.parentNode;
    if (!parent) return;
    parent.addEventListener('mouseenter', () => item.classList.add('move'));
    parent.addEventListener('mouseleave', () => item.classList.remove('move'));
});