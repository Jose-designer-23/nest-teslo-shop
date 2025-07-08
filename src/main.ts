import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

   app.enableCors({
    origin: 'https://phoenix-angular-shop.netlify.app', // <--- ¡Importante! Reemplaza con la URL EXACTA de tu frontend de Netlify
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Esto es importante si usas cookies o tokens de autenticación
    allowedHeaders: 'Content-Type, Accept, Authorization', // Esto también puede ser importante
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Teslo RESTFul API')
    .setDescription('Teslo shop endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');
  logger.log(`App running on port ${ port}`);
}
bootstrap();
