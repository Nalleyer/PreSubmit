import { Parser, ParserResult } from './base'
import { P4Info } from '@/interface'

import P from 'parsimmon'

type StringPair = [string, string]
type RawResult = StringPair[]

export class P4InfoParser implements Parser<P4Info> {

    private keywordMap: any = {
        'User name': 'userName',
        'Client root': 'clientRoot',
    }

    private infoLine: P.Parser<StringPair> = P.seq(
        P.regexp(/[\w| ]+/),
        P.string(': '),
        P.regexp(/.*/),
        P.newline,
    ).map(([key, _1, value, _2]) => {
        return [key, value]
    })

    private info: P.Parser<RawResult> = this.infoLine
        .many()

    public parse(input: string): ParserResult<P4Info> {
        const parseResult = this.info.tryParse(input)
        return this.postProcess(parseResult)
    }

    private postProcess(parseResult: RawResult): ParserResult<P4Info> {
        if (!parseResult) {
            return undefined
        } else {
            const result: any = {}
            for (const pair of parseResult) {
                const newKey = this.keywordMap[pair[0]]
                if (newKey) {
                    result[newKey] = pair[1]
                } else {
                    result[pair[0]] = pair[1]
                }
            }
            return result
        }
    }
}
