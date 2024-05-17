"use server"
import prisma from "@/db";
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
export default async function fetchPurchasedItems() {
    const session = await getServerSession(authOptions);

    //fetching user belonging groups ids
    const groupIds = await prisma.groupMember.findMany({
        where: {
            userId: Number(session.user.id)
        },
        select: {
            groupId: true
        }
    })

    // if user does not belong to any group then fetch only that particular user expenses
    if (groupIds.length > 0) {

        const groups = groupIds.map(group => group.groupId);
        
        //fetching users ids belonging to same groups
        const userId = await prisma.groupMember.findMany({
            where: {
                groupId: {
                    in: groups
                }
            }
        })
        
        //extracting users ids only
        const users = userId.map(user => user.userId);

        //fetching expenses of all users belonging to same groups
        const items = await prisma.items.findMany({
            select: {
                id: true,
                itemName: true,
                amount: true,
                purchasedDate: true,
                categories: {
                    select: {
                        catName: true
                    }
                },
                user: {
                    select: {
                        fullName: true
                    }
                },
            },
            where: {
                userId: {
                    in: users
                }
            }
        })
        return { dbPurchasedItems: items };
    } else {

        //fetching expenses of a particular user only
        const items = await prisma.items.findMany({
            select: {
                id: true,
                itemName: true,
                amount: true,
                purchasedDate: true,
                categories: {
                    select: {
                        catName: true
                    }
                },
                user: {
                    select: {
                        fullName: true
                    }
                },
            },
            where: {
                userId: Number(session.user.id)
            }
        })
        return { dbPurchasedItems: items };
    }
}