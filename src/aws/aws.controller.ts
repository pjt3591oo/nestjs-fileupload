import { UseInterceptors, UploadedFiles, UploadedFile, Post, Controller } from '@nestjs/common'
import { FilesInterceptor, FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { memoryStorage, diskStorage } from 'multer'

import { AwsService } from './aws.service'

@Controller('aws')
export class AwsController {
  constructor (
    private readonly awsService: AwsService
  ) {}  
  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor(
    [
      { name: 'f1', maxCount: 1 },
      { name: 'f2', maxCount: 1 },
    ],
    {
      storage: memoryStorage({}),
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: function (req, file, cb) { return cb(null, true) }
    }
  ))
  async upload(
    @UploadedFiles() files,
  ) {
    console.log(files)
    await this.awsService.uplaodFromBinary(files['f2'][0])
    return 'success'
  }
}
