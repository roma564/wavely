import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors();
  
  app.enableCors({
  origin: true,
  credentials: true,
});

  app.use(cookieParser());

  

  // await app.listen(5000, '192.168.0.100');
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

