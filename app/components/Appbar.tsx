"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react";
import AddCategory from "../actions/addcategory";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SeeGroups from "./SeeGroups";
import SeeInvitationRequest from "./SeeInvitationRequest";
import Link from "next/link";


export default function Appbar() {
    const session = useSession();
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const addCategory = async () => {
        if (categoryName.trim() === "") {
            toast.error("Please enter category name");
        } else {
            const response = await AddCategory(categoryName);
            if (response) {
                toast.success("Category Added Successfully");
                setCategoryName("");
            } else {
                toast.error("Error Adding Category. You must be admin.");
            }
        }
    }
    return (
        <div className="flex justify-between items-center p-10 bg-slate-700 text-white w-full fixed top-0 z-20">
            <div>
                <h3 className="font-sans text-4xl"> <Link href="/">Expense Tracker</Link> </h3>
            </div>
            <div className="flex gap-4">
                {
                    isClicked ? (
                        <div>
                            <input
                                onChange={(e) => {
                                    setCategoryName(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        addCategory();
                                    }
                                }}
                                type="text"
                                name="category"
                                value={categoryName}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category name" required
                            />
                        </div>
                    ) : ""
                }
                <div>
                    {
                        session.data ? (
                            <div className="flex gap-5">
                                <div>
                                    <button
                                        onClick={() => {
                                            setIsClicked(!isClicked);
                                        }}
                                        className="px-4 py-2 bg-gray-950 rounded-md hover:bg-gray-800 font-mono">
                                        Add Category
                                    </button>
                                </div>
                                <div>
                                    <SeeGroups />
                                </div>
                                <SeeInvitationRequest />
                                <div>
                                    <button
                                        onClick={() => {
                                            router.push("/groups");
                                        }}
                                        className="px-4 py-2 bg-gray-950 text-white rounded-md border-none hover:bg-gray-600">
                                        Manage groups
                                    </button>
                                </div>

                                <div>
                                    <button
                                        onClick={() => {
                                            signOut({callbackUrl: "/"});
                                        }}
                                        className="px-4 py-2 bg-gray-950 rounded-md hover:bg-gray-800 font-mono">
                                        Logout
                                    </button>
                                </div>
                                <div className="font-semibold font-mono">
                                    <span>{`Hello,`}</span> <br />
                                    <span>{session.data.user?.name}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        router.push("/signup");
                                    }}
                                    className="px-4 py-2 bg-gray-950 rounded-md hover:bg-gray-800 font-mono">
                                    Signup
                                </button>
                                <button
                                    onClick={() => {
                                        signIn();
                                    }}
                                    className="px-4 py-2 bg-gray-950 rounded-md hover:bg-gray-800 font-mono">
                                    Login
                                </button>
                            </div>
                        )

                    }
                </div>
            </div>
        </div>
    )
}