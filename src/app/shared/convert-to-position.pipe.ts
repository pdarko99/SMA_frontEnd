import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToPosition'
})

export class convertToPositionPipe implements PipeTransform {
    transform(value: number): string {
        let number = value.toString();
        let newNum = number.slice(number.length -1)
        let position;
        switch(newNum){
            case ('1'):
                position = number + 'st'
                break;
            case ('2'):
                position = number + 'nd'
                break;
            case ('3'):
                position = number + 'rd';
                break;
            // case ('0'):
            //     position = number + 'th'
            //     break;
            default:
                position = number + 'th'
            
        }
        return position
    }
}