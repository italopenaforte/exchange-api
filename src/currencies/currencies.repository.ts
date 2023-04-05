import { Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CurrencieInputType } from './types/currencies-input.type';
import { InternalServerErrorException } from '@nestjs/common';

export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ where: { currency: currency } });

    if (!result) {
      throw new InternalServerErrorException();
    }
    return result;
  }

  async createCurrency({
    currency,
    value,
  }: CurrencieInputType): Promise<Currencies> {
    return new Currencies();
  }

  async updateCurrency({
    currency,
    value,
  }: CurrencieInputType): Promise<Currencies> {
    return new Currencies();
  }

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
