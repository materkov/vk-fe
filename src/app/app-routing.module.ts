import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OrdersListComponent} from "./orders/orders-list/orders-list.component";
import {OrdersDetailsComponent} from "./orders/orders-details/orders-details.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";
import {UserComponent} from "./user/user.component";
import {OrderCreateComponent} from "./orders/order-create/order-create.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
    {path: '', redirectTo: '/orders', pathMatch: 'full'},

    {path: '', canActivate: [AuthGuard], children: [
        {path: 'orders', component: OrdersListComponent},
        {path: 'orders/new', component: OrderCreateComponent},
        {path: 'orders/:id', component: OrdersDetailsComponent},
        {path: 'me', component: UserComponent},
    ]},

    {path: 'auth', component: AuthComponent},
    {path: 'register', component: RegisterComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
