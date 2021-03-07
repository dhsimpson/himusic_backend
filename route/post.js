const express = require('express');
const router = express.Router();

const board = require('../function/board');
const post = require('../function/post');

// 게시글 한 개 읽어오기
router.get('/readPost', async(req,res) => {
    await post.readPost(req.query, res);
} );
// 데이터 (content, file, video)
router.get('/readData', async(req,res) => {
    await post.readData(req.query, res);
} );
router.put('/update', async (req,res) => {
    // console.log("update");
    // console.log(req.body);
    // 여기로 data가 왔는데, files에 content, file, video중에 추가or수정 된 놈이 있음
    // 수정 된 놈이라면 해당 요소를 s3에서 지우고 lambda에선 undefined가 아닌 column 내용만 수정하면 됨
    await post.updatePost(req.body, res);
})
router.delete('/delete', async (req,res) => {
    const { tableName, author, deleteIndex } = req.body;
    await post.deletePost(tableName, author, deleteIndex, res);
})

module.exports = router;