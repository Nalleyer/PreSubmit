export interface CommandResult {
    stdout: string,
    stderr: string,
}


export interface AppState {
    p4State: P4State,
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
