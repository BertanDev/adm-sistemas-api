-- CreateTable
CREATE TABLE "InternalUsers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "encrypted_password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InternalUsers_email_key" ON "InternalUsers"("email");
