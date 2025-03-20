/*
  Warnings:

  - You are about to drop the column `ciudad` on the `Alojamiento` table. All the data in the column will be lost.
  - You are about to drop the column `codigo_postal` on the `Alojamiento` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `Alojamiento` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Alojamiento` table. All the data in the column will be lost.
  - You are about to drop the column `pais` on the `Alojamiento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Alojamiento` DROP COLUMN `ciudad`,
    DROP COLUMN `codigo_postal`,
    DROP COLUMN `direccion`,
    DROP COLUMN `estado`,
    DROP COLUMN `pais`;
