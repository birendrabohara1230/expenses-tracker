"use server"
import { authOptions } from "@/app/lib/authOptions";
import prisma from "@/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

function addData(groupName: string) {
    return prisma.$transaction(async (tx: any) => {
        try {
            const session = await getServerSession(authOptions);
            const uniGroupName = groupName + "_" + session.user.id;
            const group = await tx.groups.create({
                data: {
                    groupName: uniGroupName,
                }
            })
            const groupMember = await tx.groupMember.create({
                data: {
                    userId: Number(session.user.id),
                    groupId: group.id,
                }
            })
            return true;
        } catch (error) {
            return false;
        }
    })
}


export default async function addGroup(groupName: string) {
    const res = await addData(groupName);
    return res;
}


