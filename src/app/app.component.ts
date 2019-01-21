import { Component } from '@angular/core';

import { RatesService } from './rates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private ratesService: RatesService) { }

  title = 'Exchange Rates';
  baseCurrencies: string[] = ['EUR', 'USD', 'GBP', 'AUD', 'CAD', 'JPY'];

  base: string = this.baseCurrencies[0];
  date: string = (new Date()).toISOString().substr(0, 10); // today

  currencyRates = [];
  onSubmit() {
    this.ratesService.getRates(this.date, this.base)
    .subscribe(data => this.currencyRates = Object.entries(data['rates']).map(entry => ({currency: entry[0], rate: entry[1]})));
  }

  sortAsc() {
    this.currencyRates.sort((a, b) => a.currency.localeCompare(b.currency));
  }
  sortDesc() {
    this.currencyRates.sort((a, b) => b.currency.localeCompare(a.currency));
  }
}
