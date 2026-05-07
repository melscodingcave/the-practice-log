import { useState } from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import type { Session } from '../../types'

interface Props {
    sessions: Session[]
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

export default function TrendChart({ sessions }: Props) {
    const [selectedDrill, setSelectedDrill] = useState(DRILL_TYPES[0])

    const filteredSessions = sessions.filter(
        s => s.drillType === selectedDrill
    )

    const chartData = filteredSessions.map((session, index) => ({
        session: `Session ${index + 1}`,
        date: new Date(session.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }),
        made: session.shots.filter(s => s.result === 'made').length,
        missed: session.shots.filter(s => s.result === 'missed').length,
    }))

    return (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-400 mb-4">
                Practice Trends
            </h2>

            <div className="mb-4">
                <label className="block text-gray-300 mb-1">Drill Type</label>
                <select
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    value={selectedDrill}
                    onChange={e => setSelectedDrill(e.target.value)}
                >
                    {DRILL_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {chartData.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No sessions logged for {selectedDrill} yet.
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="date"
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: '1px solid #3B82F6',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="made"
                            stroke="#22C55E"
                            strokeWidth={2}
                            dot={{ fill: '#22C55E' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="missed"
                            stroke="#EF4444"
                            strokeWidth={2}
                            dot={{ fill: '#EF4444' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}