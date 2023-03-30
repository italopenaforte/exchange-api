import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository, CurrenciesService } from './currencies.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let repository: CurrenciesRepository;

  beforeEach(async () => {
    const currenciesRepositoryMock = {
      getCurrency: jest.fn(),
      createCurrency: jest.fn(),
      updateCurrency: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesRepository,
          useFactory: () => currenciesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrency', () => {
    it('should throw if repository throw', async () => {
      (repository.getCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(service.getCurrency('INVALID')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should not throw if repository returns', async () => {
      await expect(service.getCurrency('BRL')).resolves.not.toThrow();
    });

    it('should repository has been called with right params', async () => {
      await service.getCurrency('BRL');
      expect(repository.getCurrency).toHaveBeenCalledWith('BRL');
    });

    it('should be return when repository return', async () => {
      (repository.getCurrency as jest.Mock).mockResolvedValue({
        currency: 'BRL',
        value: 1,
      });

      expect(await service.getCurrency('BRL')).toEqual({
        currency: 'BRL',
        value: 1,
      });
    });
  });

  describe('createCurrency()', () => {
    it('should throw if repository throw', async () => {
      (repository.createCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(
        service.createCurrency({ currency: 'BRL', value: 1 }),
      ).rejects.toThrow(new InternalServerErrorException());
    });

    it('should not throw if repository returns', async () => {
      await expect(
        service.createCurrency({ currency: 'BRL', value: 1 }),
      ).resolves.not.toThrow();
    });

    it('should repository has been called with right params', async () => {
      await service.createCurrency({ currency: 'BRL', value: 1 });
      expect(repository.createCurrency).toHaveBeenCalledWith({
        currency: 'BRL',
        value: 1,
      });
    });

    it('should throw if value is less or equal to 0', async () => {
      await expect(
        service.createCurrency({ currency: 'BRL', value: 0 }),
      ).rejects.toThrow(
        new BadRequestException('The value must be greater than zero.'),
      );
    });
  });

  describe('updateCurrency()', () => {
    it('should throw if repository throw', async () => {
      (repository.updateCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(
        service.updateCurrency({ currency: 'BRL', value: 1 }),
      ).rejects.toThrow(new InternalServerErrorException());
    });

    it('should not throw if repository returns', async () => {
      await expect(
        service.updateCurrency({ currency: 'BRL', value: 1 }),
      ).resolves.not.toThrow();
    });

    it('should repository has been called with right params', async () => {
      await service.updateCurrency({ currency: 'BRL', value: 1 });
      expect(repository.updateCurrency).toHaveBeenCalledWith({
        currency: 'BRL',
        value: 1,
      });
    });
  });
});
