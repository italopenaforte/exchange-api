import { Currencies } from './currencies.entity';
import { CurrencieInputType } from './types/currencies-input.type';

export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<Currencies> {
    return new Currencies();
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
