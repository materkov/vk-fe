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
import { UserComponent } from './user/user.component';
import {UserService} from "./user/user.service";
import { OrderCreateComponent } from './orders/order-create/order-create.component';

@NgModule({
    declarations: [
        AppComponent,
        OrdersListComponent,
        OrdersDetailsComponent,
        AuthComponent,
        UserComponent,
        OrderCreateComponent,
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
        UserService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
