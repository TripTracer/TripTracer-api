import { Injectable } from '@nestjs/common';
import { PetB } from './pet.entity';

@Injectable()
export class MarketService {
  async findAll(): Promise<PetB[]> {
    const pet = new PetB();
    pet.id = 1;
    pet.name = 'My Cattttt';
    pet.greed = 'Cat';
    return [pet];
  }
}
