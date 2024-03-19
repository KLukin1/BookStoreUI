import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { OneBookComponent } from './one-book/one-book.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BooksComponent },
    { path: 'account', component: AccountComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'books/:id', component: OneBookComponent },
    { path: 'forgot-password', component: ForgotPassComponent },
    { path: 'create-account', component: CreateAccountComponent },
    { path: 'history', component: HistoryComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
