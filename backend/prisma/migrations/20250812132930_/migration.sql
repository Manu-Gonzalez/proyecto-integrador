/*
  Warnings:

  - The primary key for the `categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `city` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `client` DROP FOREIGN KEY `Client_cityId_fkey`;

-- DropForeignKey
ALTER TABLE `producto` DROP FOREIGN KEY `Producto_id_categoria_fkey`;

-- DropIndex
DROP INDEX `Client_cityId_fkey` ON `client`;

-- DropIndex
DROP INDEX `Producto_id_categoria_fkey` ON `producto`;

-- AlterTable
ALTER TABLE `categoria` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `city` DROP PRIMARY KEY,
    MODIFY `city_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`city_id`);

-- AlterTable
ALTER TABLE `client` MODIFY `cityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `producto` MODIFY `id_categoria` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
