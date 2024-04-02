import { Query, Resolver } from '@nestjs/graphql';
import { MarketService } from './market.service';
import { PetB } from './pet.entity';

@Resolver((of) => PetB)
export class MarketResolver {
  constructor(private marketService: MarketService) {}

  @Query((returns) => [PetB])
  async pets(): Promise<PetB[]> {
    return this.marketService.findAll();
  }
}
