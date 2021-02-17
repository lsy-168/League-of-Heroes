import http from './http.js';

let swiperContainerHome = document.querySelector('#swiper-container-home'),
    swiperWrapper = swiperContainerHome.querySelector('.swiper-wrapper'),
    swiperPagination = swiperContainerHome.querySelector('.swiper-pagination'),
    swiperPaginationList = [];

let autoTimer = null,
    interval = 3000,
    step = 0,
    count = 0;

// 发送ajax请求获取数据
http.get('/home_banner').then(data => {
    // 处理一些基础样式
    count = data.length + 1;
    swiperWrapper.style.width = `${count*800}px`;
    swiperWrapper.style.left = `${-step*800}px`;
    swiperContainerHome.classList.remove('loading');

    // 数据动态绑定
    bindHTML(data);

    // 重新获取一些元素
    swiperPaginationList = Array.from(swiperPagination.querySelectorAll('span'));

    // 开启轮播控制
    if (count <= 2) return;
    autoTimer = setInterval(autoMove, interval);
    swiperContainerHome.addEventListener('mouseenter', function () {
        clearInterval(autoTimer);
    });
    swiperContainerHome.addEventListener('mouseleave', function () {
        autoTimer = setInterval(autoMove, interval);
    });

    // 分页切换
    swiperPaginationList.forEach((item, index) => {
        item.addEventListener('mouseenter', function () {
            step = index;
            swiperWrapper.style.transitionDuration = '.3s';
            swiperWrapper.style.left = `${-step*800}px`;
            autoPagination();
        });
    });
});

// 数据动态绑定
const bindHTML = function bindHTML(data) {
    let str_slide = ``,
        str_pagination = ``,
        first = data[0];
    data.forEach((item, index) => {
        str_slide += `<div class="swiper-slide">
            <a href="${item.href}" target="_blank">
                <img src="${item.pic}" alt="${item.title}">
            </a>
        </div>`;

        str_pagination += `<span class="${index===step?'active':''}">
            ${item.title}
        </span>`;
    });
    // 第一张放到末尾
    str_slide += `<div class="swiper-slide">
        <a href="${first.href}" target="_blank">
            <img src="${first.pic}" alt="${first.title}">
        </a>
    </div>`;
    // 插入到页面中
    swiperWrapper.innerHTML = str_slide;
    swiperPagination.innerHTML = str_pagination;
};

// 自动轮播
const autoMove = function autoMove() {
    step++;
    if (step >= count) {
        swiperWrapper.style.transitionDuration = '0s';
        swiperWrapper.style.left = '0px';
        step = 1;
        swiperWrapper.offsetWidth;
    }
    swiperWrapper.style.transitionDuration = '.3s';
    swiperWrapper.style.left = `${-step*800}px`;
    autoPagination();
};

// 分页对齐
const autoPagination = function autoPagination() {
    let temp = step;
    if (temp === count - 1) temp = 0;
    swiperPaginationList.forEach((item, index) => {
        if (index === temp) {
            item.className = 'active';
            return;
        }
        item.className = '';
    });
};