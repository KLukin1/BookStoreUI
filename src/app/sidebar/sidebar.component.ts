import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { Category, CategoryUI } from '../models/category-model';

@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.less']
})
export class SidebarComponent implements OnInit {

    categories: Category[] = [];
    categoryUI: CategoryUI[] = [];
    selectedCategory: CategoryUI = new CategoryUI();
    authorLastName: string;
    selected: number = 0;
    @Output() closeHambi = new EventEmitter();
    loader: boolean = true;

    constructor(private categoryService: CategoryService) { }

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.categoryService.getCategories().subscribe(
            response => {
                this.loader = false;
                this.categories = response;
                for (let oneCateg of this.categories) {
                    var c = this.categoryUI.find(x => x.categoryName == oneCateg.categoryName);
                    if (c) {
                        c.authors.push(oneCateg.authorFullName);
                    } else {
                        var newC = new CategoryUI();
                        newC.authors = [];
                        newC.categoryName = oneCateg.categoryName;
                        newC.authors.push(oneCateg.authorFullName);
                        this.categoryUI.push(newC);
                    }
                }
            }
        )
    }

    dropdown(category: CategoryUI) {
        if (this.selectedCategory.categoryName == category.categoryName) {
            this.selectedCategory = new CategoryUI();
        } else {
            this.selectedCategory = category;
        }
    }

    getLastName(author: string) {
        var i = author.indexOf(",");
        return author.slice(0, i);
    }

    closeHamburger() {
        this.closeHambi.emit(false);
    }
}
