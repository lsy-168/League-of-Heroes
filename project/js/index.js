import './head_box.js';
import './swiper_container_home.js';

// 控制更多按钮的动画效果
let commMoreArrowList = Array.from(document.querySelectorAll('.comm-more-arrow'));
commMoreArrowList.forEach(item => {
    let parent = item.parentNode;
    if (!parent) return;
    parent.addEventListener('mouseenter', function () {
        item.className = 'comm-more-arrow move';
    });
    parent.addEventListener('mouseleave', function () {
        item.className = 'comm-more-arrow';
    });
});