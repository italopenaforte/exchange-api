import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmout', () => {
    it('should be throw if called with invalid params', async () => {
      await expect(
        service.convertAmout({ from: '', to: '', amout: 0 }),
      ).rejects.toThrow(new BadRequestException());
    });

    it('should be no throw if called with valid params', async () => {
      await expect(
        service.convertAmout({ from: 'USD', to: 'BRL', amout: 1 }),
      ).resolves.not.toThrow();
    });
  });
});
