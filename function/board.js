const axios = require("axios");
const s3 = require('./s3');
const boardUrl = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/board";
const postUrl = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/post"; // 게시글 하나에 대한 것

// C.F. S3에 이미지/영상 저장하는 것은 직접 S3에 접근 할 지 lambda를 통할 지 결정(어차피 cognito 인증키도 여기 있으니 S3 인증키도 엿다 놓는 게..??)

// c.f. FE의 axios도 then.catch 로 처리해주기
// 게시글 저장할 때 index 어떻게 할 지 고민해 보기.
// Create
module.exports.postBoard = async function postBoard(_body, res) {
    const body = {
        "body": {
            "tableName": "himusic_"+_body.tableName,
            "author": _body.author, 
            "title": _body.title,
            "keys": _body.keys,
            "year": _body.year,
            "month": _body.month,
            "date": _body.date
        }
    }
    // console.log(body);
    try{
        await axios.post(boardUrl, body)
        .then( data => res.send(data.data) )
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}

// 스켈레톤만 짜놓은 것임
// Read
// 게시글 머릿부분만 리스트 가지고 오기
module.exports.readBoard = async function readBoard(tableName, startIndex, queryAmount, res) {
    // DB에서 startIndex 번 째 게시글 부터 queryAmount 개 만큼 가져오기
    const body = {
        "body": {
            "tableName": tableName,
            "startIndex": startIndex,
            "queryAmount": queryAmount
        }
    }
    try{
        await axios.get(boardUrl, body)
        .then( data => res.send(data.data) )
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}
// 게시글 한 개 읽어 오기
module.exports.readPost = async function readPost(query, res){
    const postQueryUrl = `${postUrl}?tableName=${query.tableName}&index=${query.index}`
    try{
        await axios.get(postQueryUrl)
        .then( (data) => {
            // console.log(data);
            res.send(data.data.Item); // c.f. 새로 content, file, video 받아오는 메서드 만들어줘야 함
        })
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}
module.exports.readData = async function readData(query, res) {
    await s3.getData(query.key, res);
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
        await axios.put(boardUrl, body)
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
        await axios.delete(boardUrl, body)
        .then( data => res.send(data.data) )
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}
