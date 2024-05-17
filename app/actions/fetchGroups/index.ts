"use server"
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/db";
import { getServerSession } from "next-auth";

export default async function fetchGroups() {
    const session = await getServerSession(authOptions);
    const groupsId: any = await prisma.groupMember.findMany({
        where: {
            userId: Number(session.user.id),
        },
        select: {
            groupId: true
        }
    })
    const groupIdArray = groupsId.map((group: { groupId: number }) => {
        return group.groupId;
    })
    const groups = await prisma.groups.findMany({
        where: {
            id: {
                in: groupIdArray
            }
        }
    })
    return { groups }
}