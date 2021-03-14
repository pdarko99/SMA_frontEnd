export interface students {
    _id?: string;
    firstname: string;
    lastname: string;
    age: number;
    gender: string;
    guardians_tel: number;
    fees?: any;
    grandScore?: number
}

export interface scores {
    subjects: string;
    classScore: string;
    examsScore: string;
}

export interface account {
    paid: number
}