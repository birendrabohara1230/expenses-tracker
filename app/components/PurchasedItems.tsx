export default function PurchasedItems({ dbPurchasedItems }: any) {
    let count = 1;
    let grandTotal = 0;
    dbPurchasedItems.map((item: any) => {
        grandTotal += item.amount;
    })
    return (
        <div className="flex">
            <div className="bg-slate-700 w-3/5 rounded-md m-auto p-10 text-white flex justify-between items-center font-mono mt-10">
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    S.N
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Item Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Purchased Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Purchased By
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dbPurchasedItems.map((item: any) => (
                                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {count++})
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.itemName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.categories.catName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.purchasedDate}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.user.fullName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {`Rs ${item.amount}`}
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

                                </th>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4">

                                </td>
                                <td className="px-6 py-4 font-bold text-sm">
                                    Grand Total:
                                </td>
                                <td className="px-6 py-4 font-bold text-red-500">
                                    Rs {grandTotal}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}