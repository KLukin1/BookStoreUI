import { Component, OnInit, HostListener } from '@angular/core';
import { BookService } from '../services/book-service';
import { Book } from '../models/book-model';
import { Router } from '@angular/router';
import * as myGlobals from '../global-variables';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.less']
})
export class SearchComponent implements OnInit {

    searchedBooks: Book[] = [];
    show5Books: Book[] = [];
    isSearcResultShown: boolean = false;
    siteName: string = myGlobals.siteName;

    @HostListener("click")
    focusIn() {
        this.isSearcResultShown = true;
    }

    @HostListener("document:click")
    focusOut() {
        this.isSearcResultShown = false;
    }

    constructor(private bookService: BookService, private router: Router) { }

    ngOnInit() {
    }

    search(input) {
        this.bookService.getBooks("", "", input.value).subscribe(
            result => {
                this.searchedBooks = result;
                this.show5();
                this.isSearcResultShown = true;
            })
    }

    show5() {
        this.show5Books = [];
        for (let i = 0; i < 5; i++) {
            if (this.searchedBooks[i]) {
                this.show5Books.push(this.searchedBooks[i]);
            }
        }
    }
}
