const express = require('express');
const router = express.Router();

const cognito = require('../function/cognito');

// 회원 관련
router.post('/login', async (req, res) => {
    const { username, password, userLevel } = req.body;
    await cognito.login(username, password, userLevel, res);
});
router.post('/signup', async (req, res) => {
    const { username, password, email, nickname, userLevel } = req.body;
    await cognito.singup(username, password, email,nickname, userLevel, res);
});
router.post('/confirm', async (req, res) => {
    const { username, confirmCode, userLevel } = req.body;
    await cognito.confirm(username, confirmCode, userLevel, res);
})
router.post('/resendCode', async (req, res) => {
    const { username, userLevel } = req.body;
    await cognito.resendCode(username, userLevel, res);
})

router.post('/auth', async(req,res)=>{
    await cognito.auth(req.body, res);
})

//TODO : 토큰 만료 시 새로 토큰 가져오기
//TODO : 회원 정보 변경하기
// app.get('/getToken', async (req,res) => {
//     const {username, confirmCode} = req.query;
//     await cognito.confirm(username, confirmCode, res);
// })

module.exports = router;