import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Order} from "../order";
import {APIError} from "../../shared/error";

@Component({
    selector: 'app-orders-details',
    templateUrl: './orders-details.component.html',
    styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {
    public order : Order;
    public executing: boolean;
    public done: boolean;
    public failAlreadyDone: boolean;
    public failCantExecute: boolean;
    public failGeneral: boolean;

    constructor(private orderService: OrderService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.orderService.getOrder(params['id']).then(order => this.order = order)
        });
    }

    clearState() {
        this.executing = false;
        this.done = false;
        this.failAlreadyDone = false;
        this.failCantExecute = false;
        this.failGeneral = false;
    }

    execute() {
        this.clearState();
        this.executing = true;

        this.orderService.executeOrder(this.order.id).then(_ => {
            this.clearState();
            this.done = true;
        }).catch((error: APIError) => {
            this.clearState();
            if (error.error == "order_already_executed") {
                this.failAlreadyDone = true;
            } else if (error.error == "user_cant_execute_order") {
                this.failCantExecute = true;
            } else {
                this.failGeneral = true;
            }
        });
    }
}
