import { useEffect, useState } from "react"
import fetchGroups from "../actions/fetchGroups";

export default function SeeGroups() {
    const [isClicked, setIsClicked] = useState(false);
    const [groups, setGroups] = useState<any>([]);
    useEffect(() => {
        async function fetchData() {
            const { groups } = await fetchGroups();
            setGroups(groups);
        }
        fetchData();
    }, [])
    return (
        <div>
            <button
                onClick={async () => {
                    setIsClicked(!isClicked);
                }}
                id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex cursor-pointer items-center dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-slate-800" type="button">
                See groups
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            {
                isClicked ? (
                    <div id="dropdown" className="z-10 fixed  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-950 mt-2">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            {
                                groups.length > 0 ? (
                                    groups.map((group: any, index: number) => (
                                        <li key={index} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            {group.groupName}
                                        </li>
                                    ))
                                ) : (
                                    <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        No groups exits
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                ) : ""
            }
        </div>
    )
}