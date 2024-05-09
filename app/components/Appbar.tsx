"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react";
import AddCategory from "../actions/addcategory";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


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
        <div className="flex justify-between items-center p-10 bg-slate-700 text-white w-full">
            <div>
                <h3 className="font-sans text-4xl">Expenses Tracker</h3>
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
                                <button
                                    onClick={() => {
                                        signOut();
                                        router.push("/");
                                    }}
                                    className="px-4 py-2 bg-gray-950 rounded-md hover:bg-gray-800 font-mono">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    signIn();
                                }}
                                className="px-4 py-2 bg-gray-950 rounded-md hover:bg-gray-800 font-mono">
                                Login
                            </button>
                        )

                    }
                </div>
            </div>
        </div>
    )
}