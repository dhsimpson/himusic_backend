require('dotenv').config();

var AmazonCognitoIdentity = require('amazon-cognito-identity-js-node');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;
// 이 두 개는 환경 변수에 넣기.
const UserPoolId = process.env.UserPoolId;
const ClientId = process.env.ClientId;
const poolData = {
    UserPoolId,
    ClientId
}
const userPool = new CognitoUserPool(poolData);

// 로그인
module.exports.login = async function login (username, password, res) {
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
        try{
            await cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: async function (result) {
                    res.send(result);
                    // var accessToken = result.getAccessToken().getJwtToken();
                },
                onFailure: async function (err) {
                    res.send(err);
                }
            });
        }catch(err) {
            res.send({success:failure, error: err});
        }
}

// 회원 가입
module.exports.singup = async function singup (username, password, email, res) {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const attributeList = [];
    const attributeEmail = new CognitoUserAttribute("email", email);
    attributeList.push(attributeEmail);
    try{
        await userPool.signUp(username, password, attributeList, null, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                const resultCognitoUser = result.user;
                res.send(resultCognitoUser.getUsername());
            }
        });
    }catch (err){
        res.send({success: "failure", error: err});
    }
}


// 회원 가입 이메일 인증 코드
module.exports.confirm = async function confirm (username, confirmCode, res) {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    try{
        await cognitoUser.confirmRegistration(confirmCode, true, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }catch(err) {
        res.send(err);
    }
}

// 회원 가입 인증 코드 재전송
module.exports.resendCode = async function resendCode (username, res) {
    const userData = {
        Username: username,
        Pool: userPool
    }
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
    try{
        await cognitoUser.resendConfirmationCode(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        })
    }catch(err) {
        res.send(err);
    }
}
