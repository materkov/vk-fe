import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    getMe(): Promise<User> {
        let url = "http://localhost:8000/users/me";
        let headers = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getToken());

        return this.httpClient.get(url, {headers: headers})
            .toPromise()
            .then(result => {
                return result as User;
            })
    }
}
