import { Component } from '@angular/core';
import { Book } from '../models/book-model';
import { BookService } from '../services/book-service';
import { BasketService } from '../services/basket-service';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user-service';
import * as myGlobals from '../global-variables';

@Component({
    selector: 'carousel',
    templateUrl: 'carousel.component.html',
    styleUrls: ['carousel.component.less']
})
export class CarouselComponent {

    books: Book[] = [];
    responsiveOptions: any[] | undefined;
    siteName: string = myGlobals.siteName;

    constructor(private bookService: BookService, private basketService: BasketService,
        private notifier: NotifierService) { }

    ngOnInit() {
        this.getRecommended();

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    getRecommended() {
        this.bookService.getRecommended().subscribe(
            result => {
                this.books = result;
            })
    }

    // todo - fix bug: adding doesn't work if book is already in basket
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
}
