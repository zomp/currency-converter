import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { RatesService } from './rates.service';

describe('RatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RatesService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should handle the data correclty', inject(
    [HttpTestingController, RatesService],
    (httpMock: HttpTestingController, service: RatesService) => {
      service.getRates('2019-01-18', 'EUR').subscribe(data => {
        expect(data.rates.HRK).toBe(7.4295);
        expect(data.base).toBe('EUR');
        expect(data.date).toBe('2019-01-18');
      });

      const request = httpMock.expectOne('https://api.exchangeratesapi.io/2019-01-18?base=EUR');
      expect(request.request.method).toEqual('GET');

      request.flush({
        rates: {
          'HRK': 7.4295, 'HUF': 318.09, 'IDR': 16193.18, 'PHP': 59.983, 'TRY': 6.1091, 'RON': 4.6993, 'ISK': 137.8, 'SEK': 10.2515,
          'THB': 36.161, 'PLN': 4.2931, 'GBP': 0.88125, 'CAD': 1.5134, 'AUD': 1.585, 'MYR': 4.7024, 'NZD': 1.6841, 'CHF': 1.1331,
          'DKK': 7.4649, 'SGD': 1.5463, 'CNY': 7.7291, 'BGN': 1.9558, 'CZK': 25.58, 'BRL': 4.2701, 'JPY': 124.78, 'KRW': 1278.73,
          'INR': 81.0875, 'MXN': 21.7095, 'RUB': 75.6267, 'HKD': 8.9441, 'USD': 1.1402, 'ZAR': 15.7187, 'ILS': 4.2132, 'NOK': 9.7218
        },
        base: 'EUR',
        date: '2019-01-18'
      });
    }
  ));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));
});
