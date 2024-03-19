import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BasketItem, HistoryItem } from '../models/basket-model';
import * as myGlobals from '../global-variables';

@Injectable({
    providedIn: 'root'
})
export class BasketService {

    site = myGlobals.siteName + 'api/basket';

    constructor(private httpClient: HttpClient) { }

    // todo - bug when item is already in basket -> adding book doesn't work on one-book-component or recomendations
    addBookToDB(id: number, count: number): Observable<number> {
        return this.httpClient.post(this.site, { BookId: id, Count: count })
            .pipe(map(response => <number>response));
    }

    getBasket(): Observable<BasketItem[]> {
        return this.httpClient.get(this.site)
            .pipe(map(response => <BasketItem[]>response));
    }

    changeCount(book: BasketItem): Observable<BasketItem> {
        return this.httpClient.put(this.site + '/basketItem', book)
            .pipe(map(response => <BasketItem>response));
    }

    getBasketCountApi(): Observable<number> {
        return this.httpClient.get(this.site + '/count')
            .pipe(map(response => <number>response));
    }

    pay(userId: number): Observable<any> {
        return this.httpClient.put(this.site + '/checkout', userId)
            .pipe(map(response => <any>response));
    }

    getHistory(): Observable<HistoryItem[]> {
        return this.httpClient.get(this.site + '/history')
            .pipe(map(response => <HistoryItem[]>response));
    }

    private subject = new Subject<any>();

    sendBasketNum() {
        this.subject.next(null);
    }

    getBasketNum(): Observable<any> {
        return this.subject.asObservable();
    }
}
