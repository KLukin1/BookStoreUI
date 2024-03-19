import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book-service';
import { Book } from '../models/book-model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { BasketService } from '../services/basket-service';
import { UserService } from '../services/user-service';
import * as myGlobals from '../global-variables';

@Component({
    selector: 'books',
    templateUrl: 'books.component.html',
    styleUrls: ['books.component.less']
})
export class BooksComponent implements OnInit {

    books: Book[] = [];
    categoryName: string;
    author: string;
    buttonText: string = 'Sort By  <span class="caret"></span>';
    count1: number = 1;
    loader: boolean = true;
    siteName: string = myGlobals.siteName;

    constructor(private bookService: BookService, private basketService: BasketService,
        private route: ActivatedRoute, private router: Router, private notifier: NotifierService) {

        this.router.events.subscribe(x => {
            if (x instanceof NavigationEnd) {
                this.loadBooks();
            }
        });
    }

    ngOnInit() {
        this.loadBooks();
    }

    loadBooks() {
        this.categoryName = this.route.snapshot.paramMap.get('categoryName');
        this.author = this.route.snapshot.paramMap.get('author');
        this.getBooks(this.categoryName, this.author);
    }

    getBooks(categoryName: string, author: string) {
        this.bookService.getBooks(categoryName, author, "").subscribe(
            result => {
                this.books = result;
                this.loader = false;
            }
        )
    }

    sendBasketNum() {
        this.basketService.sendBasketNum();
    }

    sortAZ() {
        this.books.sort(function (title1, title2) {
            var textA = title1.title.toUpperCase();
            var textB = title2.title.toUpperCase();
            return (textA < textB) ? -1 : (textB < textA) ? 1 : 0;
        })
        this.buttonText = 'Title: A-Z';
    }

    sortZA() {
        this.books.sort(function (title1, title2) {
            var textA = title1.title.toUpperCase();
            var textB = title2.title.toUpperCase();
            return (textA < textB) ? 1 : (textB < textA) ? -1 : 0;
        })
        this.buttonText = 'Title: Z-A';
    }

    sortLowHigh() {
        this.books.sort(function (price1, price2) {
            var p1 = price1.price;
            var p2 = price2.price;
            if (price1.discount) {
                p1 = price1.discount;
            }
            if (price2.discount) {
                p2 = price2.discount;
            }
            return (p1 < p2) ? -1 : (p2 < p1) ? 1 : 0;
        })
        this.buttonText = 'Price: L-H';
    }

    sortHighLow() {
        this.books.sort(function (price1, price2) {
            var p1 = price1.price;
            var p2 = price2.price;
            if (price1.discount) {
                p1 = price1.discount;
            }
            if (price2.discount) {
                p2 = price2.discount;
            }
            return (p1 < p2) ? 1 : (p2 < p1) ? -1 : 0;
        })
        this.buttonText = 'Price: H-L';
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

}
