import { useState } from 'react'
import type { Session, Shot } from '../../types'
import ShotForm from '../shot/ShotForm'

interface Props {
    onSessionCreated: (session: Session) => void
}

const DRILL_TYPES = [
    'Straight-ins',
    'Cut Shots',
    'Cue Ball Control',
    'Breaking',
    'Safety Shots',
    'Kick Shots',
    'Bank Shots',
    'Ghost',
]

export default function SessionForm({ onSessionCreated }: Props) {
    const [drillType, setDrillType] = useState(DRILL_TYPES[0])
    const [notes, setNotes] = useState('')
    const [shots, setShots] = useState<Shot[]>([])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const session: Session = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            drillType,
            notes,
            shots,
        }

        onSessionCreated(session)
        setNotes('')
        setShots([])
    }

    return (
        <div className="mb-2">
            <h2 className="text-xl font-bold text-blue-400 mb-4">
                Log Practice Session
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Drill Type</label>
                    <select
                        className="w-full bg-gray-700 text-white rounded px-3 py-2"
                        value={drillType}
                        onChange={e => setDrillType(e.target.value)}
                    >
                        {DRILL_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-300 mb-1">Session Notes</label>
                    <textarea
                        className="w-full bg-gray-700 text-white rounded px-3 py-2"
                        rows={3}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder="What are you working on today?"
                    />
                </div>

                <div className="mb-4">
                    <p className="text-gray-300 mb-2">
                        Shots logged: <span className="text-blue-400 font-bold">{shots.length}</span>
                        {' '}| Made: <span className="text-green-400 font-bold">
                            {shots.filter(s => s.result === 'made').length}
                        </span>
                        {' '}| Missed: <span className="text-red-400 font-bold">
                            {shots.filter(s => s.result === 'missed').length}
                        </span>
                    </p>

                    {shots.length > 0 && (
                        <div className="space-y-1 mb-3">
                            {shots.map((shot, index) => (
                                <div
                                    key={shot.id}
                                    className="text-sm text-gray-400 bg-gray-700 rounded px-3 py-1"
                                >
                                    <span className="text-gray-300">Shot {index + 1}:</span>{' '}
                                    <span className="capitalize">{shot.cueBallContact}</span>{' '}
                                    | <span className="capitalize">{shot.power}</span>{' '}
                                    |{' '}
                                    <span className={shot.result === 'made'
                                        ? 'text-green-400' : 'text-red-400'}>
                                        {shot.result === 'made' ? 'Made ✓' : 'Missed ✗'}
                                    </span>
                                    {shot.notes && (
                                        <span className="text-gray-500"> — {shot.notes}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <ShotForm
                        sessionId=""
                        onShotAdded={shot => setShots([...shots, shot])}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                    Save Session
                </button>
            </form>
        </div>
    )
}