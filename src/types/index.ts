export interface Shot {
    id: string
    sessionId: string
    cueBallContact: CueBallContact
    power: Power
    result: ShotResult
    notes: string
}

export interface Session {
    id: string
    date: string
    drillType: string
    notes: string
    shots: Shot[]
}

export type CueBallContact =
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'

export type Power = 'light' | 'medium' | 'hard'

export type ShotResult = 'made' | 'missed'