import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('pages/index.hbs')
  root() {
    return { message: 'Hello world!' };
  }
}

