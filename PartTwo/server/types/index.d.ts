export interface DiagnosesEntry {
    code: string
    name: string
    latin?: string
}

export interface PatientsEntry {
    id: string
    name: string
    dateOfBirth: string
    gender: string
    ssn: string
    occupation: string
}

export enum Gender {
    Male = "male",
    Female = "female",
    Others = "others"
}