import { Injectable } from '@nestjs/common';

export class Currencies {
  currency: string;
}

export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<Currencies> {
    return new Currencies();
  }

  async createCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }
}

@Injectable()
export class CurrenciesService {
  private readonly currenciesRepository: CurrenciesRepository;
  constructor(currenciesRepository: CurrenciesRepository) {
    this.currenciesRepository = currenciesRepository;
  }
  async getCurrency(currency: string): Promise<Currencies> {
    return await this.currenciesRepository.getCurrency(currency);
  }

  async createCurrency({ currency, value }): Promise<Currencies> {
    return await this.currenciesRepository.createCurrency({ currency, value });
  }
}
