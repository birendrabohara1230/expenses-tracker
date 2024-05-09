"use server"
import bcryptjs from "bcryptjs";
import prisma from "@/db";
export default async function userSignup(email: string, fullName: string, password: string) {
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        await prisma.user.create({
            data: {
                email,
                fullName,
                password: hashedPassword
            }
        })
        return true;
    } catch (error) {
        return false;
}}
