import {AppState, P4Info} from '@/interface'

export default {
    updateP4Info(state: AppState, p4Info: P4Info) {
        state.p4Info = p4Info
    },
}
