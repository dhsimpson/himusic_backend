require('dotenv').config({path: './.env'});
const axios = require("axios");
const sha1 = require("sha1");

var AmazonCognitoIdentity = require('amazon-cognito-identity-js-node');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;
// Admin 계정의 경우
const adminUserPoolId = process.env.adminUserPoolId;
const adminClientId = process.env.adminClientId;
const adminPoolData = {
    UserPoolId: adminUserPoolId,
    ClientId: adminClientId
}
const adminUserPool = new CognitoUserPool(adminPoolData);

// Normal 계정의 경우
const normalUserPoolId = process.env.normalUserPoolId;
const normalClientId = process.env.normalClientId;
const normalPoolData = {
    UserPoolId: normalUserPoolId,
    ClientId: normalClientId
}
const normalUserPool = new CognitoUserPool(normalPoolData);

// 로그인
module.exports.login = async function login(id, password, res) {
    const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/auth";
    const body = {
        "body": {
            "tableName": "himusic_user",
            "id": id,
            "password": password
        }
    }
    
    await axios.post(url, body)
        .then( async(result) => {
            if (result.data.statusCode === 500) {
                res.send({status: 500});
            }
            else{
                res.send({status: 200, data: result.data.data.Item});
            }
        })
        .catch(error => res.send({status: 500}));
}

// TODO: 회원 중복을 막기 위한 코딩 - username 변경하거나 회원 탈퇴 시 dynamodb에서 처리하기
// 회원 가입
module.exports.singup = async function singup(id, password, email, nickname, name, phone, userLevel, branch, res) {
    const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/users";
    const token = sha1(id+ password+ email+ nickname+ name+ phone+ userLevel+ Date.now());
    const body = {
        "body": {
            "tableName": "himusic_user",
            "id": id,
            "password": password, 
            "email": email, 
            "nickname": nickname, 
            "name": name, 
            "phone": phone, 
            "token": token,
            "userLevel": userLevel,
            "branch": branch
        }
    };

    await axios.post(url, body)
        .then( async(result) => {
            console.log(result)
            if (result.data.statusCode === 500) {
                res.send({status: 500});
            }
            else{
                res.send({status: 200});
            }
        })
        .catch(error => res.send({status: 500}));
}


// 회원 가입 이메일 인증 코드
module.exports.confirm = async function confirm(id, token, res) {
    const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/users";
    const body = {
        body:{
            tableName: "himusic_user",
            id: id,
            token: token
        }
    }
    await axios.put(url, body)
    .then( async(result) => {
        console.log(result)
        if (result.data.statusCode === 500) {
            res.send({status: 500});
        }
        else{
            res.send({status: 200});
        }
    })
    .catch(error => res.send({status: 500}));
}

module.exports.authAdmin = async function authAdmin(id, password, res) {
    const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/auth";
    const body = {
        "body": {
            "tableName": "himusic_user",
            "id": id,
            "password": password
        }
    }
    
    await axios.post(url, body)
        .then( async(result) => {
            if (result.data.statusCode === 500 || result.data.data.Item.userLevel !== "admin") {
                res.send({status: 500});
            }
            else{
                res.send({status: 200});
            }
        })
        .catch(error => res.send({status: 500}));
}

// 회원 가입 인증 코드 재전송
module.exports.resendCode = async function resendCode(username, userLevel, res) {
    let userPool;
    if (userLevel === "admin") { userPool = adminUserPool; }
    else if (userLevel === "normal") { userPool = normalUserPool; }
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    try {
        await cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    } catch (err) {
        res.send(err);
    }
}

module.exports.auth = async function auth(_body, res) {
    const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/users";
    const postQueryUrl = `${url}?tableName=${_body.tableName}&rowkey=${_body.rowkey}`;

    await axios.get(postQueryUrl)
        .then( async(result) => {
            if(result.data.Item.authValue === _body.authValue ){console.log("둘이 같음"); res.send({success:true});}
            else{res.send({success:false});}
        })
        .catch(error => res.send(error));
}

// let userPool = normalUserPool;

// const userData = {
//     Username: "dongdong",
//     Pool: userPool
// }
// const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);