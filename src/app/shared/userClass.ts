export class User{
    auth: boolean = false;
    token: string =''
    postion: string =''
    data: positions;
}

class positions {
    status: string = '';
    classTeacher: string = '';
    subjectGroup: group[] = []

}

class group {
    class: string = '';
    subjects: subject[] = []
}

class subject {
    subject: string = ''
}