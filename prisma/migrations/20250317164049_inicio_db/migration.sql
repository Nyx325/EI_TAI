-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(40) NOT NULL,
    `apellido_p` VARCHAR(20) NOT NULL,
    `apellido_m` VARCHAR(20) NULL,
    `fechaNacimiento` DATE NOT NULL,
    `fechaCreacion` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tarjeta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_tarjeta` VARCHAR(50) NOT NULL,
    `cliente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alojamiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `banios` INTEGER NOT NULL DEFAULT 0,
    `alberca` BOOLEAN NOT NULL DEFAULT false,
    `cocina` BOOLEAN NOT NULL DEFAULT false,
    `wifi` BOOLEAN NOT NULL DEFAULT false,
    `television` BOOLEAN NOT NULL DEFAULT false,
    `aire_acondicionado` BOOLEAN NOT NULL DEFAULT false,
    `precio_por_noche` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alojamiento_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inicio` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fin` DATE NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `cliente_id` INTEGER NULL,
    `alojamiento_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tarjeta` ADD CONSTRAINT `Tarjeta_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imagen` ADD CONSTRAINT `Imagen_alojamiento_id_fkey` FOREIGN KEY (`alojamiento_id`) REFERENCES `Alojamiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_alojamiento_id_fkey` FOREIGN KEY (`alojamiento_id`) REFERENCES `Alojamiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
