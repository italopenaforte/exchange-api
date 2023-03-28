import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  async convertAmout({ from, to, amout }): Promise<any> {
    if (!from || !to || !amout) {
      throw new BadRequestException();
    }
  }
}
