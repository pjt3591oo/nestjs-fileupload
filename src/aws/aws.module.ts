import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AwsController } from './aws.controller';
import { AccessKeyId, secretAccessKey, region } from './config'

@Module({
  providers: [
    AwsService, 
    {
      provide: 'ACCESSKEYID',
      useValue: AccessKeyId
    },
    {
      provide: 'SECRETACCESSKEY',
      useValue: secretAccessKey
    },
    {
      provide: 'REGION',
      useValue: region
    },
  ],
  controllers: [AwsController]
})
export class AwsModule {}
