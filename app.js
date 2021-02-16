const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const router_user = require('./route/user');
const router_board = require('./route/board');
const router_post = require('./route/post');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/user', router_user);
app.use('/board', router_board);
app.use('/post', router_post); // post 는 게시글 임. 게시글 + 게시글에 포함 될 파일들을 전부 포함.

app.listen(port, () => {
    console.log('Broker API is listening on port'+port);
});