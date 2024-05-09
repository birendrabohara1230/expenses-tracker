"use client"
import { useEffect, useState } from "react"
import fetchAllCategory from "../actions/fetchCategory"
import { AddPurchase } from "../actions/purchase";
import { toast } from "sonner";
import PurchasedItems from "./PurchasedItems";
import fetchPurchasedItems from "../actions/fetchPurchasedItems";
import TableSkeleton from "./TableSkeleton";


export default function Landing() {
    const [categoryId, setCategoryId] = useState("");
    const [itemName, setItemName] = useState("");
    const [amount, setAmount] = useState("");
    const [categories, setCategories] = useState<{ id: number, catName: string }[]>([]);
    const [purchasedItems, setPurchasedItem] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchCategories = async () => {
            const { categories } = await fetchAllCategory();
            const { dbPurchasedItems } = await fetchPurchasedItems();
            setCategories(categories);
            setPurchasedItem(dbPurchasedItems);
            setLoading(true);
        }
        fetchCategories();
    }, []);

    const handleAddPurchase = async () => {
        if (itemName && amount && categoryId) {
            const response = await AddPurchase(itemName, amount, categoryId);
            if (response) {
                const { dbPurchasedItems } = await fetchPurchasedItems();
                setPurchasedItem(dbPurchasedItems);
                toast.success("Item Added Successfully");
                setAmount("");
                setItemName("");
            } else {
                toast.error("Error Adding Item");
            }
        } else {
            toast.error("All fields are required.");
        }

    };
    return (
        <div className="mb-10">
            <div className="bg-slate-700 w-3/5 m-auto rounded-md p-10 text-white flex justify-between items-center font-mono mt-10">
                <div>
                    <select
                        onChange={(e) => {
                            setCategoryId(e.target.value);
                            console.log(e.target.value);
                        }}
                        className="bg-gray-50 font-mono border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Choose a category</option>
                        {
                            categories.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>{item.catName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <input
                        onChange={(e) => {
                            setItemName(e.target.value);
                        }}
                        type="text"
                        value={itemName}
                        className="block w-48 pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="enter item name"
                    />
                </div>

                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white pointer-events-none">Rs</span>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        value={amount}
                        type="text"
                        className="block w-48 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount" id="amountInput"
                    />
                </div>
                <div>
                    <button
                        onClick={handleAddPurchase}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md border-none hover:bg-gray-600">
                        Add item
                    </button>
                </div>
            </div>
            {loading ? <PurchasedItems dbPurchasedItems={purchasedItems} /> : <TableSkeleton />}
        </div>
    )
}