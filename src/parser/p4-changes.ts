import { Parser, ParserResult } from './base'
import { P4Changes } from '@/interface'

import P from 'parsimmon'

type RawLine = [number, Date, string]
type RawResult = RawLine[]

export class P4ChangesParser implements Parser<P4Changes> {

    private changeLine: P.Parser<RawLine> = P.seq(
        P.regexp(/Change (\d+) on /, 1),
        P.regexp(/\d+\/\d+\/\d+/),
        P.regexp(/.*?'(.*)'/, 1),
        P.newline,
    ).map((ls) => {
        return [Number(ls[0]), new Date(ls[1]), ls[2]]
    })

    private changes: P.Parser<RawResult> = this.changeLine.many()

    public parse(input: string): ParserResult<P4Changes> {
        const lines = this.changes.tryParse(input)
        return this.postProcess(lines)
    }

    private postProcess(parseResult: RawResult): ParserResult<P4Changes> {
        if (!parseResult) {
            return undefined
        } else {
            return parseResult.map( ([id, date, desc]) => {
                return {
                    id,
                    description: desc,
                    date,
                    files: [],
                }
            })
        }
    }
}
