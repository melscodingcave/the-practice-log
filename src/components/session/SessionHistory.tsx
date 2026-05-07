import type { Session } from '../../types'
import AiDebrief from '../ai/AiDebrief'

interface Props {
    sessions: Session[]
}

export default function SessionHistory({ sessions }: Props) {
    if (sessions.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No sessions logged yet. Start practicing! 🎱
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {sessions.map(session => (
                <div key={session.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-white">{session.drillType}</h3>
                            <p className="text-gray-400 text-sm">
                                {new Date(session.date).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <div className="text-right text-sm">
                            <p>
                                <span className="text-blue-400 font-bold">
                                    {session.shots.length}
                                </span>
                                <span className="text-gray-400"> shots</span>
                            </p>
                            <p>
                                <span className="text-green-400 font-bold">
                                    {session.shots.filter(s => s.result === 'made').length}
                                </span>
                                <span className="text-gray-400"> made</span>
                            </p>
                            <p>
                                <span className="text-red-400 font-bold">
                                    {session.shots.filter(s => s.result === 'missed').length}
                                </span>
                                <span className="text-gray-400"> missed</span>
                            </p>
                        </div>
                    </div>

                    {session.notes && (
                        <p className="text-gray-400 text-sm italic mb-2">
                            "{session.notes}"
                        </p>
                    )}

                    {session.shots.length > 0 && (
                        <div className="mt-2 space-y-1">
                            {session.shots.map((shot, index) => (
                                <div
                                    key={shot.id}
                                    className="text-xs text-gray-500 bg-gray-700 
                             rounded px-2 py-1 flex justify-between"
                                >
                                    <span>
                                        Shot {index + 1}: <span className="capitalize">
                                            {shot.cueBallContact}
                                        </span> | <span className="capitalize">{shot.power}</span>
                                    </span>
                                    <span className={shot.result === 'made'
                                        ? 'text-green-400' : 'text-red-400'}>
                                        {shot.result === 'made' ? 'Made ✓' : 'Missed ✗'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <AiDebrief session={session} />

                </div>
            ))}
        </div>
    )
}