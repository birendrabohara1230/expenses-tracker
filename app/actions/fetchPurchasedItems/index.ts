"use server"
import prisma from "@/app/db";
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
export default async function fetchPurchasedItems() {
    const session = await getServerSession(authOptions);
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