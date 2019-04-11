export interface Parser<T> {
    parse(input: string): T | undefined
}

export type ParserResult<T> =  T | undefined
