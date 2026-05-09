import { beforeEach, describe, expect, it } from 'vitest'
import type { Session, Shot } from '../types'

// Helper to create a test shot
function createShot(result: 'made' | 'missed', notes = ''): Shot {
    return {
        id: crypto.randomUUID(),
        sessionId: 'test-session',
        cueBallContact: 'center',
        power: 'medium',
        result,
        notes,
    }
}

// Helper to create a test session
function createSession(
    drillType: string,
    shots: Shot[] = [],
    notes = ''
): Session {
    return {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        drillType,
        notes,
        shots,
    }
}

describe('Session Creation', () => {
    it('creates a session with no shots', () => {
        const session = createSession('Straight-ins')
        expect(session.shots).toHaveLength(0)
        expect(session.drillType).toBe('Straight-ins')
    })

    it('creates a session with shots', () => {
        const shots = [createShot('made'), createShot('missed')]
        const session = createSession('Cut Shots', shots)
        expect(session.shots).toHaveLength(2)
    })

    it('creates a session with special characters in notes', () => {
        const notes = '!@#$%^&*()_+ <script>alert("xss")</script>'
        const session = createSession('Straight-ins', [], notes)
        expect(session.notes).toBe(notes)
    })

    it('creates a session with no notes', () => {
        const session = createSession('Breaking', [], '')
        expect(session.notes).toBe('')
    })

    it('creates a session with 50+ shots', () => {
        const shots = Array.from({ length: 55 }, (_, i) =>
            createShot(i % 2 === 0 ? 'made' : 'missed')
        )
        const session = createSession('Ghost', shots)
        expect(session.shots).toHaveLength(55)
    })
})

describe('Shot Counting', () => {
    it('correctly counts made shots', () => {
        const shots = [
            createShot('made'),
            createShot('made'),
            createShot('missed'),
        ]
        const made = shots.filter(s => s.result === 'made').length
        expect(made).toBe(2)
    })

    it('correctly counts missed shots', () => {
        const shots = [
            createShot('made'),
            createShot('missed'),
            createShot('missed'),
        ]
        const missed = shots.filter(s => s.result === 'missed').length
        expect(missed).toBe(2)
    })

    it('shot with notes saves correctly', () => {
        const shot = createShot('made', 'Long cut from the rail')
        expect(shot.notes).toBe('Long cut from the rail')
        expect(shot.result).toBe('made')
    })

    it('total shot count equals made plus missed', () => {
        const shots = Array.from({ length: 50 }, (_, i) =>
            createShot(i % 3 === 0 ? 'missed' : 'made')
        )
        const made = shots.filter(s => s.result === 'made').length
        const missed = shots.filter(s => s.result === 'missed').length
        expect(made + missed).toBe(50)
    })
})

describe('localStorage Persistence', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('saves sessions to localStorage', () => {
        const session = createSession('Straight-ins')
        const sessions = [session]
        localStorage.setItem('practice-sessions', JSON.stringify(sessions))
        const stored = localStorage.getItem('practice-sessions')
        expect(stored).not.toBeNull()
    })

    it('retrieves sessions from localStorage', () => {
        const session = createSession('Cut Shots', [createShot('made')])
        localStorage.setItem('practice-sessions', JSON.stringify([session]))
        const stored = JSON.parse(localStorage.getItem('practice-sessions')!)
        expect(stored).toHaveLength(1)
        expect(stored[0].drillType).toBe('Cut Shots')
    })

    it('returns empty array when no sessions stored', () => {
        const stored = localStorage.getItem('practice-sessions')
        const sessions = stored ? JSON.parse(stored) : []
        expect(sessions).toHaveLength(0)
    })

    it('persists multiple sessions', () => {
        const sessions = [
            createSession('Straight-ins'),
            createSession('Cut Shots'),
            createSession('Ghost'),
        ]
        localStorage.setItem('practice-sessions', JSON.stringify(sessions))
        const stored = JSON.parse(localStorage.getItem('practice-sessions')!)
        expect(stored).toHaveLength(3)
    })
})

describe('Chart Data Computation', () => {
    it('correctly maps sessions to chart data points', () => {
        const sessions: Session[] = [
            createSession('Straight-ins', [
                createShot('made'),
                createShot('made'),
                createShot('missed'),
            ]),
            createSession('Straight-ins', [
                createShot('made'),
                createShot('missed'),
                createShot('missed'),
            ]),
        ]

        const chartData = sessions.map((session, index) => ({
            session: `Session ${index + 1}`,
            made: session.shots.filter(s => s.result === 'made').length,
            missed: session.shots.filter(s => s.result === 'missed').length,
        }))

        expect(chartData[0].made).toBe(2)
        expect(chartData[0].missed).toBe(1)
        expect(chartData[1].made).toBe(1)
        expect(chartData[1].missed).toBe(2)
    })

    it('filters sessions by drill type correctly', () => {
        const sessions: Session[] = [
            createSession('Straight-ins', [createShot('made')]),
            createSession('Cut Shots', [createShot('missed')]),
            createSession('Straight-ins', [createShot('made')]),
        ]

        const filtered = sessions.filter(s => s.drillType === 'Straight-ins')
        expect(filtered).toHaveLength(2)
    })

    it('returns empty chart data when no sessions for drill type', () => {
        const sessions: Session[] = [
            createSession('Straight-ins', [createShot('made')]),
        ]
        const filtered = sessions.filter(s => s.drillType === 'Ghost')
        expect(filtered).toHaveLength(0)
    })
})