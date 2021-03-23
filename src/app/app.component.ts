import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import {fader} from './route.animations'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fader
    // trigger('routeAnimations', [
    //   transition('void => *', [
    //     style({transform: 'translateX(-100%'}),
    //     animate('1s')
    //   ]),
    //   transition('* => void', [
    //     animate('1s', style({transform: 'translateX(100%)'}))
    //   ])
    // ])
  ]
})
export class AppComponent {
  title = 'SMA';
  showDiv: boolean = true;
  toggleDiv(): void {
    this.showDiv = this.showDiv ? false : true
  }

}


