import {P4Info, P4Changes} from '@/interface'
import {P4InfoParser, P4ChangesParser} from '@/parser'
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

    public getChanges(info: P4Info): P4Changes | undefined {
        const parser = new P4ChangesParser()
        const rawInfo = p4cmdSync(`changes -u ${info.userName} -s pending`)
        if (rawInfo && rawInfo.stdout) {
            return parser.parse(rawInfo.stdout)
        } else {
            return undefined
        }
    }
}
