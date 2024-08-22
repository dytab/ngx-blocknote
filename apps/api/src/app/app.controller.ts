import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Block } from '@blocknote/core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/test-html')
  getTestHtml(@Body() body: Block[]) {
    return this.appService.getTestHtml(body);
  }
}
