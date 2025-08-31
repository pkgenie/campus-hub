'use client'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <button className="w-full border rounded p-2" onClick={() => signIn('google')}>Continue with Google</button>
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault()
            const email = new FormData(e.currentTarget).get('email') as string
            signIn('credentials', { email, callbackUrl: '/' })
          }}
        >
          <input className="w-full border rounded p-2" name="email" placeholder="or use email" />
          <button className="w-full border rounded p-2" type="submit">Continue</button>
        </form>
      </div>
    </main>
  )
}
