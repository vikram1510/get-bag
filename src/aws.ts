import { S3 } from 'aws-sdk';
import { readFileSync } from 'fs';

const s3 = new S3({ region: 'eu-west-2' });

const Bucket = 'extracted-cv-csv-files';

export function uploadToS3(filename: string){
  return s3.upload({ Bucket,  Key: filename, Body: readFileSync('output.csv') }).promise().catch(console.log);
}
