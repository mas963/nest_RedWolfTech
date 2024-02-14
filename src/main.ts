import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { NotFoundExceptionFilter } from './core/filters/notFoundException.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerPartials(join(__dirname, '..', 'views/layout'));
  app.setViewEngine('hbs');

  app.useGlobalFilters(new NotFoundExceptionFilter());

  const port = 3000;
  await app.listen(port);
  console.log(`nestjs project started url => localhost:${port}`);
}
bootstrap();
