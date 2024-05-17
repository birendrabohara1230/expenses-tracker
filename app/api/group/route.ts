import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        if (!session.user.id) return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        const body = await req.json();
        const { receiverId, groupId } = body;
        await prisma.invitation.create({
            data: {
                senderId: Number(session.user.id),
                receiverId: Number(receiverId),
                groupId: Number(groupId)
            }
        })
        return NextResponse.json({ message: "Sucess" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}