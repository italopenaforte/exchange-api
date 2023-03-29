import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService, ExchangeService } from './exchange.service';
import { BadRequestException } from '@nestjs/common';
import { ExchangeInputType } from './types/exchange-input.type';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;
  let inputMockData;

  beforeEach(async () => {
    const currenciesServiceMock = {
      getCurrency: jest.fn().mockResolvedValue({ value: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: CurrenciesService, useFactory: () => currenciesServiceMock },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
    inputMockData = {
      from: 'USD',
      to: 'BRL',
      amount: 1,
    } as ExchangeInputType;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount', () => {
    it('should be throw if called with invalid params', async () => {
      inputMockData.from = '';
      await expect(service.convertAmount(inputMockData)).rejects.toThrow(
        new BadRequestException(),
      );
    });
    it('should be no throw if called with valid params', async () => {
      await expect(service.convertAmount(inputMockData)).resolves.not.toThrow();
    });

    it('should be called getCurrency twice', async () => {
      await service.convertAmount(inputMockData);

      expect(currenciesService.getCurrency).toBeCalledTimes(2);
    });

    it('should be called getCurrency twice with corrent params', async () => {
      await service.convertAmount(inputMockData);

      expect(currenciesService.getCurrency).toBeCalledTimes(2);
      expect(currenciesService.getCurrency).toHaveBeenCalledWith('USD');
      expect(currenciesService.getCurrency).toHaveBeenLastCalledWith('BRL');
    });

    it('should be throw when getCurrency throw', async () => {
      (currenciesService.getCurrency as jest.Mock).mockRejectedValueOnce(
        new Error(),
      );
      inputMockData.from = 'INVALID';
      await expect(service.convertAmount(inputMockData)).rejects.toThrow();
    });

    it('should be return conversion value', async () => {
      (currenciesService.getCurrency as jest.Mock).mockResolvedValue({
        value: 1,
      });
      expect(await service.convertAmount(inputMockData)).toEqual({ amount: 1 });

      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 1,
      });
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 0.2,
      });
      expect(await service.convertAmount(inputMockData)).toEqual({ amount: 5 });

      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 0.2,
      });
      (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
        value: 1,
      });
      expect(await service.convertAmount(inputMockData)).toEqual({
        amount: 0.2,
      });
    });
  });
});
