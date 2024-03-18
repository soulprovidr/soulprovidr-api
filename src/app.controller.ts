import { Controller, Get } from '@nestjs/common';
import { version } from '../package.json';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getIndex(): string {
    return `Soul Provider API v${version}`;
  }
}
