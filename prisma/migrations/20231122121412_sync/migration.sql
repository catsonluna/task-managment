/*
  Warnings:

  - A unique constraint covering the columns `[session_hash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dueTill` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `dueTill` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Session_session_hash_key` ON `Session`(`session_hash`);
