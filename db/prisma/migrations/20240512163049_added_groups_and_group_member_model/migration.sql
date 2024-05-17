-- CreateTable
CREATE TABLE "Groups" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Groups_groupName_key" ON "Groups"("groupName");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
