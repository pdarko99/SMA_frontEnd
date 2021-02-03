export interface admin {
    teachers: number;
    headmasters: number;
    accounts: number;
    classGroup: classes
    
}

interface classes {
    class: string;
    subjects:subject
}

interface subject {
    subject: string
}