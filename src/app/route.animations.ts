import {
    trigger,
    transition,
    style,
    query,
    animate,
} from "@angular/animations"

export const fader = 
     trigger('routeAnimations', [
      transition('* => *', [
        style({transform: 'translateX(-100%'}),
        animate('1s')
      ]),
      transition('* => *', [
        animate('600ms', style({transform: 'translateX(100%)'}))
      ])
    ])