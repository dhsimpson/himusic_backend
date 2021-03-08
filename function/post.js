const axios = require("axios");
const s3 = require('./s3');
require('dotenv').config();
const url = `${process.env.AWS_DB_URL}/post`

// 게시글 한 개 읽어 오기
module.exports.readPost = async function readPost(query, res){
    const postQueryUrl = `${url}?tableName=${query.tableName}&rowkey=${query.rowkey}`;
    try{
        await axios.get(postQueryUrl)
        .then( (data) => {
            res.send(data.data.Item);
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
module.exports.updatePost = async function updatePost(_body,res) {
    body = {
        "body": {
            "tableName": `himusic_${_body.tableName}`,
            "rowkey": _body.rowkey
        }
    }
    if(_body.title){body.body.title = _body.title;}
    if(_body.files){body.body.files = _body.files;}

    try{
        await axios.put(url, body)
        .then( async data => {
            if(_body.prevContent){await s3.delete(_body.prevContent);}
            if(_body.prevFile){await s3.delete(_body.prevFile);}
            if(_body.prevVideo){await s3.delete(_body.prevVideo);}
            res.send(data.data)
        } )
        .catch(error => {console.log(error); res.send(error)});
    }
    catch(err){
        res.send(err);
    }
}
// Delete
module.exports.deletePost = async function deletePost(tableName, author, deleteIndex, res) {
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