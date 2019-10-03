const dotenv = require("dotenv");
dotenv.config();

const AWS = require('aws-sdk');
const toStream = require('buffer-to-stream');
const endpoint = new AWS.Endpoint(process.env.ENDPOINT);
const region = process.env.REGION;
const access_key = process.env.ACCESS_KEY;
const secret_key = process.env.SECRET_KEY;

AWS.config.update({
    accessKeyId: access_key,
    secretAccessKey: secret_key
});

const S3 = new AWS.S3({
    endpoint,
    region
});

const options = {
    partSize: 5 * 1024 * 1024
};

/**
 * upload file within 5mb to ncloud
 * 
 * @param {String} fileName
 * @param {Buffer} imgBuffer image buffer
 */
const upload2ncloud = async (fileName, imgBuffer) => {
    const readable = toStream(Buffer.from(imgBuffer));
    await S3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        ACL: "public-read",
        Body: readable
    }, options).promise();
};

module.exports = upload2ncloud;