const express = require('express');
const router = express.Router();

const cognito = require('../function/cognito');

// 회원 관련
router.post('/login', async (req,res) => {
    const {username, password} = req.body;
    await cognito.login(username, password, res);
});
router.post('/signup', async (req,res) => { // c.f. 닉네임도 할지?
    const {username, password, email} = req.body;
    await cognito.singup(username, password, email, res);
});
router.post('/confirm', async (req,res) => {
    const {username, confirmCode} = req.body;
    await cognito.confirm(username, confirmCode, res);
})
router.post('/resendCode', async (req,res) => {
    const { username } = req.body;
    await cognito.resendCode(username, res);
})

//TODO : 토큰 만료 시 새로 토큰 가져오기
//TODO : 회원 정보 변경하기
// app.get('/getToken', async (req,res) => {
//     const {username, confirmCode} = req.query;
//     await cognito.confirm(username, confirmCode, res);
// })

module.exports = router;