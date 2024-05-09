
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from "@/app/db";
import bcryptjs from "bcryptjs";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {
                const userDb = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    },
                    select: {
                        id: true,
                        fullName: true,
                        password: true
                    }
                })
                if (userDb && userDb.password && (await bcryptjs.compare(credentials.password, userDb.password))) {
                    return {
                        id: userDb.id,
                        name: userDb.fullName,
                        email: credentials.email,
                    } as any;
                }
                return null;
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token, user }: any) => {
            if (session && session.user) {
                session.user.id = token.sub,
                session.user.role = token.email === process.env.ADMIN_EMAIL?"admin":"user";
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
}
