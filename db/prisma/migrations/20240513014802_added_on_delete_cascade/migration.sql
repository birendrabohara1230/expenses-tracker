-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_catId_fkey";

-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_userId_fkey";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
