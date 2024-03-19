import { Component, OnInit } from '@angular/core';
import { BasketService } from '../services/basket-service';
import { BasketItem } from '../models/basket-model';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user-service';
import * as myGlobals from '../global-variables';


@Component({
    selector: 'basket',
    templateUrl: 'basket.component.html',
    styleUrls: ['basket.component.less']
})
export class BasketComponent implements OnInit {

    books: BasketItem[] = [];
    totalPrice: number;
    basketNum: number;
    isUserLogged: boolean = false;
    isBasketEmpty: boolean = true;
    siteName: string = myGlobals.siteName;
    userId: number = -1;

    constructor(private basketService: BasketService, private notifier: NotifierService, private userService: UserService) { }

    ngOnInit() {
        this.getIsUserLogged();

        this.getBasket();
    }

    getBasket() {
        this.basketService.getBasket().subscribe(
            response => {
                this.books = response;
                this.calculatePrices();
                this.sendBasketNum();
                if (this.books.length > 0) {
                    this.isBasketEmpty = false;
                } else {
                    this.isBasketEmpty = true;
                }
                console.log(this.books);
            })
    }

    sendBasketNum() {
        this.basketService.sendBasketNum();
    }

    deleteFromBasketConfirm(book: BasketItem) {
        if (confirm("Are you sure you want to delete " + book.title + " from the Basket?")) {
            this.deleteFromBasket(book);
        }
    }

    deleteFromBasket(book: BasketItem) {
        book.count = 0;
        this.basketService.changeCount(book).subscribe(
            response => {
                this.books = this.books.filter(x => x.basketItemId != book.basketItemId);
                if (this.books.length > 0) {
                    this.isBasketEmpty = false;
                } else {
                    this.isBasketEmpty = true;
                }
                this.calculatePrices();
                this.sendBasketNum();
                this.notifier.notify("success", "Book was removed from the basket");
            })
    }

    calculatePrices() {
        this.totalPrice = 0;

        for (let book of this.books) {
            if (book.discount) {
                this.totalPrice += (book.discount * book.count);
            } else {
                this.totalPrice += (book.price * book.count);
            }
        }
    }


    changeCounter(c: number, book: BasketItem) {
        book.count = c;
        this.calculatePrices();
        this.basketService.changeCount(book).subscribe(
            result => {
                this.notifier.notify("info", "Basket is updated");
                this.basketService.sendBasketNum();
            })
    }

    getIsUserLogged() {
        if (UserService.getCurrentUser()) {
            this.userId = UserService.getCurrentUser()["UserId"];
            this.isUserLogged = true;
        } else {
            this.isUserLogged = false;
        }
    }

    pay() {
        if (confirm("Order all of the Items in your Basket?")) {
            this.basketService.pay(this.userId).subscribe(
                result => {
                    this.notifier.notify("success", "You have succesfully ordered the Books!");
                    this.isBasketEmpty = true;
                })
        }
    }
}
