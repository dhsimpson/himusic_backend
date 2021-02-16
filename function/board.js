const axios = require("axios");
const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/board";

// C.F. S3에 이미지/영상 저장하는 것은 직접 S3에 접근 할 지 lambda를 통할 지 결정(어차피 cognito 인증키도 여기 있으니 S3 인증키도 엿다 놓는 게..??)

// c.f. FE의 axios도 then.catch 로 처리해주기
// 게시글 저장할 때 index 어떻게 할 지 고민해 보기.
// Create
module.exports.postBoard = async function postBoard(body, res) {
    body = {
        "body": {
            "tableName": "himusic_"+body.tableName,
            "author": body.author, 
            "title": body.title,
            "keys": body.keys,
            "year": body.year,
            "month": body.month,
            "date": body.date
        }
    }
    console.log(body);
    try{
        await axios.post(url, body)
        .then( data => res.send(data.data) )
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}

// 스켈레톤만 짜놓은 것임
// Read
module.exports.readBoard = async function readBoard(tableName, startIndex, queryAmount, res) {
    // DB에서 startIndex 번 째 게시글 부터 queryAmount 개 만큼 가져오기
    body = {
        "body": {
            "tableName": tableName,
            "startIndex": startIndex,
            "queryAmount": queryAmount
        }
    }
    try{
        await axios.get(url, body)
        .then( data => res.send(data.data) )
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}
// Update
module.exports.updateBoard = async function upadateBoard(tableName, author, updateIndex, title, content, res) {
    // DB에서 startIndex 번 째 게시글 부터 queryAmount 개 만큼 가져오기
    body = {
        "body": {
            "tableName": tableName,
            "author": author, 
            "updateIndex": updateIndex,
            "title": title,
            "content": content
        }
    }
    try{
        await axios.put(url, body)
        .then( data => res.send(data.data) )
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}
// Delete
module.exports.deleteBoard = async function deleteBoard(tableName, author, deleteIndex, res) {
    // DB에서 startIndex 번 째 게시글 부터 queryAmount 개 만큼 가져오기
    body = {
        "body": {
            "tableName": tableName,
            "author": author, 
            "deleteIndex": deleteIndex
        }
    }
    try{
        await axios.delete(url, body)
        .then( data => res.send(data.data) )
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}
