import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { BasketComponent } from './basket/basket.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OneBookComponent } from './one-book/one-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NotifierModule } from "angular-notifier";
import { CounterComponent } from './counter/counter.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { LoaderComponent } from './loader/loader.component';
import { HistoryComponent } from './history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        AccountComponent,
        BasketComponent,
        SidebarComponent,
        HomeComponent,
        BooksComponent,
        OneBookComponent,
        ForgotPassComponent,
        CreateAccountComponent,
        CounterComponent,
        SearchComponent,
        CarouselComponent,
        LogoutComponent,
        LoaderComponent,
        HistoryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: 'right'
                },
                vertical: {
                    position: 'top'
                }
            }
        }),
        BrowserAnimationsModule,
        AccordionModule,
        CarouselModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
