import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository, CurrenciesService } from './currencies.service';
import { InternalServerErrorException } from '@nestjs/common';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let repository: CurrenciesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesRepository,
          useFactory: () => ({ getCurrency: jest.fn() }),
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
  });
});