import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  setupSwagger(app);
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();

function setupSwagger(app: INestApplication) {
	const openApiConfig = new DocumentBuilder()
		.setTitle("NestJs - Zero To Hero")
		.setDescription("API introduced in the Udemy course.")
		.setVersion("1.0")
		.setLicense("MIT", "https://opensource.org/licenses/MIT")
		.build();
	const swaggerDoc = SwaggerModule.createDocument(app, openApiConfig);
	SwaggerModule.setup("/api", app, swaggerDoc);
}
