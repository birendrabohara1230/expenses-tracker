export default function Homepage() {
    return (
        <div className="flex flex-col text-center items-center h-screen justify-center">
            <div className="text-white">
                <h1 className="text-3xl font-bold mb-4 animate-bounce">Welcome to</h1>
                <h2 className="text-5xl font-bold mb-4 animate-bounce">Expense Tracker</h2>
                <p className="text-2xl animate-pulse">Track. Manage. Save.</p>
            </div>
            <div className="w-max mt-10">
                <h1
                    className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
                    "Track Every Expense,<br />
                    Master Your Finances."
                </h1>
            </div>
        </div>
    )
}