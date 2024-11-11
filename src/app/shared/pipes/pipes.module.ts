import { NgModule } from '@angular/core';
import { MznCurrencyPipe } from './currency.pipe';

@NgModule({
  declarations: [MznCurrencyPipe],
  exports: [MznCurrencyPipe]
})
export class PipesModule { }
