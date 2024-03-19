import { Component } from '@angular/core';
import * as myGlobals from '../global-variables';


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.less']
})
export class HomeComponent {

    siteName: string = myGlobals.siteName;
}
