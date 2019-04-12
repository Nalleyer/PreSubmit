import {Maybe} from '@/interface/maybe'

import P from 'parsimmon'

export interface Parser<T> {
    parse(input: string): Maybe<T>
}

export type ParserResult<T> = Maybe<T>

export function maybeParse<T>(parser: P.Parser<T>, input: string): Maybe<T> {
    const res = parser.parse(input)
    if (res.status === true) {
        return Maybe.Just(res.value)
    } else {
        return Maybe.Nothing()
    }
}
