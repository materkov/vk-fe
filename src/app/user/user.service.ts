import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {
    private apiHost = environment.apiHost;
    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    getMe(): Promise<User> {
        let url = this.apiHost + "/users/me";
        let headers = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getToken());

        return this.httpClient.get(url, {headers: headers})
            .toPromise()
            .then(result => {
                return result as User;
            })
    }
}
