"use server"
import prisma from "@/db";
import { authOptions } from "@/app/lib/authOptions";
import { getServerSession } from "next-auth";
export default async function AddCategory(catName: string) {
    const session = await getServerSession(authOptions);
    if (session.user.role === "admin") {
        try {
            await prisma.categories.create({
                data: {
                    catName,
                }
            })
            return true;
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
}