import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {APIError} from "../../shared/error";

@Component({
    selector: 'app-order-create',
    templateUrl: './order-create.component.html',
    styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
    private name: string = "";
    private price: string = "";
    private description: string = "";
    private orderId: number;

    private invalidName: boolean;
    private invalidPrice: boolean;
    private invalidDescription: boolean;
    private creating: boolean;
    private failAPI: boolean;
    private failCantCreate: boolean;

    private priceRegexp: RegExp;

    constructor(private orderService: OrderService) {
        this.priceRegexp = new RegExp(/^\d{1,10}\.\d\d$/);
    }

    ngOnInit() {
    }

    clearState() {
        this.invalidName = false;
        this.invalidPrice = false;
        this.invalidDescription = false;
        this.creating = false;
        this.failAPI = false;
        this.failCantCreate = false;
    }

    validate() {
        this.clearState();

        if (this.name.length == 0 || this.name.length > 255) {
            this.invalidName = true;
        }
        if (this.description.length == 0 || this.description.length > 10000) {
            this.invalidDescription = true;
        }
        if (!this.priceRegexp.test(this.price)) {
            this.invalidPrice = true;
        }
    }

    isValid() {
        return !this.invalidName && !this.invalidPrice && !this.invalidDescription;
    }

    create() {
        this.clearState();

        this.validate();
        if (!this.isValid()) {
            return;
        }

        this.creating = true;
        this.orderService.createOrder(this.name, this.description, Number(this.price)).then(
            orderId => {
                this.clearState();
                this.orderId = orderId;
            },
            (error: APIError) => {
                this.clearState();
                if (error.error == "user_cant_create_order") {
                    this.failCantCreate = true;
                } else {
                    this.failAPI = true;
                }
            }
        )
    }
}
