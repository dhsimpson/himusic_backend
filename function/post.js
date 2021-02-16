const axios = require("axios");
const s3 = require('./s3');
const url = "https://pg1z261db3.execute-api.ap-northeast-2.amazonaws.com/himusic/post"; // 게시글 하나에 대한 것

// 게시글 한 개 읽어 오기
module.exports.readPost = async function readPost(query, res){
    const postQueryUrl = `${url}?tableName=${query.tableName}&index=${query.index}`
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
