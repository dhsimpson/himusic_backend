const express = require('express');
const router = express.Router();

const board = require('../function/board');

// 회원 관련
router.post('/create', async (req,res) => {
    const { tableName, author, title, content } = req.body;
    await board.createBoard(tableName, author, title, content, res);
});
router.get('/read', async (req,res) => { // c.f. 닉네임도 할지?
    const { tableName, startIndex, queryAmount } = req.body;
    await board.readBoard(tableName, startIndex, queryAmount, res);
});
router.update('/update', async (req,res) => {
    const { tableName, author, updateIndex, title, content } = req.body;
    await board.updateBoard(tableName, author, updateIndex, title, content, res);
})
router.delete('/delete', async (req,res) => {
    const { tableName, author, deleteIndex } = req.body;
    await board.deleteBoard(tableName, author, deleteIndex, res);
})

module.exports = router;