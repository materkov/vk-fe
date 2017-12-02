import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import base64url from "base64url";
import {APIError} from "../shared/error";
import {environment} from "../../environments/environment";

interface TokenResponse {
    token: string;
}

@Injectable()
export class AuthService {
    private apiHost = environment.apiHost;
    private token: string = "";
    private canAddOrder: boolean = false;
    private canExecuteOrder: boolean = false;
    private userId: string;
    private userName: string;

    constructor(private http: HttpClient) {
    }

    decodeToken(token: string) {
        this.token = token;
        let tokenParsed = JSON.parse(base64url.decode(token.split('.')[0]));
        this.canAddOrder = tokenParsed['can_add_order'];
        this.canExecuteOrder = tokenParsed['can_execute_order'];
        this.userId = tokenParsed['id'];
        this.userName = tokenParsed['username'];
    }

    tryAuthorize(username: string, password: string): Promise<boolean> {
        let url = this.apiHost + '/auth';
        let body = {
            'username': username,
            'password': password,
        };
        return this.http.post<TokenResponse>(url, body).toPromise().then(resp => {
            localStorage.setItem("token", resp.token);
            this.decodeToken(resp.token);
            return true;
        }).catch(resp => {
            if (resp.status == 403) {
                return false;
            } else {
                return null;
            }
        });
    }

    isAuthenticated(): boolean {
        if (this.token == "") {
            let storageToken = localStorage.getItem("token");
            if (storageToken) {
                this.decodeToken(storageToken);
            }
        }
        return this.token != "";
    }

    getToken(): string {
        return this.token;
    }

    getName(): string {
        return this.userName;
    }

    getId(): string {
        return this.userId;
    }

    logout() {
        this.token = "";
        this.userName = "";
        localStorage.removeItem("token");
    }

    register(username: string, password: string, canCreateOrder: boolean, canExecuteOrder: boolean): Promise<null> {
        return new Promise((resolve, reject) => {
            let url = this.apiHost + '/register';
            let body = {
                'username': username,
                'password': password,
                'can_create_order': canCreateOrder,
                'can_execute_order': canExecuteOrder,
            };
            return this.http.post(url, body).toPromise().then(resp => {
                resolve();
            }).catch((resp: HttpErrorResponse)=> {
                reject(resp.error as APIError);
            });
        });
    }
}
