-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL,
    "firebird_path" TEXT NOT NULL,
    "expire_date_token" DATETIME NOT NULL,
    "recover_password_token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_recover_password_token_key" ON "User"("recover_password_token");
