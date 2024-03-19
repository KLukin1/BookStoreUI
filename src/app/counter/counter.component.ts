import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Component({
    selector: 'counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.less']
})
export class CounterComponent {

    @Input() counter: number;
    @Output() change = new EventEmitter<number>();

    constructor(private notifier: NotifierService) { }

    changeCount(c: boolean) {
        if (c == true) {
            this.counter += 1;
            this.change.emit(this.counter);
        } else if (c == false && this.counter == 1) {
            this.counter = 1;
            this.notifier.notify("warning", "Number of books cannot be less than 1");
        } else {
            this.counter -= 1;
            this.change.emit(this.counter);
        }
    }
}
