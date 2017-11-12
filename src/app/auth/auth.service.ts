import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import base64url from "base64url";

interface TokenResponse {
    token: string;
}

@Injectable()
export class AuthService {
    private token: string = "";
    private userId: number;
    private userName: string;
    private userType: string;

    constructor(private http: HttpClient) {
    }

    decodeToken() {
        let token = JSON.parse(base64url.decode(this.token.split('.')[0]));
        this.userName = token.username;
        this.userId = token.id;
        this.userType = token.type;
    }

    tryAuthorize(username: string, password: string): Promise<boolean> {
        let url = 'http://localhost:8000/auth/contractor';
        let body = {
            'username': username,
            'password': password,
        };
        return this.http.post<TokenResponse>(url, body).toPromise().then(resp => {
            localStorage.setItem("token", resp.token);
            this.token = resp.token;
            this.decodeToken();
            return true;
        }).catch(resp => {
            if (resp.status == 403) {
                return false;
            } else {
                return null;
            }
        });
        /*

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        });

        return this.http.post(url, '', {headers: headers}).toPromise().catch(response => {
            if (response.status == 400) {
                this.projectId = projectId;
                this.apiKey = apiKey;
                return true;
            }
            else {
                return false;
            }
        });*/
    }

    isAuthenticated(): boolean {
        if (this.token == "") {
            let storageToken = localStorage.getItem("token");
            if (storageToken) {
                this.token = storageToken;
                this.decodeToken();
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

    getUserTypeHuman(): string {
        if (this.userType == "contractor") {
            return "Исполнитель"
        } else if (this.userType == "customer") {
            return "Заказчик";
        } else {
            return "";
        }
    }

    logout() {
        this.token = "";
        this.userName = "";
        this.userId = 0;
        this.userType = "";
        localStorage.removeItem("token");
    }
}
