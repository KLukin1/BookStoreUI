import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.less']
})
export class LogoutComponent {

    constructor(private router: Router, private notifier: NotifierService) { }

    logout() {
        localStorage.clear();
        this.router.navigate(['/account']);
        this.notifier.notify("success", "You have logged out");
    }
}
