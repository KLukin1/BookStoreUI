import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from '../models/category-model';
import * as myGlobals from '../global-variables';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    site = myGlobals.siteName;

    constructor(private httpClient: HttpClient) { }

    getCategories(): Observable<Category[]> {
        return this.httpClient.get(this.site + 'api/category')
            .pipe(map(response => <Category[]>response));
    }

}
