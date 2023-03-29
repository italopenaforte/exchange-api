import { BadRequestException, Injectable } from '@nestjs/common';
import { ExchangeInputType } from './types/exchange-input.type';
import { ExchangeOutputType } from './types/exchange-output.type';
import { CurrenciesService } from '../currencies/currencies.service';

@Injectable()
export class ExchangeService {
  private readonly currenciesService: CurrenciesService;
  constructor(currenciesService: CurrenciesService) {
    this.currenciesService = currenciesService;
  }

  async convertAmount({
    from,
    to,
    amount,
  }: ExchangeInputType): Promise<ExchangeOutputType> {
    if (!from || !to || !amount) {
      throw new BadRequestException();
    }

    try {
      const currencieFrom = await this.currenciesService.getCurrency(from);
      const currencieTo = await this.currenciesService.getCurrency(to);

      return { amount: (currencieFrom.value / currencieTo.value) * amount };
    } catch (error) {
      throw new Error();
    }
  }
}
