-- CreateEnum
CREATE TYPE "AcademicSessionStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "academicSessions" ADD COLUMN     "status" "AcademicSessionStatus" NOT NULL DEFAULT 'active';
