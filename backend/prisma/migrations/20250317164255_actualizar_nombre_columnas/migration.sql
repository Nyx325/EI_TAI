/*
  Warnings:

  - You are about to drop the column `fechaCreacion` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `fechaNacimiento` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `fecha_nacimiento` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cliente` DROP COLUMN `fechaCreacion`,
    DROP COLUMN `fechaNacimiento`,
    ADD COLUMN `fecha_creacion` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fecha_nacimiento` DATE NOT NULL;
