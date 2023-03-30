import { BadRequestException, Injectable } from '@nestjs/common';

export class Currencies {
  currency: string;
  value: number;
}

export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<Currencies> {
    return new Currencies();
  }

  async createCurrency({ currency, value }): Promise<Currencies> {
    return new Currencies();
  }

  async updateCurrency({ currency, value }): Promise<Currencies> {
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

  async updateCurrency({ currency, value }): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }
    return await this.currenciesRepository.updateCurrency({ currency, value });
  }

  async createCurrency({ currency, value }): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }
    return await this.currenciesRepository.createCurrency({ currency, value });
  }
}
