import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService, ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;

  beforeEach(async () => {
    const currenciesServiceMock = {
      getCurrency: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: CurrenciesService, useFactory: () => currenciesServiceMock },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
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

    it('should be called getCurrency twice', async () => {
      await service.convertAmout({ from: 'USD', to: 'BRL', amout: 1 });

      await expect(currenciesService.getCurrency).toBeCalledTimes(2);
    });

    it('should be called getCurrency twice with corrent params', async () => {
      await service.convertAmout({ from: 'USD', to: 'BRL', amout: 1 });

      await expect(currenciesService.getCurrency).toBeCalledTimes(2);
      await expect(currenciesService.getCurrency).toHaveBeenCalledWith('USD');
      await expect(currenciesService.getCurrency).toHaveBeenLastCalledWith(
        'BRL',
      );
    });

    it('should be throw when getCurrency throw', async () => {
      (currenciesService.getCurrency as jest.Mock).mockRejectedValueOnce(
        new Error(),
      );
      await expect(
        service.convertAmout({ from: 'INVALID', to: 'BRL', amout: 1 }),
      ).rejects.toThrow();
    });
  });
});
