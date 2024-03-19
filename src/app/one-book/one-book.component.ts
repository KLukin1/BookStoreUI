import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../services/book-service';
import { Book } from '../models/book-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BasketService } from '../services/basket-service';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user-service';
import * as myGlobals from '../global-variables';

@Component({
    selector: 'one-book',
    templateUrl: 'one-book.component.html',
    styleUrls: ['one-book.component.less']
})
export class OneBookComponent implements OnInit {

    book: Book = new Book();
    bookId: number;
    count: number = 1;
    siteName: string = myGlobals.siteName;

    constructor(private bookService: BookService, private activatedRoute: ActivatedRoute,
        private basketService: BasketService, private notifier: NotifierService) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.bookId = +params.get('id');
            this.getBookById(this.bookId);
        })
        this.getBookById(this.bookId);
    }

    getBookById(id: number) {
        this.bookService.getBookById(id).subscribe(
            result => {
                this.book = result;
            }
        )
    }

    addToBasket(id: number, count: number) {
        if (UserService.getCurrentUser()) {
            this.basketService.addBookToDB(id, count).subscribe(
                result => {
                    this.notifier.notify('success', 'Book was added to your basket');
                    this.sendBasketNum();
                }
            )
        } else {
            this.notifier.notify("info", "Please Sign In to add Books to your Basket");
        }
    }

    sendBasketNum() {
        this.basketService.sendBasketNum();
    }

    changeCount(c: number) {
        this.count = c;
    }
}

