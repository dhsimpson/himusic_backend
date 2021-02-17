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
    // console.log("key: "+ key);
    await s3.getObject(getParams, (err, data) =>{
        // Handle any error and exit
        if (err){
            // console.log(err);
            res.send(err);
        }
        else{
            // const content = data.Body.toString(); 이건 front에서 해줘야 함..??? 만약 file, video도 buffer로 오면 ??
            // item.content = content;
            res.send(data.Body);
        }
    });
}
