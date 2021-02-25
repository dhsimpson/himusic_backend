const axios = require("axios");
const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/board";
// c.f. FE의 axios도 then.catch 로 처리해주기
// 게시글 저장할 때 index 어떻게 할 지 고민해 보기.
// Create
module.exports.postBoard = async function postBoard(_body, res) {
    const body = {
        "body": {
            "tableName": "himusic_"+_body.tableName,
            "rowkey": _body.rowkey,
            "author": _body.author, 
            "title": _body.title,
            "files": _body.files,
            "year": _body.year,
            "month": _body.month,
            "date": _body.date
        }
    }
    console.log("bodybody");
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

// read
// 게시글 key index들 가지고 오기
module.exports.readRowKey = async function readRowKey(query, res) {
    const postQueryUrl = `${url}?tableName=himusic_${query.tableName}&getRowKey=${true}`;
    try{
        await axios.get(postQueryUrl)
        .then( data =>res.send(data.data.data))
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}
// 게시글 리스트 가지고 오기
module.exports.readBoard = async function readBoard(query, res) {
    // console.log(query);
    // "startTimestamp": 1613661360093,
    // "endTimestamp": 1613661415652
    const postQueryUrl = `${url}?tableName=himusic_${query.tableName}&startTimestamp=${query.startTimestamp}&endTimestamp=${query.endTimestamp}`;
    try{
        await axios.get(postQueryUrl)
        .then( data =>res.send(data.data.data))
        .catch(error => res.send(error));
    }
    catch(err){
        res.send(err);
    }
}

// TODO: 게시판 U, D 는 나중에
// 스켈레톤만 짜놓은 것임
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
