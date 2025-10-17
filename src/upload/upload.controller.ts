import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from './multer.config';
import { UploadService } from './upload.service';
import { MessageService } from 'src/message/message.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly messageService:MessageService
  ) {}

@Post('image')
@UseInterceptors(FileInterceptor('file', multerConfig))
async uploadImage(@UploadedFile() file: Express.Multer.File) {
  if (!file) throw new BadRequestException('Файл не завантажено');

  const metadata = await this.uploadService.saveImage(file);

  return {
    path: `/uploads/images/${metadata.filename}`,
    fileName: metadata.originalName,
    fileSize: metadata.size,
  };
}



}
