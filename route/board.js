const express = require('express');
const router = express.Router();
const multer = require('multer');

const board = require('../function/board');
const s3 = require('../function/s3');
const fs = require('fs');

// 파일
//s3.upload.single('file')
router.post('/upload', s3.upload.fields([{name:'content'},{name:'file'},{name:'video'}]), async(req,res)=>{
    console.log(req.files);
    res.send({
        success:1,
        keys: req.files // front에서 다시 한 번 서버에 전달하고 서버가 dynamo에 전달
    });
    // s3.upload(req, res, function(err) {
    //     if (err instanceof multer.MulterError) {
    //       return next(err);
    //     } else if (err) {
    //       return next(err);
    //     }
    //     // console.log('원본파일명 : ' + req.file.originalname)
    //     // console.log('저장파일명 : ' + req.file.filename)
    //     // console.log('크기 : ' + req.file.size)
    //     // console.log('경로 : ' + req.file.location) 
    //     return res.json({success:1});
    //   });
})

// 게시글 한 개 읽어오기
router.get('/readPost', async(req,res) => {
    await board.readPost(req.query, res);
} );
// 데이터 (content, file, video)
router.get('/readData', async(req,res) => {
    await board.readData(req.query, res);
} );

// 게시판
router.post('/post', async (req,res) => {
    // const { tableName, author, title, keys, month, date } = req.body;
    await board.postBoard(req.body, res);
});
router.get('/read', async (req,res) => { // c.f. 닉네임도 할지?
    const { tableName, startIndex, queryAmount } = req.body;
    await board.readBoard(tableName, startIndex, queryAmount, res);
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