import { useState } from 'react'
import type { CueBallContact, Power, Shot, ShotResult } from '../../types'

interface Props {
    sessionId: string
    onShotAdded: (shot: Shot) => void
}

const CUE_BALL_CONTACTS: { value: CueBallContact; label: string }[] = [
    { value: 'center', label: 'Center' },
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
]

export default function ShotForm({ sessionId, onShotAdded }: Props) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [cueBallContact, setCueBallContact] = useState<CueBallContact>('center')
    const [power, setPower] = useState<Power>('medium')
    const [result, setResult] = useState<ShotResult>('made')
    const [notes, setNotes] = useState('')

    function handleSaveShot() {
        const shot: Shot = {
            id: crypto.randomUUID(),
            sessionId,
            cueBallContact,
            power,
            result,
            notes,
        }

        onShotAdded(shot)

        // Reset and collapse
        setCueBallContact('center')
        setPower('medium')
        setResult('made')
        setNotes('')
        setIsExpanded(false)
    }

    return (
        <div className="border border-gray-600 rounded-lg overflow-hidden">
            <button
                type="button"
                className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 
                   text-blue-400 font-semibold flex justify-between items-center"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span>Add Shot</span>
                <span>{isExpanded ? '▲' : '▼'}</span>
            </button>

            {isExpanded && (
                <div className="p-4 bg-gray-700 space-y-3">
                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                            Cue Ball Contact
                        </label>
                        <select
                            className="w-full bg-gray-600 text-white rounded px-3 py-2"
                            value={cueBallContact}
                            onChange={e => setCueBallContact(e.target.value as CueBallContact)}
                        >
                            {CUE_BALL_CONTACTS.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">Power</label>
                        <div className="flex gap-2">
                            {(['light', 'medium', 'hard'] as Power[]).map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPower(p)}
                                    className={`flex-1 py-2 rounded capitalize font-semibold text-sm
                    ${power === p
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">Result</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setResult('made')}
                                className={`flex-1 py-2 rounded font-semibold text-sm
                  ${result === 'made'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                    }`}
                            >
                                Made ✓
                            </button>
                            <button
                                type="button"
                                onClick={() => setResult('missed')}
                                className={`flex-1 py-2 rounded font-semibold text-sm
                  ${result === 'missed'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                    }`}
                            >
                                Missed ✗
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                            Notes <span className="text-gray-500">(optional)</span>
                        </label>
                        <input
                            type="text"
                            className="w-full bg-gray-600 text-white rounded px-3 py-2"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Anything notable about this shot?"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSaveShot}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                       font-bold py-2 rounded"
                    >
                        Save Shot
                    </button>
                </div>
            )}
        </div>
    )
}