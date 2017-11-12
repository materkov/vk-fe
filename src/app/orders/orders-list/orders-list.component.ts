import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {Order} from "../order";

@Component({
    selector: 'app-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
    cursor: string = "";
    ordersList: Order[] = [];

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.loadNextPage();
    }

    loadNextPage() {
        let cursor = this.cursor;
        this.cursor = "";

        this.orderService.getOrdersList(cursor).then(([orders, nextAfter]) => {
            this.ordersList = this.ordersList.concat(orders);
            this.cursor = nextAfter;
        })
    }
}
