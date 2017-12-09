import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {APIError} from "../../shared/error";

@Component({
    selector: 'app-order-create',
    templateUrl: './order-create.component.html',
    styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {
    public name: string = "";
    public price: string = "";
    public description: string = "";
    public orderId: number;

    public invalidName: boolean;
    public invalidPrice: boolean;
    public invalidDescription: boolean;
    public creating: boolean;
    public failAPI: boolean;
    public failCantCreate: boolean;

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
        this.orderService.createOrder(this.name, this.description, this.price).then(
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
