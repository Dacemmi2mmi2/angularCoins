import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
// import { ListCoinsComponent } from './list-coins/list-coins.component';
import { TableCoinsComponent } from './table-coins/table-coins.component';
import { GraphsCoinComponent } from './graphsCoin/graphs-coin.component';

@NgModule({
  declarations: [
    AppComponent,
    // ListCoinsComponent,
    TableCoinsComponent,
    GraphsCoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
