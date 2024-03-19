import { Test, TestingModule } from '@nestjs/testing';
import { version } from '../package.json';
import { AppController } from './app.controller';

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
