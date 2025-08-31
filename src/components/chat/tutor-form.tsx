'use client'

import { useState } from 'react'
import { z } from 'zod'

const tutorSchema = z.object({
  role: z.enum(['ML Expert', 'AI Expert', 'DSA Expert']),
  apiKey: z.string().min(1, 'API key is required')
})

interface TutorFormProps {
  onSubmit: (data: z.infer<typeof tutorSchema>) => void
  disabled?: boolean
}

export function TutorForm({ onSubmit, disabled }: TutorFormProps) {
  const [role, setRole] = useState<'ML Expert' | 'AI Expert' | 'DSA Expert'>('ML Expert')
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = tutorSchema.safeParse({ role, apiKey })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    onSubmit(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Choose your tutor</label>
        <div className="grid grid-cols-3 gap-3">
          {(['ML Expert', 'AI Expert', 'DSA Expert'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
                role === r
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-gray-300 hover:border-indigo-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Perplexity API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          className="w-full px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Start Chat
      </button>
    </form>
  )
}
