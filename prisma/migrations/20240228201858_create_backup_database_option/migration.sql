-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "firebird_path_database" TEXT NOT NULL,
    "database_ip" TEXT NOT NULL,
    "firebird_password" TEXT DEFAULT 'masterkey',
    "firebird_user" TEXT DEFAULT 'SYSDBA',
    "expire_date_token" DATETIME,
    "recover_password_token" TEXT,
    "recovered_password" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    "cnpj" TEXT NOT NULL DEFAULT '',
    "use_backup" BOOLEAN NOT NULL DEFAULT false,
    "aws_folder" TEXT
);
INSERT INTO "new_User" ("cnpj", "database_ip", "email", "encrypted_password", "expire_date_token", "firebird_password", "firebird_path_database", "firebird_user", "id", "name", "recover_password_token", "recovered_password") SELECT "cnpj", "database_ip", "email", "encrypted_password", "expire_date_token", "firebird_password", "firebird_path_database", "firebird_user", "id", "name", "recover_password_token", "recovered_password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_database_ip_key" ON "User"("database_ip");
CREATE UNIQUE INDEX "User_recover_password_token_key" ON "User"("recover_password_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
