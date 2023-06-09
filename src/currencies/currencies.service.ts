import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrenciesRepository } from './currencies.repository';
import { Currencies } from './currencies.entity';
import { CurrencieInputType } from './types/currencies-input.type';

@Injectable()
export class CurrenciesService {
  private readonly currenciesRepository: CurrenciesRepository;
  constructor(currenciesRepository: CurrenciesRepository) {
    this.currenciesRepository = currenciesRepository;
  }
  async getCurrency(currency: string): Promise<Currencies> {
    return await this.currenciesRepository.getCurrency(currency);
  }

  async updateCurrency({
    currency,
    value,
  }: CurrencieInputType): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }
    return await this.currenciesRepository.updateCurrency({ currency, value });
  }

  async createCurrency({
    currency,
    value,
  }: CurrencieInputType): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }
    return await this.currenciesRepository.createCurrency({ currency, value });
  }

  async deleteCurrency(currency: string): Promise<void> {
    await this.currenciesRepository.deleteCurrency(currency);
  }
}
