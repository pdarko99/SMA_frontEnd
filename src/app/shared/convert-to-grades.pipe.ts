import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToGrades'
})

export class convertToGradesPipe implements PipeTransform {
    transform(value: number | string): string {
        const x = value;
        let grade;
        switch(true){
            case (x >= 80 && x < 101):
                grade = 'A'
                break;
            case (x >= 70 && x < 80):
                grade = 'B';
                break;
            case (x >= 60 && x < 70):
                grade = 'C';
                break;
            case (x >= 50 && x < 60):
                grade = 'D'
                break;
            case (x >= 40 && x < 50):
                grade = 'E'
                break
            case (x >= 0 && x < 40):
                grade =  'F';
                break;
            default:
                grade = 'null'
            
        }
        return grade
    }
}