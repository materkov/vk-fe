import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "./order";

@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient) {
    }

    getOrdersList(after: string): Promise<[Order[], string]> {
        let url = "http://localhost:8000/orders?limit=1";
        if (after) {
            url += "&after=" + after;
        }

        return this.httpClient.get(url)
            .toPromise()
            .then(result => {
                return [result['orders'], result['next_after']] as [Order[], string];
            })
    }

    getOrder(id: string): Promise<Order> {
        let url = "http://localhost:8000/orders/" + id;

        return this.httpClient.get(url)
            .toPromise()
            .then(result => {
                return result as Order;
            })
    }
}
