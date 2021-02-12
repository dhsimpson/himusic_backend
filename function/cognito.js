require('dotenv').config();

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
module.exports.login = async function login(username, password, userLevel, res) {
    let userPool;
    if (userLevel === "admin") { userPool = adminUserPool; }
    else if (userLevel === "normal") { userPool = normalUserPool; }
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    const authenticationData = {
        Username: username,
        Password: password,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    try {
        await cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: async function (result) {

                await cognitoUser.getUserAttributes((err,data) => {
                    if(err){ res.send(err); } 
                    else if(data){
                        result.nickname = data[2].Name.Value;
                        res.send(result);
                    }});

                // var accessToken = result.getAccessToken().getJwtToken();
            },
            onFailure: async function (err) {
                res.send(err);
            }
        });
    } catch (err) {
        res.send({ success: failure, error: err });
    }
}

// 회원 가입
module.exports.singup = async function singup(username, password, email, nickname, userLevel, res) {
    let userPool;
    if (userLevel === "admin") { userPool = adminUserPool; }
    else if (userLevel === "normal") { userPool = normalUserPool; }
    const userData = {
        Username: username,
        Pool: userPool
    }
    const attributeList = [];
    const attributeEmail = new CognitoUserAttribute("email", email);
    const attributeNickname = new CognitoUserAttribute("nickname", nickname);
    attributeList.push(attributeEmail);
    attributeList.push(attributeNickname);
    try {
        await userPool.signUp(username, password, attributeList, null, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                const resultCognitoUser = result.user;
                res.send(resultCognitoUser.getUsername());
            }
        });
    } catch (err) {
        res.send({ success: "failure", error: err });
    }
}


// 회원 가입 이메일 인증 코드
module.exports.confirm = async function confirm(username, confirmCode, userLevel, res) {
    let userPool;
    if (userLevel === "admin") { userPool = adminUserPool; }
    else if (userLevel === "normal") { userPool = normalUserPool; }
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    try {
        await cognitoUser.confirmRegistration(confirmCode, true, function (err, result) {
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

let userPool = normalUserPool;

const userData = {
    Username: "dongdong",
    Pool: userPool
}
const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

// const getAtt = async() => {await cognitoUser.getUserAttributes((err,data) => {
// if(err) console.log("에러놈 :"+ err);
// if(data) console.log(data);
// } )
// }

// getAtt();