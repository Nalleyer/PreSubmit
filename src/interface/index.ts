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

export interface Changes {
    [propName: number]: Change,
}

export interface Change {
    name: string,
    commandTemplate: string,
}
