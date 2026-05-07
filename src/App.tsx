import { useState } from 'react'
import './App.css'
import SessionForm from './components/session/SessionForm'
import SessionHistory from './components/session/SessionHistory'
import type { Session } from './types'

function App() {
  const [sessions, setSessions] = useState<Session[]>([])

  function handleSessionCreated(session: Session) {
    setSessions([...sessions, session])
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-blue-800 p-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-400">🎱 The Practice Log</h1>
        <p className="text-gray-400 mt-1">Track your billiards practice sessions</p>
      </header>

      <main className="max-w-4xl mx-auto px-6">
        <SessionForm onSessionCreated={handleSessionCreated} />
        <SessionHistory sessions={sessions} />
      </main>
    </div>
  )
}

export default App