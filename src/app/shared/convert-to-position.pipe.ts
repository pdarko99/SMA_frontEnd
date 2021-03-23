import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToPosition'
})

export class convertToPositionPipe implements PipeTransform {
    transform(value: number): string {
        let number = value.toString();
        let lastNum = number.slice(number.length -1)
        let lastButOne = number.slice(number.length -2, -1) 
        let position;
        switch(true){
            case (lastNum ==='1' && lastButOne === '1' ):
                position = number + 'th'
                break;
            case (lastNum ==='2' && lastButOne === '1' ):
                position = number + 'th'
                break;
            case (lastNum ==='3' && lastButOne === '1' ):
                position = number + 'th'
                break;
            case (lastNum ==='2'):
                position = number + 'nd'
                break;
            case (lastNum ==='3'):
                position = number + 'rd';
                break;
            case (lastNum ==='1'):
                position = number + 'st'
                break;
            default:
                position = number + 'th'
            
        }
        return position
    }
}