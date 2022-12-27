export interface DiagnosesEntry {
    code: string
    name: string
    latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientsEntry {
    id: string
    name: string
    dateOfBirth: string
    gender: string
    ssn: string
    occupation: string
    entries: Entry[]
}

export enum Gender {
    Male = "male",
    Female = "female",
    Others = "others"
}

