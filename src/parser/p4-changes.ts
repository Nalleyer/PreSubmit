import { Parser, ParserResult, maybeParse } from './base'
import { P4Changes } from '@/interface/app'

import P from 'parsimmon'

type RawLine = [number, Date, string]
type RawResult = RawLine[]


const changeLine: P.Parser<RawLine> = P.seq(
    P.regexp(/Change (\d+) on /, 1),
    P.regexp(/\d+\/\d+\/\d+/),
    P.regexp(/.*?'(.*)'/, 1),
    P.newline,
).map((ls) => {
    return [Number(ls[0]), new Date(ls[1]), ls[2]]
})

const changes: P.Parser<RawResult> = changeLine.many()

function postProcess(parseResult: RawResult): P4Changes {
    return parseResult.map(([id, date, desc]) => {
        return {
            id,
            description: desc,
            date,
            files: [],
        }
    }).sort((a, b) => a.id - b.id)
}

export class P4ChangesParser implements Parser<P4Changes> {
    public parse(input: string): ParserResult<P4Changes> {
        return maybeParse(changes, input).map(postProcess)
    }
}
