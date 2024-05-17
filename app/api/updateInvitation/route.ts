import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(req.url);
        const groupId = searchParams.get('groupId');
        const invitationId = searchParams.get("invitationId");
        await prisma.$transaction(async (tx) => {
            await tx.invitation.update({
                data: {
                    isAccepted: true
                },
                where: {
                    id: Number(invitationId)
                }
            })
            await tx.groupMember.create({
                data: {
                    userId: Number(session.user.id),
                    groupId: Number(groupId)
                }
            })
        })

        return NextResponse.json({ message: "Success" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error, });
    }

}


export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);
        if (!session.user.id) return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        const { searchParams } = new URL(req.url);
        const invitationId = searchParams.get("invitationId");
        await prisma.invitation.delete({
            where: {
                id: Number(invitationId)
            }
        })
        return NextResponse.json({ message: "Success" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error, });
    }

}