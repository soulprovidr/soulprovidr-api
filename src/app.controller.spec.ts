import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { version } from '../package.json';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return the API version', () => {
    expect(appController.getIndex()).toBe(`Soul Provider API v${version}`);
  });
});
