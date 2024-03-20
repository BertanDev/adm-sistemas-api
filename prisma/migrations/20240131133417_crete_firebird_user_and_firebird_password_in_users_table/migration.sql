-- AlterTable
ALTER TABLE "User" ADD COLUMN "firebird_password" TEXT DEFAULT 'masterkey';
ALTER TABLE "User" ADD COLUMN "firebird_user" TEXT DEFAULT 'SYSDBA';
