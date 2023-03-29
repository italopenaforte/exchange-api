import { Injectable, InternalServerErrorException } from '@nestjs/common';

export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<any> {
    //
  }
}

@Injectable()
export class CurrenciesService {
  private readonly currenciesRepository: CurrenciesRepository;
  constructor(currenciesRepository: CurrenciesRepository) {
    this.currenciesRepository = currenciesRepository;
  }
  async getCurrency(currency: string): Promise<any> {
    try {
      await this.currenciesRepository.getCurrency(currency);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
