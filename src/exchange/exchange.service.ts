import { BadRequestException, Injectable } from '@nestjs/common';

export class CurrenciesService {
  async getCurrency(currency: string): Promise<any> {}
}

@Injectable()
export class ExchangeService {
  private readonly currenciesService: CurrenciesService;
  constructor(currenciesService: CurrenciesService) {
    this.currenciesService = currenciesService;
  }

  async convertAmout({ from, to, amout }): Promise<any> {
    if (!from || !to || !amout) {
      throw new BadRequestException();
    }

    try {
      const currencieFrom = await this.currenciesService.getCurrency(from);
      const currencieTo = await this.currenciesService.getCurrency(to);
    } catch (error) {
      throw new Error();
    }
  }
}
