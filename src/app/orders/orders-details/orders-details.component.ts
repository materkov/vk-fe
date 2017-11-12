import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Order} from "../order";

@Component({
    selector: 'app-orders-details',
    templateUrl: './orders-details.component.html',
    styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
    private order : Order;

    constructor(private orderService: OrderService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderService.getOrder(params['id']).then(order => this.order = order)
        });
    }

    execute() {
        this.orderService.executeOrder(this.order.id);
    }
}
