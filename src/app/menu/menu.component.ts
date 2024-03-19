import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import * as myGlobals from '../global-variables';
import { Router } from '@angular/router';


@Component({
    selector: 'menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.less']
})
export class MenuComponent implements OnInit {

    basketNum: number = 0;
    isHamburgerClicked: boolean = false;
    siteName: string = myGlobals.siteName;

    constructor(private basketService: BasketService, private router: Router) { this.getBasketCount(); }

    ngOnInit() {
        this.getBasketCountApi();
        console.log(this.router.url.split('?')[0]);
    }

    getBasketCountApi() {
        this.basketService.getBasketCountApi().subscribe(
            result => {
                this.basketNum = result;
            })
    }

    getBasketCount() {
        this.basketService.getBasketNum().subscribe(
            result => {
                this.getBasketCountApi();
            })
    }

    showSideMenu(bool: boolean) {
        this.isHamburgerClicked = bool;
    }
}

