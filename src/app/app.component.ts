import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

import { GraphsCoinComponent } from './graphsCoin/graphs-coin.component';
import { TableCoinsComponent } from './table-coins/table-coins.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [TableCoinsComponent, GraphsCoinComponent]
})

export class AppComponent implements OnInit {

  @ViewChild(GraphsCoinComponent) graphsComponent: any;
  @ViewChild(TableCoinsComponent) tableComponent: any;

  constructor(private http: HttpClient) { }

  url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=30d';
  urlBitcoin: string = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily';
  stateViewLoader: string = 'block';

  activeItems = ['btc', 'eth', 'xlm'];
  getDataCoin = [];
  tableListCoin = [];
  graphsListCoin = [];

  controlViewPages(page: string): void {
    page === 'table' && this.tableComponent.showTablePage();
    page === 'graphic' && this.graphsComponent.showGraphicPage();
  }

  getApiForTable(): Promise<void> {
    return new Promise((resolve): void => {
      this.http.get(this.url, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        observe: 'response'
      })
      .pipe(map((data): HttpResponse<object> => data))
      .subscribe({
        next: (data): void => {
          this.getDataCoin = [...data.body as never[]];
          this.graphsListCoin = [...data.body as never[]];
          this.tableListCoin = [...data.body as never[]];
        },
        complete: (): void => resolve()
      })
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getApiForTable();
    await this.graphsComponent.getApiForGraphic(this.urlBitcoin, 'Bitcoin');
    this.stateViewLoader = 'none';
  }
}
