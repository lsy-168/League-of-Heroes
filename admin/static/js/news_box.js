import http from './http.js';

let newsBox = document.querySelector('#news-box'),
    bindBox = newsBox.querySelector('.bind-box'),
    newsMore = newsBox.querySelector('.news_more');

// 数据绑定
const bindHTML = function bindHTML(data) {
    let str = ``;
    // 页卡
    str += `<ul class="news-tab">
        ${data.map((item,index)=>{
            return `<li class="${index===0?'active':''}">
                ${item.name}
            </li>`;
        }).join('')}
    </ul>`;
    
    // 内容
    str += `<div class="news-content">
        ${data.map((item,index)=>{
            return `<ul class="${index===0?'active':''}">
                ${item.data.map((cur,i)=>{
                    if(i===0){
                        return `<li class="item sprit_index">
                            <a class="text-clip" href="${cur.href}" target="_blank">${cur.title}</a>
                        </li>`;
                    }
                    return `<li class="item">
                        <span class="item-type ${cur.type==='视频'?'video':''}">${cur.type}</span>
                        <a class="text-clip" href="${cur.href}" target="_blank">${cur.title}</a>
                        <span class="item-time">${cur.time}</span>
                    </li>`;
                }).join('')} 
            </ul>`;
        }).join('')} 
    </div>`;
    bindBox.innerHTML = str;
};

// 页卡切换
const handle = function handle() {
    let contentList = bindBox.querySelectorAll('.news-content ul'),
        navList = bindBox.querySelectorAll('.news-tab li'),
        prevIndex = 0;
    navList.forEach((item, index) => {
        item.addEventListener('mouseenter', function () {
            if (prevIndex === index) return;
            navList[index].className = 'active';
            navList[prevIndex].className = '';
            contentList[index].className = 'active';
            contentList[prevIndex].className = '';
            prevIndex = index;
        });
    });
};

// 请求数据
http.get('/news_item').then(data => {
    newsBox.classList.remove('loading');
    newsMore.style.display = 'block';
    bindHTML(data);
    handle();
});