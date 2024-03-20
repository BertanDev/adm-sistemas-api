/*
  Warnings:

  - You are about to drop the column `firebird_path` on the `User` table. All the data in the column will be lost.
  - Added the required column `database_ip` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebird_path_database` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "firebird_path_database" TEXT NOT NULL,
    "database_ip" TEXT NOT NULL,
    "expire_date_token" DATETIME,
    "recover_password_token" TEXT
);
INSERT INTO "new_User" ("email", "encrypted_password", "expire_date_token", "id", "recover_password_token") SELECT "email", "encrypted_password", "expire_date_token", "id", "recover_password_token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_database_ip_key" ON "User"("database_ip");
CREATE UNIQUE INDEX "User_recover_password_token_key" ON "User"("recover_password_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
