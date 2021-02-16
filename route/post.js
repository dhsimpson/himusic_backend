const express = require('express');
const router = express.Router();

const post = require('../function/post');

// 게시글 한 개 읽어오기
router.get('/readPost', async(req,res) => {
    await post.readPost(req.query, res);
} );
// 데이터 (content, file, video)
router.get('/readData', async(req,res) => {
    await post.readData(req.query, res);
} );

module.exports = router;