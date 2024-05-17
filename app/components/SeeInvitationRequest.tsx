import { useState } from "react"
import { toast } from "sonner";

export default function SeeInvitationRequest() {
    const [isClicked, setIsClicked] = useState(false);
    const [users, setUsers] = useState<any>({})
    const fetchInvitation = () => {
        fetch("/api/invitation", {
            method: "GET",
        })
            .then(response => {
                if (!response.ok) {
                    toast.info("No invitation found.")
                    return;
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => {
                toast.error(error);
            })
    }



    const handleAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const groupId = button.getAttribute("data-group-id");
        const invitationId = button.getAttribute("data-invitation-id");
        const btnName = button.getAttribute("data-btn-name");
        fetch(`api/updateInvitation?groupId=${encodeURIComponent(groupId!)}&invitationId=${encodeURIComponent(invitationId!)}`, {
            method: btnName === "accept" ? "PUT" : "DELETE"
        })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                btnName === "accept" ? toast.success("Invitation accepted") : toast.success("Invitation deleted.")
            })
            .catch(error => {
                console.log(error);
                toast.error("Internal server error");
            })
            .finally(() => {
                setIsClicked(false);
            })
    }

    return (
        <div className="">
            <div>
                <button
                    onClick={() => {
                        fetchInvitation();
                        setIsClicked(prevState => !prevState);
                    }}
                    className="px-4 py-2 bg-gray-950 text-white rounded-md border-none hover:bg-gray-600">
                    Invitations
                </button>
            </div>
            {isClicked &&
                <div className="absolute h-auto w-auto bg-slate-800 mt-5 rounded-md px-4 py-2">
                    {
                        users ? (
                            <div className="">
                                <div className="bg-gray-700 p-2 rounded-md">
                                    <div>{users.fullName}</div>
                                    <div>{users.email}</div>
                                    <div className="flex gap-3 mt-2">
                                        <button
                                            onClick={(event) => {
                                                handleAccept(event);
                                            }}
                                            className="px-3 py-1 bg-green-600 rounded-md hover:bg-green-800"
                                            data-group-id={users.groupId}
                                            data-invitation-id={users.id}
                                            data-btn-name="accept"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={handleAccept}
                                            className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-800"
                                            data-group-id={users.groupId}
                                            data-invitation-id={users.id}
                                            data-btn-name="reject"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )
                    }

                </div>}
        </div>
    )
}