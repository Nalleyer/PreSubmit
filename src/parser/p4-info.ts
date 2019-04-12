import { Parser, ParserResult, maybeParse } from './base'
import { P4Info } from '@/interface/app'

import P from 'parsimmon'

type StringPair = [string, string]
type RawResult = StringPair[]

const keywordMap: any = {
    'User name': 'userName',
    'Client root': 'clientRoot',
}


function postProcess(parseResult: RawResult): P4Info {
    const result: any = {}
    for (const pair of parseResult) {
        const newKey = keywordMap[pair[0]]
        if (newKey) {
            result[newKey] = pair[1]
        } else {
            result[pair[0]] = pair[1]
        }
    }
    return result
}


const infoLine: P.Parser<StringPair> = P.seq(
    P.regexp(/[\w| ]+/),
    P.string(': '),
    P.regexp(/.*/),
    P.newline,
).map(([key, _1, value, _2]) => {
    return [key, value]
})

const info: P.Parser<RawResult> = infoLine
    .many()

export class P4InfoParser implements Parser<P4Info> {

    public parse(input: string): ParserResult<P4Info> {
        return maybeParse(info, input).map(postProcess)
    }
}
