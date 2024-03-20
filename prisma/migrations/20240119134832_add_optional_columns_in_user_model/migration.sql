-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "firebird_path" TEXT NOT NULL,
    "expire_date_token" DATETIME,
    "recover_password_token" TEXT
);
INSERT INTO "new_User" ("email", "encrypted_password", "expire_date_token", "firebird_path", "id", "recover_password_token") SELECT "email", "encrypted_password", "expire_date_token", "firebird_path", "id", "recover_password_token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_recover_password_token_key" ON "User"("recover_password_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
