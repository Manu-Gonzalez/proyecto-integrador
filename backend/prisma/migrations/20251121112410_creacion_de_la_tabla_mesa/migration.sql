-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `mesaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `producto` ADD COLUMN `tipo` VARCHAR(191) NOT NULL DEFAULT 'producto';

-- CreateTable
CREATE TABLE `Mesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NOT NULL,
    `capacidad` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'disponible',

    UNIQUE INDEX `Mesa_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `Mesa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
