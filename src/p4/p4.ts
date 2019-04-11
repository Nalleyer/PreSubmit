import {P4Info} from '@/interface'
import {P4InfoParser} from '@/parser'
import {p4cmdSync} from './p4-cmd'

export class P4 {
    public getInfo(): P4Info | undefined {
        const parser = new P4InfoParser()
        const rawInfo = p4cmdSync('info')
        if (rawInfo && rawInfo.stdout) {
            return parser.parse(rawInfo.stdout)
        } else {
            return undefined
        }
    }
}
