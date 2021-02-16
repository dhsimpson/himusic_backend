const axios = require("axios");
const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/board";
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
    console.log("타이틀:"+_body.title);
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
