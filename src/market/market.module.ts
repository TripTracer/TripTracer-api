import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { MarketResolver } from './market.resolver';

@Module({
  controllers: [MarketController],
  providers: [MarketService, MarketResolver],
})
export class MarketModule {}
