import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "./order";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient, private authService: AuthService) {
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

    executeOrder(id: number) {
        let url = "http://localhost:8000/orders/" + id + "/exec?XDEBUG_SESSION_START=1";
        let headers = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getToken());

        return this.httpClient.post(url, null, {headers: headers}).toPromise()
            .then(result => {

            })
    }
}
