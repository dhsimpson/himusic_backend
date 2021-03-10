const axios = require("axios");
require('dotenv').config();
const url = `${process.env.AWS_DB_URL}/board` 

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
            "date": _body.date,
            "authValue": _body.authValue
        }
    }
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
