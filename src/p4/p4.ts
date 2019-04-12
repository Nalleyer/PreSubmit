import {P4Info, P4Changes} from '@/interface/app'
import {Maybe} from '@/interface/maybe'
import {P4InfoParser, P4ChangesParser} from '@/parser'
import {maybeP4CmdSync} from './p4-cmd'

export class P4 {
    public getInfo(): Maybe<P4Info> {
        const parser = new P4InfoParser()
        return maybeP4CmdSync('info')
            .connect(parser.parse)
    }

    public getChanges(info: P4Info): Maybe<P4Changes> {
        const parser = new P4ChangesParser()
        return maybeP4CmdSync(`changes -u ${info.userName} -s pending`)
            .connect(parser.parse)
    }
}
