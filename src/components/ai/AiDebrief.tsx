import { useState } from 'react'
import type { Session } from '../../types'

interface Props {
    session: Session
}

export default function AiDebrief({ session }: Props) {
    const [debrief, setDebrief] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleGetDebrief() {
        setLoading(true)
        setError('')
        setDebrief('')

        const made = session.shots.filter(s => s.result === 'made').length
        const missed = session.shots.filter(s => s.result === 'missed').length
        const total = session.shots.length
        const pct = total > 0 ? Math.round((made / total) * 100) : 0

        const shotBreakdown = session.shots.map((shot, i) =>
            `Shot ${i + 1}: ${shot.cueBallContact} contact, ${shot.power} power, ${shot.result}${shot.notes ? ` (${shot.notes})` : ''}`
        ).join('\n')

        const prompt = `You are a billiards coach reviewing a practice session. Be concise, encouraging, and specific.

Practice Session Summary:
- Drill Type: ${session.drillType}
- Date: ${new Date(session.date).toLocaleDateString()}
- Total Shots: ${total}
- Made: ${made} (${pct}%)
- Missed: ${missed}
${session.notes ? `- Session Notes: ${session.notes}` : ''}
${total > 0 ? `\nShot Details:\n${shotBreakdown}` : ''}

Please provide:
1. A brief assessment of this practice session (2-3 sentences)
2. One specific strength shown
3. One specific area to focus on next session
4. A motivational closing thought

Keep the entire response under 200 words. Do not use markdown formatting - no ## headers, no **bold**, just plain text with clear section labels followed by colons.`

        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true',
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-5',
                    max_tokens: 1000,
                    messages: [{ role: 'user', content: prompt }]
                })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(`API error: ${data.error?.message || 'Unknown error'}`)
                return
            }

            setDebrief(data.content[0].text)
        } catch (err) {
            setError('Failed to connect to AI. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-3">
            <button
                type="button"
                onClick={handleGetDebrief}
                disabled={loading}
                className="bg-blue-700 hover:bg-blue-600 disabled:bg-gray-600 
                   text-white text-sm font-semibold py-1.5 px-4 rounded"
            >
                {loading ? 'Analyzing...' : '🤖 Get AI Debrief'}
            </button>

            {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
            )}

            {debrief && (
                <div className="mt-3 bg-gray-700 border border-blue-800 rounded-lg p-4 text-sm">
                    <p className="text-blue-400 font-semibold mb-2">🤖 AI Coach Debrief</p>
                    <div className="text-gray-300 space-y-2">
                        {debrief.replace(/\r\n/g, '\n').split('\n').map((line, i) => {
                            if (line.trim().startsWith('## '))
                                return <p key={i} className="text-blue-300 font-bold mt-3">{line.trim().replace('## ', '')}</p>
                            if (line.trim().startsWith('# '))
                                return <p key={i} className="text-blue-400 font-bold text-base">{line.trim().replace('# ', '')}</p>
                            if (line.trim() === '')
                                return null
                            return (
                                <p key={i} dangerouslySetInnerHTML={{
                                    __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                }} />
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}