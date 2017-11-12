import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {OrdersListComponent} from './orders/orders-list/orders-list.component';
import {OrderService} from "./orders/order.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {OrdersDetailsComponent} from './orders/orders-details/orders-details.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth/auth.service";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        OrdersListComponent,
        OrdersDetailsComponent,
        AuthComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [
        OrderService,
        AuthGuard,
        AuthService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
