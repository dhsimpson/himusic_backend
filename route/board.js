const express = require('express');
const router = express.Router();
const multer = require('multer');

const board = require('../function/board');
const s3 = require('../function/s3');
const fs = require('fs');

// 파일
//s3.upload.single('file')
router.post('/upload', s3.upload.fields([{name:'content'},{name:'file'},{name:'video'}]), async(req,res)=>{
    res.send({
        success:1,
        keys: req.files // front에서 다시 한 번 서버에 전달하고 서버가 dynamo에 전달
    });
})

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
router.put('/update', async (req,res) => {
    const { tableName, author, updateIndex, title, content } = req.body;
    await board.updateBoard(tableName, author, updateIndex, title, content, res);
})
router.delete('/delete', async (req,res) => {
    const { tableName, author, deleteIndex } = req.body;
    await board.deleteBoard(tableName, author, deleteIndex, res);
})

module.exports = router;