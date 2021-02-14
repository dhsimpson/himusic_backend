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

module.exports.upload = multer({ storage: storage });//.single("file");

