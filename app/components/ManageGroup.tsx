"use client"
import { useState } from "react";
import { toast } from "sonner";
import fetchGroups from "../actions/fetchGroups";
import { Groups } from "@prisma/client";
import Appbar from "./Appbar";
import { useSession } from "next-auth/react";




export default function ManageGroups() {
    const session = useSession();
    const [email, setEmail] = useState("");
    const [user, setUser] = useState<any>(null);
    const [groups, setGroups] = useState<Groups[] | null>(null);
    const [groupId, setGroupId] = useState("");

    const getGroups = async () => {
        const { groups }: { groups: Groups[] } = await fetchGroups();
        setGroups(groups);
    }

    const handleChangeInputEmail = async () => {
        if (email === session.data?.user?.email) {
            toast.error("You can't add youself.");
            return;
        }
        try {
            const response = await fetch(`/api/user?email=${encodeURIComponent(email)}`, {
                method: "GET"
            })

            const data = await response.json();

            const { message } = data;
            if (response.status === 409) {
                toast.info(message);
                return;
            }
            setUser(data);
        } catch (error) {
            toast.error("Error fetching data.")
        }
    };

    const handleAddToGroup = () => {
        if (groupId === "Select the group" || groupId === "") {
            toast.error("Please select the group.");
            return;
        }
        fetch("/api/group", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                receiverId: user?.id,
                groupId,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
            })
            .then(data => {
                toast.success("Invitation send successfully.")
                setEmail("");
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center p-10 mt-32">
                <div className="bg-gray-800 w-2/3 rounded-md flex p-10 gap-10">
                    <div>
                        <span className="text-white text-md font-mono">Email address</span>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setUser(null);
                                setGroups(null);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleChangeInputEmail();
                                }
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 hover:rounded-lg dark:focus:border-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    {
                        user &&
                        <div className="bg-gray-900 text-white py-2 px-4 rounded-md flex items-center gap-3">
                            <div className="font-mono p-2">
                                {user?.fullName}
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={getGroups}
                                    disabled={"isAccepted" in user ? true : false}
                                    className={`px-3 py-1 bg-blue-600 rounded-md ${"isAccepted" in user ? "bg-zinc-400 text-white" : ""}`}
                                >
                                    {"isAccepted" in user ? "Pending" : "Invite to"}
                                </button>
                            </div>
                        </div>
                    }
                    {groups &&
                        <div className="flex gap-5">
                            <div>
                                <select
                                    onChange={(e) => {
                                        setGroupId(e.target.value);
                                    }}
                                    className="bg-gray-50 font-mono border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-2 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Select the group</option>
                                    {
                                        groups && groups.map((group) => {
                                            return (
                                                <option key={group.id} value={group.id}>{group.groupName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <button
                                    onClick={handleAddToGroup}
                                    className={`px-3 py-1 bg-blue-600 rounded-md text-white`}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
