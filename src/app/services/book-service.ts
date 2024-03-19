import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book-model';
import { map, catchError } from 'rxjs/operators';
import * as myGlobals from '../global-variables';


@Injectable({
    providedIn: 'root'
})
export class BookService {

    bookId: number;
    site = myGlobals.siteName;

    constructor(private httpClient: HttpClient) { }

    getBooks(categoryName: string, author: string, input: string): Observable<Book[]> {
        let url: string = this.site + 'api/books/';
        if (categoryName) {
            url += "?categoryName=" + categoryName;
            if (author) {
                url += "&author=" + author;
            }
        } else {
            if (author) {
                url += "?author=" + author;
            }
        }
        if (input) {
            url += "?input=" + input;
        }
        return this.httpClient.get(url)
            .pipe(map(response => <Book[]>response));
    }

    getBookById(id: number): Observable<Book> {
        return this.httpClient.get(this.site + 'api/books/' + id)
            .pipe(map(response => <Book>response))
    }

    getRecommended(): Observable<Book[]> {
        return this.httpClient.get(this.site + 'api/books/recommended')
            .pipe(map(response => <Book[]>response))
    }
}
