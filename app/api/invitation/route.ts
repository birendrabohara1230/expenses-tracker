import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const user = await prisma.invitation.findFirst({
            where: {
                receiverId: Number(session.user.id),
                isAccepted: false
            },
            select: {
                id: true,
                senderId: true,
                groupId: true
            }
        })
        if (user) {
            const sender = await prisma.user.findFirst({
                where: {
                    id: user.senderId
                },
                select: {
                    fullName: true,
                    email: true
                }
            })
            const userInfo = { ...user, ...sender };
            return NextResponse.json(userInfo, { status: 200 });
        }
        return NextResponse.json({ error: "User does not exists" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}