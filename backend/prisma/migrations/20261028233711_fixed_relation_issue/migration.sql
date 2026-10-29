-- DropForeignKey
ALTER TABLE "guardians" DROP CONSTRAINT "guardians_userId_fkey";

-- AddForeignKey
ALTER TABLE "guardians" ADD CONSTRAINT "guardians_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
