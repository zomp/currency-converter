import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ServerResponse {
  rates: {[id: string]: number};
  base: string;
  date: string;
}

@Injectable()
export class RatesService {
  constructor(private http: HttpClient) { }

  ratesUrl = 'https://api.exchangeratesapi.io/';

  getRates(date: string, base: string) {
    return this.http.get<ServerResponse>(this.ratesUrl + encodeURIComponent(date), {params: {base: base}});
  }
}
