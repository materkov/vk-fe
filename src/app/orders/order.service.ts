import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Order} from "./order";
import {AuthService} from "../auth/auth.service";
import {APIError} from "../shared/error";

@Injectable()
export class OrderService {
    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    getOrdersList(after: string): Promise<[Order[], string]> {
        let url = "http://localhost:8000/orders?limit=20";
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
        return new Promise((resolve, reject) => {
            let url = "http://localhost:8000/orders/" + id + "/exec?XDEBUG_SESSION_START=1";
            let headers = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getToken());

            this.httpClient.post(url, null, {headers: headers})
                .subscribe(_ => {
                    resolve();
                }, (result: HttpErrorResponse) => {
                    reject(result.error as APIError);
                })
        })
    }

    createOrder(name: string, description: string, price: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let url = "http://localhost:8000/orders";
            let headers = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getToken());
            let body = {
                name: name,
                price: price,
                description: description,
            };

            this.httpClient.post(url, body, {headers: headers})
                .subscribe(result => {
                    resolve(result['id']);
                }, (result: HttpErrorResponse) => {
                    reject(result.error as APIError);
                })
        })
    }
}
