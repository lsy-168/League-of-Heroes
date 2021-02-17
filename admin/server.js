const express = require('express'),
    fs = require('fs'),
    package = require('./package.json');

/*-CREATE SERVER-*/
const app = express(),
    PORT = package.port || 8888;
app.listen(PORT, () => {
    console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${PORT}!`);
});

/*-中间件-*/
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    req.method === 'OPTIONS' ? res.send() : next();
});

/*-API-*/
const delay = function delay(interval) {
    typeof interval !== "number" ? interval = 1000 : null;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};
let API = ["home_banner", "news_item", "hot_events", "skin", "week_free", "latest_video", "hit_album", "match", "best_team", "league_table", "hero_info", "creation_hall", "asso_media"];
API.forEach(name => {
    app.get(`/${name}`, async (req, res) => {
        // 设置延迟函数目的：模拟出客户端和服务器之间的通信时间
        await delay(Math.round(Math.random() * (2000 - 100) + 100));
        // 读取数据并且返回给客户端
        let content = fs.readFileSync(`${__dirname}/mock/${name}.json`, 'utf-8');
        res.send(content);
    });
});
app.use(express.static('./static'));
app.use((req, res) => {
    res.status(404);
    res.send('NOT FOUND!');
});