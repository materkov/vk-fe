import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {OrdersListComponent} from './orders/orders-list/orders-list.component';
import {OrderService} from "./orders/order.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';

@NgModule({
    declarations: [
        AppComponent,
        OrdersListComponent,
        OrdersDetailsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        OrderService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
