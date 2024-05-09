export default function TableSkeleton() {
    return (
        <div className="flex">
            <div className="bg-slate-700  w-3/5 m-auto rounded-md p-10 text-white flex justify-between items-center font-mono mt-10">
                <div role="status" className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                    <div className="flex items-center  gap-6 justify-between">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-10 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-36 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-32 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-36 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-32 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-20 mb-2.5"></div>
                        </div>
                    </div>
                    <div className="flex items-center  gap-6 justify-between">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-10 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-36 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-32 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-36 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-32 mb-2.5"></div>
                        </div>
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-20 mb-2.5"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}