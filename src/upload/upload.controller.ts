import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import * as fs from 'fs'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { diskStorage } from 'multer'
import * as path from 'path'


@Controller('upload')
export class UploadController {

  @Post('file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/files',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))

      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Файл не завантажено')

    return {
      path: `/uploads/files/${file.filename}`,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
    }
  }

@Get('download')
downloadFile(
  @Query('fileUrl') fileUrl: string | undefined,
  @Query('fileName') fileName: string | undefined,
  @Res() res: Response
) {
  if (!fileUrl) {
    throw new BadRequestException('fileUrl не передано')
  }

  const savedFileName = fileUrl?.split('/').pop()
  if (!savedFileName) {
    throw new BadRequestException('Неможливо витягнути ім’я файлу з fileUrl')
  }

  const filePath = path.join(process.cwd(), 'uploads', 'files', savedFileName)

  if (!fs.existsSync(filePath)) {
    throw new BadRequestException('Файл не знайдено')
  }

  const downloadName = fileName || savedFileName
  res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`)
  res.sendFile(filePath)
}





}
