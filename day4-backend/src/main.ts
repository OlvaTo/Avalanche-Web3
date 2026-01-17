import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; //
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // WAJIB: Agar decorator @IsNumber dan @IsString di DTO berfungsi
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Mengubah string input ke number otomatis jika memungkinkan
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Avalanche Day 4 API')
    .setDescription('Backend API for Smart Contract Interaction')
    .setVersion('1.0')
    .addTag('Author : Rizky Andriyanto 231011401883')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document); //

  await app.listen(3000);
}
bootstrap();
