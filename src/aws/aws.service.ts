import { Injectable, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';



@Injectable()
export class AwsService {
  private readonly s3 
  
  constructor (
    @Inject('ACCESSKEYID') private readonly accessKeyId,
    @Inject('SECRETACCESSKEY') private readonly secretAccessKey,
    @Inject('REGION') private readonly region
  ) {
    AWS.config.update({accessKeyId, secretAccessKey, region})
    this.s3 = new AWS.S3() 
  }
  
  async uplaodFromBinary (file)  {
    
    let params = {
      Bucket: "S3에 생성한 Bucket 이름",
      ACL: 'private',                // read-public
      Key: `path/${file.originalname}.png`,  // 저장경로, 파일명
      Body : file.buffer             // 버퍼
    }

    return new Promise((resolve, reject) => {
      this.s3.putObject(params, (err, data) => {
        if (err) reject(err) 
        resolve(data)
      })
    })

  }
}
