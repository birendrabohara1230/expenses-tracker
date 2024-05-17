import { useState } from "react"
import addGroup from "../actions/addGroup";
import { toast } from "sonner";
export default function AddGroup() {
    const [isClicked, setIsClicked] = useState(false);
    const [groupName, setGroupName] = useState("");
    const handleAddGroup = async () => {
        if (groupName.trim() === "") {
            toast.error("Group name required.");
        } else {
            const res = await addGroup(groupName);
            if (res) {
                toast.success("Group added successfully");
                setGroupName("");
                setIsClicked(false);
            } else {
                toast.error("Error adding group name.");
            }
        }
    }
    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        setIsClicked(!isClicked);
                    }}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md border-none hover:bg-gray-600">
                    Create group
                </button>
            </div>
            {
                isClicked ? (
                    <div className="fixed bg-slate-950 mt-2 z-50 p-4 rounded-md">
                        <div className="">
                            <input
                                onChange={(e) => {
                                    setGroupName(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddGroup();
                                    }
                                }}
                                value={groupName}
                                type="text"
                                name="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Group name" required
                            />
                        </div>
                        <div className="flex gap-5 justify-between">
                            <div className="mt-2">
                                <button
                                    onClick={() => {
                                        handleAddGroup();
                                    }}
                                    className="px-4 py-2 bg-gray-800 text-white rounded-md border-none hover:bg-gray-600">
                                    Add group
                                </button>
                            </div>
                            <div className="mt-2">
                                <button
                                    onClick={() => {
                                        setIsClicked(false);
                                    }}
                                    className="px-4 py-2 bg-red-700 text-white rounded-md border-none hover:bg-red-800">
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                ) : ""
            }
        </div>
    )
}