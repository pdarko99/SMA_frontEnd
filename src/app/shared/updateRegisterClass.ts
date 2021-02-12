export interface updateRegister {
    status: string;
    classTeacher?: string;
    subjectGroup: BuildClasses[]
}

interface BuildClasses {
    class: string;
    subjects: subject[]
}

export interface subject {
    subject: string;
}