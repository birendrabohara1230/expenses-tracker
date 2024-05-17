-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
