import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
        return NextResponse.json({ error: 'Email is missing' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                fullName: true,
                email: true,
            }
        });

        //sender to receiver (str)
        const str = await prisma.invitation.findFirst({
            where: {
                AND: [
                    { receiverId: user?.id },
                    { senderId: Number(session.user.id) }
                ]
            }
        })
        
        // receiver to sender (rts)
        const rts = await prisma.invitation.findFirst({
            where: {
                AND: [
                    { receiverId: Number(session.user.id) },
                    { senderId: user?.id }
                ]
            }
        })

        if (str || rts) {
            return NextResponse.json({ message: 'Already relationship exists.' }, { status: 409 });
        }

        if (!user) {
            return NextResponse.json({ error: 'User with this email does not exist.' }, { status: 404 });
        }

        const invitation = await prisma.invitation.findFirst({
            where: {
                receiverId: user.id,
                isAccepted: false
            },
            select: {
                isAccepted: true,
                receiverId: true
            }
        })
        if (invitation) {
            const userInfo = { ...user, ...invitation }
            return NextResponse.json(userInfo);
        } else {
            const userInfo = { ...user }
            return NextResponse.json(userInfo);
        }
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
