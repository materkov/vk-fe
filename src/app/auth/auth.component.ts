import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    private username: string = "";
    private password: string = "";
    private invalidPassword: boolean = false;
    private serverError: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.authService.tryAuthorize(this.username, this.password).then(success => {
            if (success === true) {
                this.router.navigate(['/orders']);
            } else if (success === false) {
                this.invalidPassword = true;
                this.serverError = false;
            } else if (success === null) {
                this.invalidPassword = false;
                this.serverError = true;
            }
        })
    }

    registerAsCreate() {

    }

    registerAsExecute() {

    }
}
