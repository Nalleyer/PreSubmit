export interface AppState {
    p4State: P4State,
    p4Info: P4Info,
}

export interface P4Info {
    userName: string,
    clientRoot: string,
    [propName: string]: string,
}

export interface P4State {
    isReady: boolean,
}

export type P4Changes = P4Change[]

export interface P4Change {
    id: number,
    description: string,
    date?: Date,
    files: File[],
}

export interface File {
    name: string,
    fullPath: string, // NOTE: use '/' for separator
}

export interface Plugin {
    name: string,
    commandTemplate: string,
}
