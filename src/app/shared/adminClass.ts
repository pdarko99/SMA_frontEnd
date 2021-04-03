export interface admin {
    teachers: number;
    approvedFees? : number;
    headmasters: number;
    accounts: number;
    classGroup: classes[]
    
}

interface classes {
    class: string;
    subjects:subject[]
}

export interface subject {
    subject: string
}

export interface feedback{
    username: string;
    text: string;
}