import AWS from "aws-sdk";
import fs from 'fs';
import { v4 } from 'uuid';

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const S3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export function uploadFile(file) {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    ACL: 'public-read',
    Key: `${Date.now()} - ${file.originalname}`,
  }

  return S3.upload(uploadParams).promise();
}

export { S3 };