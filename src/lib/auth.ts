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
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
  },
  session: { strategy: 'jwt' as const },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user, account, profile }: { token: JWT; user?: User; account?: Account | null; profile?: Profile | null }) {
      if (user?.id) {
        token.uid = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token?.uid) (session as any).user.id = token.uid;
      return session;
    },
  },
}
