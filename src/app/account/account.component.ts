import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountValidators } from '../services/account.validators';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { BasketService } from '../services/basket-service';


@Component({
    selector: 'account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.less']
})
export class AccountComponent implements OnInit {

    signInForm;
    isLoginError: boolean = false;
    currentUser;
    isUserLogged: boolean = false;

    constructor(private userService: UserService, private router: Router, private notifier: NotifierService,
        private basketService: BasketService) { }

    ngOnInit() {
        this.signInForm = new FormGroup({
            Email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            Password: new FormControl('', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(8),
                AccountValidators.cannotContainSpace
            ])
        });

        this.getIsLoggedIn();
    }

    get getEmail(): FormControl {
        return this.signInForm.get('Email');
    }
    get getPassword(): FormControl {
        return this.signInForm.get('Password');
    }

    onSignIn(f) {
        this.userService.userAuthentication(this.getEmail.value, this.getPassword.value).subscribe(
            data => {
                localStorage.setItem('userToken', data);
                this.setCurrentUser();
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                this.isLoginError = true;
            });
    }

    getIsLoggedIn() {
        if (UserService.getCurrentUser()) {
            this.currentUser = UserService.getCurrentUser();
            this.isUserLogged = true;
        } else {
            this.isUserLogged = false;
        }
    }

    setCurrentUser() {
        this.userService.setCurrentUser().subscribe(
            result => {
                localStorage.setItem('currentUser', JSON.stringify(result));
                this.userService.sendIsLoggedIn(true);
                this.isUserLogged = true;
                this.currentUser = UserService.getCurrentUser();
                this.basketService.sendBasketNum();
                this.notifier.notify("info", "Hello " + this.currentUser.firstName);
            })
    }

    logout() {
        //this.userService.sendIsLoggedIn(false);
        //this.isUserLogged = false;
        window.location.reload();
    }
}
