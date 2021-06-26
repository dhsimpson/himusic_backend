const express = require('express');
const router = express.Router();
const multer = require('multer');

const board = require('../function/board');
const s3 = require('../function/s3');
const fs = require('fs');

// 파일
//s3.upload.single('file')
router.post('/upload', s3.upload.fields([{name:'content'},{name:'file'}]), async(req,res)=>{
    res.send({
        success:1,
        files: req.files // front에서 다시 한 번 서버에 전달하고 서버가 dynamo에 전달
    });
});


// 게시판 글 등록
router.post('/post', async (req,res) => {
    await board.postBoard(req.body, res);
});
router.get('/scan', async(req,res) => {
    await board.readRowKey(req.query, res);
})
// 게시판 리스트 가져옴
router.get('/read', async (req,res) => {
    await board.readBoard(req.query, res);
});


module.exports = router;