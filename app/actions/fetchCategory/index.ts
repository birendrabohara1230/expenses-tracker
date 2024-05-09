"use server"
import prisma from "@/db"
export default async function fetchAllCategory() {
    try {
        const allCategories = await prisma.categories.findMany({});
        return {categories: allCategories} as any;
    } catch (error) {
        return {message: "Error fetching categories"}
    }
}