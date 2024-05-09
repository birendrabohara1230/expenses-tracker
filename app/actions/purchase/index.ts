"use server"
import prisma from "@/app/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import dayjs from "dayjs";
import e from "express";

export async function AddPurchase(itemName: string, amount: string, catId: string) {
    try {
        const { user } = await getServerSession(authOptions);
        const { id } = user;
        const currentDate = dayjs().format("YYYY-MMM-DD");
        await prisma.items.create({
            data: {
                itemName,
                purchasedDate: currentDate,
                amount: Number(amount),
                catId: Number(catId),
                userId: Number(id)
            }
        })
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}