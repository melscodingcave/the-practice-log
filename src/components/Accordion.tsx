import { useState } from 'react'

interface Props {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}

export default function Accordion({ title, defaultOpen = false, children }: Props) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="bg-gray-800 rounded-lg mb-4 overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 
                   text-blue-400 font-bold text-lg hover:bg-gray-700"
            >
                <span>{title}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="p-4 pt-0">
                    {children}
                </div>
            )}
        </div>
    )
}