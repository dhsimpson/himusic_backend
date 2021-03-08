require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const moment = require('moment');
const multerS3 = require('multer-s3');
// aws accesskey
const accessKey = process.env.awsAccessKey;
const secretAccessKey = process.env.awsSecretAccessKey;

const s3 = new aws.S3({
    accessKeyId: accessKey, 
    secretAccessKey: secretAccessKey,
    region: 'ap-northeast-2'
  })
  
const storage = multerS3({
    s3: s3,
    bucket: 'himusic',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname)
    }
  })

// S3에 파일들 업로드
module.exports.upload = multer({ storage: storage });//.single("file");

// S3로 부터 파일들 가지고 오기
module.exports.getData = async(key, res) => {
    const getParams = {
        Bucket: 'himusic',
        Key: key
    }
    await s3.getObject(getParams, (err, data) =>{
        // Handle any error and exit
        if (err){
            res.send(err);
        }
        else{
            res.send(data.Body);
        }
    });
}

module.exports.delete = async(key) => {
  console.log(key+"를 삭제");
  s3.deleteObject({Bucket: 'himusic', Key: key},(err, data)=>{
    if(err){console.log(err);}
    if(data){console.log(data);}
  });
}