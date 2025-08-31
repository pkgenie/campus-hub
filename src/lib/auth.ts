import NextAuth, { type User, type Account, type Profile } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './db'

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: 'Email only',
      credentials: { email: { label: 'Email', type: 'email' } },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        if (!email) return null
        let user = await prisma.user.findUnique({ where: { email } })
        if (!user) user = await prisma.user.create({ data: { email } })
        return { id: user.id, email: user.email ?? undefined, name: user.name ?? undefined }
      },
    }),
  ],
  session: { strategy: 'jwt' as const },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | any | null }) {
      if (user && 'id' in user) token.uid = user.id;
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token?.uid) (session as any).user.id = token.uid;
      return session;
    },
  },
}
