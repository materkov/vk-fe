import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrdersListComponent} from "./orders/orders-list/orders-list.component";
import {OrdersDetailsComponent} from "./orders/orders-details/orders-details.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
    {path: '', redirectTo: '/orders', pathMatch: 'full'},

    {path: '', canActivate: [AuthGuard], children: [
        {path: 'orders', component: OrdersListComponent},
        {path: 'orders/:id', component: OrdersDetailsComponent},
    ]},

    {path: 'auth', component: AuthComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
