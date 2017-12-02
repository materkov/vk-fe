import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    public user: User;

    constructor(private authService: AuthService, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getMe().then(user => this.user = user)
    }
}
