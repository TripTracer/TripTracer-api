import { Test, TestingModule } from '@nestjs/testing';
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

  describe('root', () => {
    it('should return warning message', () => {
      expect(appController.getHello()).toBe(
        "Please don't call this URL directly.",
      );
      expect(appController.getHello()).not.toBe('Hello World!');
    });
  });
});
