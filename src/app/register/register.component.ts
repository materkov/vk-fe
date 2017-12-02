import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {APIError} from "../shared/error";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    private authType: number = 1;
    private username: string = "";
    private password: string = "";
    private invalidUsername: boolean = false;
    private invalidPassword: boolean = false;
    private alreadyRegistered: boolean = false;
    private serverError: boolean = false;
    private processing: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    clearState() {
        this.invalidUsername = false;
        this.invalidPassword = false;
        this.serverError = false;
        this.alreadyRegistered = false;
        this.processing = false;
    }

    validate() {
        if (this.username.length == 0 || this.username.length > 255) {
            this.invalidUsername = true;
        }
        if (this.password.length == 0) {
            this.invalidPassword = true;
        }
    }

    register() {
        this.clearState();
        this.validate();
        if (this.invalidUsername || this.invalidPassword) {
            return;
        }

        this.processing = true;
        let canCreateOrder = false;
        let canExecuteOrder = false;

        if (this.authType == 1) {
            canExecuteOrder = true;
        } else {
            canCreateOrder = true;
        }

        this.authService.register(this.username, this.password, canCreateOrder, canExecuteOrder)
            .then(_ => {
                this.authService.tryAuthorize(this.username, this.password).then(success => {
                    if (success === true) {
                        this.router.navigate(['/orders']);
                    } else {
                        this.serverError = true;
                    }
                })
            }, (err: APIError) => {
                this.clearState();

                if (err.error == "username_already_registered") {
                    this.alreadyRegistered = true;
                } else {
                    this.serverError = true;
                }
            })
    }
}
