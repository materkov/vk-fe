import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrdersListComponent} from "./orders/orders-list/orders-list.component";
import {OrdersDetailsComponent} from "./orders/orders-details/orders-details.component";

const routes: Routes = [
    {path: '', redirectTo: '/orders', pathMatch: 'full'},
    {path: 'orders', component: OrdersListComponent},
    {path: 'orders/:id', component: OrdersDetailsComponent},

    //{path: '', canActivate: [AuthGuard], children: [
    //    {path: 'news', component: NewsListComponent},
    //    {path: 'news/:id', component: NewsEditComponent},
    //    {path: 'banner_news', component: BannerNewsListComponent},
    //    {path: 'banner_news/:id', component: BannerNewsEditComponent},
    //]},

    //{path: 'auth', component: AuthComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
