import http from './http.js';

let swpConHome = document.querySelector('#swiper-container-home'),
    wrapper = swpConHome.querySelector('.swiper-wrapper'),
    pagination = swpConHome.querySelector('.swiper-pagination'),
    paginationList = [];

// step:记录当前展示这一项的索引
// count:记录slide数量「包含克隆的那一个」
// slideW:记录每一个slide的宽度
// interval:轮播图自动运动间隔时间
// autoTimer:记录自动轮播的定时器
let step = 0,
    count = 0,
    slideW = swpConHome.offsetWidth,
    interval = 2000,
    autoTimer = null;

// 数据绑定
const binding = function binding(data) {
    let str_slide = ``,
        str_pagination = ``,
        first = data[0];
    data.forEach((item, index) => {
        str_slide += `<div class="swiper-slide">
            <a href="${item.href}" target="_blank">
                <img src="${item.pic}" alt="${item.title}">
            </a>
        </div>`;

        str_pagination += `<span index="${index}" class="${index===step?'active':''}">
            ${item.title}
        </span>`;
    });
    // 为了实现无缝衔接，我们需要把第一张克隆一份放置在容器的末尾
    if (first) {
        str_slide += `<div class="swiper-slide">
            <a href="${first.href}" target="_blank">
                <img src="${first.pic}" alt="${first.title}">
            </a>
        </div>`;
    }
    wrapper.innerHTML = str_slide;
    pagination.innerHTML = str_pagination;
};

// 开启自动轮播
const autoMove = function autoMove() {
    step++;
    if (step >= count) {
        // 当前处于克隆的这一张：让其立即运动到真实的第一张「视觉差」，运动完之后，再让其运动到第二张「索引为1」
        wrapper.style.transitionDuration = `0s`;
        wrapper.style.left = `0px`;
        step = 1;
        wrapper.offsetWidth; //刷新浏览器的渲染队列
    }
    wrapper.style.transitionDuration = `.3s`;
    wrapper.style.left = `${-step*slideW}px`;
    paginationAlign();
};

// 实现分页器对齐
const paginationAlign = function paginationAlign() {
    let temp = step;
    temp === count - 1 ? temp = 0 : null;
    paginationList.forEach((item, index) => {
        item.className = index === temp ? 'active' : '';
    });
};

// 分页器切换
const paginationHandle = function paginationHandle() {
    /* paginationList.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            step = index;
            wrapper.style.transitionDuration = `.3s`;
            wrapper.style.left = `${-step*slideW}px`;
            paginationAlign();
        });
    }); */
    pagination.addEventListener('mouseover', function (ev) {
        let target = ev.target,
            index = +target.getAttribute('index');
        if (target.tagName === 'SPAN') {
            // 获取对应SPAN的索引「动态数据绑定的时候知道索引，基于自定义属性，在这个阶段把索引存储起来，后期需要用到索引的时候，我们则基于自定义属性获取即可」
            step = index;
            wrapper.style.transitionDuration = `.3s`;
            wrapper.style.left = `${-step*slideW}px`;
            paginationAlign();
        }
    });
};

// 向服务器发送请求，从服务器获取数据「data：获取的数据信息」
http.get('/home_banner').then(data => {
    binding(data);
    // 一些额外的处理
    swpConHome.classList.remove('loading');
    count = data.length + 1;
    wrapper.style.width = `${count*slideW}px`;
    wrapper.style.left = `${-step*slideW}px`;
    paginationList = Array.from(pagination.querySelectorAll('span'));

    // 开启自动轮播
    autoTimer = setInterval(autoMove, interval);

    // 控制自动轮播
    swpConHome.addEventListener('mouseenter', () => clearInterval(autoTimer));
    swpConHome.addEventListener('mouseleave', () => autoTimer = setInterval(autoMove, interval));

    // 分页器切换
    paginationHandle();
});