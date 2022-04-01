-- --------------------------------------------------------
-- Servidor:                     mysql-ag-br1-11.conteige.cloud
-- Versão do servidor:           5.7.37-0ubuntu0.18.04.1-log - (Ubuntu)
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para yxyeuv_anyloja
CREATE DATABASE IF NOT EXISTS `yxyeuv_anyloja` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `yxyeuv_anyloja`;

-- Copiando estrutura para tabela yxyeuv_anyloja.banners
CREATE TABLE IF NOT EXISTS `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) DEFAULT NULL,
  `order` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `redirect` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela yxyeuv_anyloja.banners: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` (`id`, `store_id`, `order`, `name`, `redirect`) VALUES
	(1, '3', '0', '1647182959018.webp', NULL),
	(2, '4', '0', '1647191200191.webp', 'https://yxyeuv.conteige.cloud/maxima/product/Npg74rouZtC16FS'),
	(3, '4', '1', '1647191200647.webp', 'https://yxyeuv.conteige.cloud/maxima/product/Npg74rouZtC16FS'),
	(4, '4', '2', '1647218259794.webp', 'https://yxyeuv.conteige.cloud/maxima/product/2OJmr5pvLAlR3BN');
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) NOT NULL DEFAULT '',
  `category_id` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(50) NOT NULL DEFAULT '',
  `icon` varchar(50) NOT NULL DEFAULT '',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` varchar(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela yxyeuv_anyloja.categories: ~11 rows (aproximadamente)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `store_id`, `category_id`, `name`, `icon`, `created`, `update`, `active`) VALUES
	(23, '1', 'VmoOJL66XQ', 'Camisetas', 'tshirt', '2020-08-19 16:33:13', '2020-08-19 16:33:13', '1'),
	(24, '1', 'KebUGBL3tB', 'Iphones', 'package', '2020-08-19 16:33:27', '2021-01-16 15:51:24', '1'),
	(25, '1', 'n2fzKjxM1A', 'Relogios', 'timer', '2020-08-21 17:53:37', '2020-09-05 20:52:32', '1'),
	(26, '1', 'Z8ZVktFacB', 'Teste', 'pyramids', '2020-09-06 07:16:07', '2020-09-06 07:16:07', '1'),
	(27, '2', 'evcxIRhtG7', 'Canetas', 'pointer-down', '2021-01-16 11:03:23', '2021-01-16 11:03:28', '0'),
	(28, '3', 'dREbxafgUf', 'Geral', 'help', '2022-03-13 11:49:41', '2022-03-13 11:49:41', '1'),
	(29, '4', 'XE77sObT8I', 'Eletronicos', 'help', '2022-03-13 14:11:33', '2022-03-13 14:11:33', '1'),
	(30, '4', '71IS2MeJpJ', 'Utilidades', 'help', '2022-03-13 15:22:59', '2022-03-13 15:22:59', '1'),
	(31, '4', '8mEIZTiFKu', 'Vestuario Infantil', 'help', '2022-03-13 15:23:09', '2022-03-13 15:23:09', '1'),
	(32, '4', '68MIxX9fjx', 'Produtos de Beleza', 'help', '2022-03-13 21:27:01', '2022-03-13 21:27:01', '1'),
	(33, '4', 'jbTpzPDoHe', 'Emagrecimento', 'help', '2022-03-13 21:32:30', '2022-03-13 21:32:30', '1');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.media
CREATE TABLE IF NOT EXISTS `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) NOT NULL DEFAULT '',
  `order` varchar(50) NOT NULL DEFAULT '',
  `product_id` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela yxyeuv_anyloja.media: ~50 rows (aproximadamente)
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` (`id`, `store_id`, `order`, `product_id`, `name`, `created`, `update`) VALUES
	(196, '3', '1', 't7IaZKLQTHCLBjO', '1647184447487.webp', '2022-03-13 12:14:07', '2022-03-13 12:14:07'),
	(197, '3', '2', 't7IaZKLQTHCLBjO', '1647186083870.webp', '2022-03-13 12:41:24', '2022-03-13 12:41:24'),
	(198, '3', '3', 't7IaZKLQTHCLBjO', '1647186131294.webp', '2022-03-13 12:42:11', '2022-03-13 12:42:11'),
	(212, '4', '3', 'qPkmr8MzXuC6m9R', '1647196923900.webp', '2022-03-13 15:42:04', '2022-03-13 15:42:04'),
	(213, '4', '3', 'qPkmr8MzXuC6m9R', '1647196924264.webp', '2022-03-13 15:42:04', '2022-03-13 15:42:04'),
	(214, '4', '3', 'qPkmr8MzXuC6m9R', '1647196924619.webp', '2022-03-13 15:42:04', '2022-03-13 15:42:04'),
	(220, '4', '1', 'PgQm8xzF5lerZeC', '1647217814942.webp', '2022-03-13 21:30:14', '2022-03-13 21:30:14'),
	(221, '4', '1', 'Npg74rouZtC16FS', '1647218013307.webp', '2022-03-13 21:33:32', '2022-03-13 21:33:38'),
	(222, '4', '0', 'Npg74rouZtC16FS', '1647218013882.webp', '2022-03-13 21:33:33', '2022-03-13 21:33:38'),
	(226, '4', '1', 'tAhLfOeLIP5FX3M', '1647219407248.webp', '2022-03-13 21:56:46', '2022-03-13 21:56:46'),
	(227, '4', '1', '61k7EzcNU6zA9qb', '1647351032321.webp', '2022-03-15 10:30:32', '2022-03-15 10:30:32'),
	(228, '4', '4', 'kB1l4ArcnNZCESL', '1647972969849.webp', '2022-03-22 15:16:10', '2022-03-22 15:16:10'),
	(229, '4', '4', 'kB1l4ArcnNZCESL', '1647972971523.webp', '2022-03-22 15:16:12', '2022-03-22 15:16:12'),
	(230, '4', '4', 'kB1l4ArcnNZCESL', '1647972973522.webp', '2022-03-22 15:16:14', '2022-03-22 15:16:14'),
	(231, '4', '4', 'kB1l4ArcnNZCESL', '1647972975931.webp', '2022-03-22 15:16:16', '2022-03-22 15:16:16'),
	(232, '4', '4', '7zJ4RI72a58RE0G', '1647973335746.webp', '2022-03-22 15:22:16', '2022-03-22 15:22:16'),
	(233, '4', '4', '7zJ4RI72a58RE0G', '1647973338201.webp', '2022-03-22 15:22:19', '2022-03-22 15:22:19'),
	(234, '4', '4', '7zJ4RI72a58RE0G', '1647973340108.webp', '2022-03-22 15:22:20', '2022-03-22 15:22:20'),
	(235, '4', '4', '7zJ4RI72a58RE0G', '1647973341833.webp', '2022-03-22 15:22:22', '2022-03-22 15:22:22'),
	(237, '4', '3', '3t7SsAnvPpmdxBP', '1647973632697.webp', '2022-03-22 15:27:13', '2022-03-22 15:27:13'),
	(238, '4', '2', '3t7SsAnvPpmdxBP', '1647973635769.webp', '2022-03-22 15:27:16', '2022-03-22 15:27:16'),
	(239, '4', '3', 'iX5NFHuv83GHv4h', '1647977826165.webp', '2022-03-22 16:37:07', '2022-03-22 16:37:07'),
	(240, '4', '3', 'iX5NFHuv83GHv4h', '1647977828268.webp', '2022-03-22 16:37:09', '2022-03-22 16:37:09'),
	(241, '4', '3', 'iX5NFHuv83GHv4h', '1647977830524.webp', '2022-03-22 16:37:11', '2022-03-22 16:37:11'),
	(242, '4', '4', 'kEHPZp4Td4smUMQ', '1647978064225.webp', '2022-03-22 16:41:04', '2022-03-22 16:41:04'),
	(243, '4', '4', 'kEHPZp4Td4smUMQ', '1647978065395.webp', '2022-03-22 16:41:06', '2022-03-22 16:41:06'),
	(244, '4', '4', 'kEHPZp4Td4smUMQ', '1647978067583.webp', '2022-03-22 16:41:08', '2022-03-22 16:41:08'),
	(245, '4', '4', 'kEHPZp4Td4smUMQ', '1647978069983.webp', '2022-03-22 16:41:10', '2022-03-22 16:41:10'),
	(246, '4', '5', '76O1BHz0EvcnduV', '1647979531917.webp', '2022-03-22 17:05:32', '2022-03-22 17:05:32'),
	(247, '4', '5', '76O1BHz0EvcnduV', '1647979532980.webp', '2022-03-22 17:05:33', '2022-03-22 17:05:33'),
	(248, '4', '5', '76O1BHz0EvcnduV', '1647979534712.webp', '2022-03-22 17:05:35', '2022-03-22 17:05:35'),
	(249, '4', '5', '76O1BHz0EvcnduV', '1647979536388.webp', '2022-03-22 17:05:37', '2022-03-22 17:05:37'),
	(250, '4', '5', '76O1BHz0EvcnduV', '1647979538431.webp', '2022-03-22 17:05:39', '2022-03-22 17:05:39'),
	(251, '4', '4', 'mmVfxNck6bqVCtF', '1647979786606.webp', '2022-03-22 17:09:47', '2022-03-22 17:09:47'),
	(252, '4', '4', 'mmVfxNck6bqVCtF', '1647979789170.webp', '2022-03-22 17:09:50', '2022-03-22 17:09:50'),
	(253, '4', '4', 'mmVfxNck6bqVCtF', '1647979791294.webp', '2022-03-22 17:09:52', '2022-03-22 17:09:52'),
	(254, '4', '4', 'mmVfxNck6bqVCtF', '1647979793515.webp', '2022-03-22 17:09:54', '2022-03-22 17:09:54'),
	(255, '4', '2', '9PNQCCupTf06PSm', '1647979967857.webp', '2022-03-22 17:12:48', '2022-03-22 17:12:48'),
	(256, '4', '2', '9PNQCCupTf06PSm', '1647979970144.webp', '2022-03-22 17:12:51', '2022-03-22 17:12:51'),
	(257, '4', '3', '9PNQCCupTf06PSm', '1647980030644.webp', '2022-03-22 17:13:50', '2022-03-22 17:13:50'),
	(258, '4', '3', 'ddP76R20I8psUm5', '1647980326201.webp', '2022-03-22 17:18:46', '2022-03-22 17:18:46'),
	(259, '4', '3', 'ddP76R20I8psUm5', '1647980326505.webp', '2022-03-22 17:18:46', '2022-03-22 17:18:46'),
	(260, '4', '3', 'ddP76R20I8psUm5', '1647980326780.webp', '2022-03-22 17:18:47', '2022-03-22 17:18:47'),
	(261, '4', '3', 'vK46IA6jjxSHESn', '1647980661426.webp', '2022-03-22 17:24:21', '2022-03-22 17:24:21'),
	(262, '4', '3', 'vK46IA6jjxSHESn', '1647980663920.webp', '2022-03-22 17:24:24', '2022-03-22 17:24:24'),
	(263, '4', '3', 'vK46IA6jjxSHESn', '1647980667019.webp', '2022-03-22 17:24:28', '2022-03-22 17:24:28'),
	(264, '4', '4', '37ApUxuG1Vuqu2X', '1647980857529.webp', '2022-03-22 17:27:37', '2022-03-22 17:27:37'),
	(265, '4', '4', '37ApUxuG1Vuqu2X', '1647980857996.webp', '2022-03-22 17:27:38', '2022-03-22 17:27:38'),
	(266, '4', '4', '37ApUxuG1Vuqu2X', '1647980858361.webp', '2022-03-22 17:27:38', '2022-03-22 17:27:38'),
	(267, '4', '4', '37ApUxuG1Vuqu2X', '1647980858711.webp', '2022-03-22 17:27:38', '2022-03-22 17:27:38');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `seller_id` varchar(50) NOT NULL,
  `total` decimal(10,2) DEFAULT '0.00',
  `order_cod` varchar(50) NOT NULL DEFAULT '',
  `status` varchar(100) NOT NULL DEFAULT '',
  `seller_name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela yxyeuv_anyloja.orders: ~18 rows (aproximadamente)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `store_id`, `created`, `name`, `phone`, `seller_id`, `total`, `order_cod`, `status`, `seller_name`) VALUES
	(178, '4', '2022-03-13 00:06:40', 'Thiago', '(37) 99194-6361', 'cptve', 149.00, 'Ae-JHb', 'Pedido Enviado com sucesso pelo cliente.', 'Aecio'),
	(179, '4', '2022-03-13 00:09:36', 'Thiago', '(37) 99194-6361', 'cptve', 4207.30, 'Ae-9Ve', 'Segundo o cliente houve halgum erro ao enviar o pedido.', 'Aecio'),
	(180, '4', '2022-03-13 09:44:18', 'Hilton', '(37) 99801-9655', 'cptve', 8413.30, 'Ae-Nif', 'Pedido Enviado com sucesso pelo cliente.', 'Aecio'),
	(181, '4', '2022-03-14 13:20:01', 'Hilton', '(37) 99801-9655', 'cptve', 8495.80, 'Ae-tui', 'Pedido Enviado com sucesso pelo cliente.', 'Aecio'),
	(182, '4', '2022-03-14 13:22:35', 'Aecii', '(37) 98855-5554', 'cptve', 1279.20, 'Hi-kEG', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(183, '4', '2022-03-14 13:31:44', 'Aecii', '(37) 98855-5554', 'bi1Ng', 278.00, 'Hi-toT', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(184, '4', '2022-03-14 13:33:57', 'Thiago', '(37) 99194-6361', 'bi1Ng', 149.00, 'Hi-442', 'Segundo o cliente houve halgum erro ao enviar o pedido.', 'Hilton'),
	(185, '4', '2022-03-14 14:49:45', 'Hilton', '(37) 99801-9655', 'bi1Ng', 11538.70, 'Hi-g1p', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(186, '4', '2022-03-14 15:06:35', 'Hilton', '(37) 99801-9655', 'bi1Ng', 2122.50, 'Hi-PIs', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(187, '4', '2022-03-14 15:34:11', 'Hilton', '(37) 99801-9655', 'bi1Ng', 5414.50, 'Hi-qG0', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(188, '4', '2022-03-14 17:48:12', 'Hilton', '(37) 99801-9655', 'bi1Ng', 1583.60, 'Hi-9BS', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(189, '4', '2022-03-15 13:17:24', 'Hilton', '(37) 99801-9655', 'bi1Ng', 1259.50, 'Hi-R84', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(190, '4', '2022-03-15 13:54:46', 'Hilton', '(37) 99801-9655', 'bi1Ng', 7476.30, 'Hi-LNU', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(191, '4', '2022-03-21 08:39:30', 'Hilton', '(37) 99801-9655', 'bi1Ng', 1437.60, 'Hi-9OM', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(192, '4', '2022-03-21 14:34:10', 'Hilton', '(37) 99801-9655', 'bi1Ng', 4587.30, 'Hi-kAp', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(193, '4', '2022-03-22 11:00:30', 'Hilton', '(37) 99801-9655', 'bi1Ng', 6152.00, 'Hi-Joa', 'Pedido Enviado com sucesso pelo cliente.', 'Hilton'),
	(194, '4', '2022-03-22 12:07:38', 'Mohamed Sultan', '(11) 98143-5416', 'bi1Ng', 17.90, 'Hi-oxg', 'Segundo o cliente houve halgum erro ao enviar o pedido.', 'Hilton'),
	(195, '4', '2022-03-22 14:18:34', 'Mohamed Sultan', '(11) 98143-5416', 'bi1Ng', 130.10, 'Hi-2eK', '', 'Hilton');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.orders_products
CREATE TABLE IF NOT EXISTS `orders_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) NOT NULL DEFAULT '',
  `categorie_id` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `price` decimal(10,2) DEFAULT '0.00',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `variations` text,
  `order_id` varchar(50) NOT NULL DEFAULT '',
  `qnt` varchar(7) DEFAULT NULL,
  `product_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela yxyeuv_anyloja.orders_products: ~91 rows (aproximadamente)
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` (`id`, `store_id`, `categorie_id`, `name`, `price`, `created`, `description`, `variations`, `order_id`, `qnt`, `product_id`) VALUES
	(200, '1', 'VmoOJL66XQ', 'Camisa Americana Caveira', 25.10, '2020-09-08 12:07:06', '', '', '148', '2', '38'),
	(201, '1', 'VmoOJL66XQ', 'Camisa Basica', 49.90, '2020-09-08 12:07:06', 'Camisa Basica Descricao', ' Tamanho: G', '148', '3', '35'),
	(202, '1', 'VmoOJL66XQ', 'Camisa Basica', 49.90, '2020-09-08 12:08:25', 'Camisa Basica Descricao', ' Tamanho: G', '149', '3', 'tetQDhSFfJasVsf'),
	(203, '1', 'VmoOJL66XQ', 'Camisa Basica', 49.90, '2020-09-08 12:08:25', 'Camisa Basica Descricao', ' Tamanho: G', '149', '3', 'tetQDhSFfJasVsf'),
	(204, '1', 'VmoOJL66XQ', 'Camisa Americana Caveira', 25.10, '2020-09-08 12:08:25', '', '', '149', '1', 'dgvdLOxls8vskdT'),
	(205, '1', 'VmoOJL66XQ', 'Camisa Basica', 49.90, '2020-09-08 12:12:03', 'Camisa Basica Descricao', ' Tamanho: G', '150', '3', 'tetQDhSFfJasVsf'),
	(206, '1', 'VmoOJL66XQ', 'Camisa Basica', 49.90, '2020-09-08 12:12:03', 'Camisa Basica Descricao', ' Tamanho: G', '150', '3', 'tetQDhSFfJasVsf'),
	(207, '1', 'VmoOJL66XQ', 'Camisa Americana Caveira', 25.10, '2020-09-08 12:12:03', '', '', '150', '1', 'dgvdLOxls8vskdT'),
	(208, '1', 'VmoOJL66XQ', 'Camisa Estampada', 99.00, '2020-09-08 12:12:03', 'Descricao do produto muito Bem formulada', ' Cor:  amarelo, Tamanho: G, Condição: Nova', '150', '1', '0lqbxjqHMGLglQc'),
	(209, '1', 'VmoOJL66XQ', 'Camisa Estampada', 99.00, '2020-09-08 12:12:03', 'Descricao do produto muito Bem formulada', ' Cor:  vermelho, Tamanho: P, Condição: Nova', '150', '1', '0lqbxjqHMGLglQc'),
	(210, '1', 'VmoOJL66XQ', 'Camisa Basica', 49.90, '2020-09-08 12:21:20', 'Camisa Basica Descricao', ' Tamanho: G', '151', '3', 'tetQDhSFfJasVsf'),
	(211, '1', 'VmoOJL66XQ', 'Camisa Basica', 49.90, '2020-09-08 12:21:20', 'Camisa Basica Descricao', ' Tamanho: G', '151', '3', 'tetQDhSFfJasVsf'),
	(212, '1', 'VmoOJL66XQ', 'Camisa Americana Caveira', 25.10, '2020-09-08 12:21:20', '', '', '151', '1', 'dgvdLOxls8vskdT'),
	(213, '1', 'VmoOJL66XQ', 'Camisa Estampada', 99.00, '2020-09-08 12:21:20', 'Descricao do produto muito Bem formulada', ' Cor:  amarelo, Tamanho: G, Condição: Nova', '151', '1', '0lqbxjqHMGLglQc'),
	(214, '1', 'VmoOJL66XQ', 'Camisa Estampada', 99.00, '2020-09-08 12:21:20', 'Descricao do produto muito Bem formulada', ' Cor:  vermelho, Tamanho: P, Condição: Nova', '151', '1', '0lqbxjqHMGLglQc'),
	(215, '2', 'evcxIRhtG7', 'Ceneta Bic', 10.00, '2021-01-16 11:15:50', 'Caneta bic', ' Tamanho: 1 und', '152', '1', 'ezS74X7OCt4ZAQ8'),
	(216, '2', 'evcxIRhtG7', 'Ceneta Esferiografica Bic', 10.00, '2021-01-16 11:38:15', 'Caneta bic', ' Tamanho:  1 caixa', '153', '1', 'ezS74X7OCt4ZAQ8'),
	(217, '2', 'evcxIRhtG7', 'Ceneta Esferiografica Bic', 10.00, '2021-01-16 11:38:15', 'Caneta bic', ' Tamanho: 1 und', '153', '1', 'ezS74X7OCt4ZAQ8'),
	(218, '1', 'VmoOJL66XQ', 'Camisa Americana Caveira', 25.10, '2021-01-16 17:41:33', '', '', '154', '1', 'dgvdLOxls8vskdT'),
	(219, '1', 'VmoOJL66XQ', 'Camisas Premium', 55.00, '2021-01-16 17:41:33', 'So marcas top', '', '154', '3', 'F1mEd0ncMuXDcP1'),
	(220, '1', 'VmoOJL66XQ', 'Camisa Americana Caveira', 25.10, '2021-01-16 17:41:33', '', '', '154', '1', 'dgvdLOxls8vskdT'),
	(221, '1', 'VmoOJL66XQ', 'Camisa Americana Caveira', 25.10, '2021-01-16 17:41:33', '', '', '154', '1', 'dgvdLOxls8vskdT'),
	(222, '1', 'n2fzKjxM1A', 'Relógio Invicta 0072 Pro Diver 48mm Banhado a Ouro 18k', 539.00, '2021-01-16 17:41:33', 'Para quem é um colecionador Invicta \r\nou para quem vai comprar seu primeiro relógio, esse modelo não pode faltar na sua coleção. \r\n\r\n\r\nPrincipalmente se você é daqueles que gostam de relógios dourados.\r\n\r\n Um relógio que cabe em qualquer ocasião, festas, trabalho e mesmo com roupas mais esporte.\r\n Um campeão de vendas da Invicta. A escolha é certa e sem medo de errar.\r\n\r\nCaracterísticas\r\nCaracterísticas Gerais\r\nModelo=72\r\nEspessura da Caixa=17mm\r\nCor Interna da Caixa=Petro\r\nResistência a Água=100 metros\r\nLargura da Pulseira=26mm\r\nMovimento=Swiss Quartz\r\nCaracteristicas Especiais=Coroa de Rosca, Cronografo e Luminoso\r\nVidro: Cristal Fusion Chama\r\nResistência a Água: 100 metros\r\nPulseira: Aço Inoxidável Banhado a ouro 18k\r\nEspecificações Técnicas\r\nFechoTrava de segurança\r\nTamanho da caixa48mm\r\nVisor do RelógioMineral\r\nConteúdo da embalagem\r\nManual , Estojo Original , Certificado de Garantia\r\nGarantia12 meses', '', '154', '1', 'nJ8JxmtilBlZtlh'),
	(223, '1', 'KebUGBL3tB', 'Iphone', 2900.00, '2021-01-16 17:42:24', '', '', '155', '1', '24XIL2ifn1vcjQA'),
	(224, '4', 'XE77sObT8I', 'JBL Boombox 2', 1279.20, '2022-03-13 15:19:21', 'Comande a festa. De churrascos no quintal até viagens de fim de semana, o JBL Boombox 2 vem com graves monstruosos, design arrojado e incrível tempo de reprodução de 24 horas.', '', '156', '1', 'np7DnqD7946AQnE'),
	(225, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 22:22:58', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '157', '1', '2OJmr5pvLAlR3BN'),
	(226, '4', 'XE77sObT8I', 'Caixa de som bluetooth KTS', 139.00, '2022-03-13 22:30:01', 'Caixa de som bluetooth kts 1236 super potente Linda e muito potente!! Essa caixinha é perfeita!!Possuí suporte para celular onde poderá assistir seus vídeos.Possuí 10w de potência o que a torna com um som incrível!!Possuí luzes led que alternam de cor e fazem um efeito incrível ao tocar as músicas!!É o presente ideal !! Adultos, jovens e crianças irão amar!!!Especificações:• Alcance sem fio: até 10 metros• Tamanho da unidade do alto-falante: 3 polegadas• Potência de saída: 10w• Resposta de frequência: 100 Hz - 20 kHz -• Taxa de ruído do sinal:> = 85 db• Varredura de FM: 87,5-108,0 MHz -• Carregamento USB: DC5V• Capacidade da bateria: 1500mah• Capacidade de armazenamento SD: Pode suportar cartão SD de até 32 Gb• Tempo de carregamento: 3 - 4 horasItens Inclusos:- 01 Caixa de Som Portátil KTS-1236- 01 Cabo de carregamento USB', '', '158', '1', 'RxAFg4xszXD6iL2'),
	(227, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-13 22:56:45', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '159', '1', 'PgQm8xzF5lerZeC'),
	(228, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-13 23:13:53', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '160', '1', 'PgQm8xzF5lerZeC'),
	(229, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 23:13:53', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '160', '1', '2OJmr5pvLAlR3BN'),
	(230, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-13 23:24:11', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '161', '1', 'Npg74rouZtC16FS'),
	(231, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 23:26:20', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '162', '1', '2OJmr5pvLAlR3BN'),
	(232, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-13 23:26:42', 'SH375 + COND 170ML elseve longo dos sonhos', '', '163', '1', 'tAhLfOeLIP5FX3M'),
	(233, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-13 23:30:27', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '164', '1', 'Npg74rouZtC16FS'),
	(234, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-13 23:31:10', 'SH375 + COND 170ML elseve longo dos sonhos', '', '165', '1', 'tAhLfOeLIP5FX3M'),
	(235, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-13 23:31:22', 'SH375 + COND 170ML elseve longo dos sonhos', '', '166', '1', 'tAhLfOeLIP5FX3M'),
	(236, '4', 'XE77sObT8I', 'Caixa de som bluetooth KTS', 139.00, '2022-03-13 23:31:53', 'Caixa de som bluetooth kts 1236 super potente Linda e muito potente!! Essa caixinha é perfeita!!Possuí suporte para celular onde poderá assistir seus vídeos.Possuí 10w de potência o que a torna com um som incrível!!Possuí luzes led que alternam de cor e fazem um efeito incrível ao tocar as músicas!!É o presente ideal !! Adultos, jovens e crianças irão amar!!!Especificações:• Alcance sem fio: até 10 metros• Tamanho da unidade do alto-falante: 3 polegadas• Potência de saída: 10w• Resposta de frequência: 100 Hz - 20 kHz -• Taxa de ruído do sinal:> = 85 db• Varredura de FM: 87,5-108,0 MHz -• Carregamento USB: DC5V• Capacidade da bateria: 1500mah• Capacidade de armazenamento SD: Pode suportar cartão SD de até 32 Gb• Tempo de carregamento: 3 - 4 horasItens Inclusos:- 01 Caixa de Som Portátil KTS-1236- 01 Cabo de carregamento USB', '', '167', '1', 'RxAFg4xszXD6iL2'),
	(237, '4', '71IS2MeJpJ', 'Copo térmico sem tampa Stanley, 473 ml', 189.00, '2022-03-13 23:33:22', '', '', '168', '1', 'qPkmr8MzXuC6m9R'),
	(238, '4', 'XE77sObT8I', 'JBL Boombox 2', 1279.20, '2022-03-13 23:42:28', 'Comande a festa. De churrascos no quintal até viagens de fim de semana, o JBL Boombox 2 vem com graves monstruosos, design arrojado e incrível tempo de reprodução de 24 horas.', ' Cor: Preto', '169', '1', 'np7DnqD7946AQnE'),
	(239, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 23:43:08', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '170', '1', '2OJmr5pvLAlR3BN'),
	(240, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-13 23:44:16', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '171', '1', 'PgQm8xzF5lerZeC'),
	(241, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-13 23:45:15', 'SH375 + COND 170ML elseve longo dos sonhos', '', '172', '1', 'tAhLfOeLIP5FX3M'),
	(242, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 23:48:49', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '173', '1', '2OJmr5pvLAlR3BN'),
	(243, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 23:49:35', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '174', '1', '2OJmr5pvLAlR3BN'),
	(244, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 23:50:05', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '175', '1', '2OJmr5pvLAlR3BN'),
	(245, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-13 23:50:25', 'SH375 + COND 170ML elseve longo dos sonhos', '', '176', '1', 'tAhLfOeLIP5FX3M'),
	(246, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-13 23:52:34', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '177', '2', 'Npg74rouZtC16FS'),
	(247, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-13 23:52:34', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '177', '1', '2OJmr5pvLAlR3BN'),
	(248, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-14 00:06:40', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '178', '1', 'Npg74rouZtC16FS'),
	(249, '4', 'XE77sObT8I', 'JBL Boombox 2', 1279.20, '2022-03-14 00:09:36', 'Comande a festa. De churrascos no quintal até viagens de fim de semana, o JBL Boombox 2 vem com graves monstruosos, design arrojado e incrível tempo de reprodução de 24 horas.', ' Cor: Camuflado', '179', '1', 'np7DnqD7946AQnE'),
	(250, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-14 00:09:36', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '179', '1', 'PgQm8xzF5lerZeC'),
	(251, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-14 00:09:36', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '179', '2', '2OJmr5pvLAlR3BN'),
	(252, '4', 'XE77sObT8I', 'Caixa De Som Mondial Mco-11 Amplificada', 219.00, '2022-03-14 09:44:18', 'A caixa de som mondial mco-11 bivolt amplificada é considerada uma das melhores caixas de som deste porte, destacando-se pelo seu design diferenciado, durabilidade do produto e confiabilidade da marca mondial em oferecer um produto de qualidade! ', '', '180', '8', 'RiI0jdTmPPpZXT6'),
	(253, '4', 'XE77sObT8I', 'JBL Boombox 2', 1279.20, '2022-03-14 09:44:18', 'Comande a festa. De churrascos no quintal até viagens de fim de semana, o JBL Boombox 2 vem com graves monstruosos, design arrojado e incrível tempo de reprodução de 24 horas.', ' Cor: Preto', '180', '4', 'np7DnqD7946AQnE'),
	(254, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-14 09:44:18', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '180', '6', 'Npg74rouZtC16FS'),
	(255, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-14 09:44:18', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '180', '5', 'PgQm8xzF5lerZeC'),
	(256, '4', 'XE77sObT8I', 'Caixa De Som Mondial Mco-11 Amplificada', 219.00, '2022-03-14 13:20:01', 'A caixa de som mondial mco-11 bivolt amplificada é considerada uma das melhores caixas de som deste porte, destacando-se pelo seu design diferenciado, durabilidade do produto e confiabilidade da marca mondial em oferecer um produto de qualidade! ', '', '181', '10', 'RiI0jdTmPPpZXT6'),
	(257, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-14 13:20:01', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '181', '5', 'Npg74rouZtC16FS'),
	(258, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-14 13:20:01', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '181', '3', 'PgQm8xzF5lerZeC'),
	(259, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-14 13:20:01', 'SH375 + COND 170ML elseve longo dos sonhos', '', '181', '3', 'tAhLfOeLIP5FX3M'),
	(260, '4', 'XE77sObT8I', 'JBL Boombox 2', 1279.20, '2022-03-14 13:20:01', 'Comande a festa. De churrascos no quintal até viagens de fim de semana, o JBL Boombox 2 vem com graves monstruosos, design arrojado e incrível tempo de reprodução de 24 horas.', ' Cor: Camuflado', '181', '4', 'np7DnqD7946AQnE'),
	(261, '4', 'XE77sObT8I', 'JBL Boombox 2', 1279.20, '2022-03-14 13:22:35', 'Comande a festa. De churrascos no quintal até viagens de fim de semana, o JBL Boombox 2 vem com graves monstruosos, design arrojado e incrível tempo de reprodução de 24 horas.', ' Cor: Camuflado', '182', '1', 'np7DnqD7946AQnE'),
	(262, '4', 'XE77sObT8I', 'Caixa de som bluetooth KTS', 139.00, '2022-03-14 13:31:44', 'Caixa de som bluetooth kts 1236 super potente Linda e muito potente!! Essa caixinha é perfeita!!Possuí suporte para celular onde poderá assistir seus vídeos.Possuí 10w de potência o que a torna com um som incrível!!Possuí luzes led que alternam de cor e fazem um efeito incrível ao tocar as músicas!!É o presente ideal !! Adultos, jovens e crianças irão amar!!!Especificações:• Alcance sem fio: até 10 metros• Tamanho da unidade do alto-falante: 3 polegadas• Potência de saída: 10w• Resposta de frequência: 100 Hz - 20 kHz -• Taxa de ruído do sinal:> = 85 db• Varredura de FM: 87,5-108,0 MHz -• Carregamento USB: DC5V• Capacidade da bateria: 1500mah• Capacidade de armazenamento SD: Pode suportar cartão SD de até 32 Gb• Tempo de carregamento: 3 - 4 horasItens Inclusos:- 01 Caixa de Som Portátil KTS-1236- 01 Cabo de carregamento USB', '', '183', '2', 'RxAFg4xszXD6iL2'),
	(263, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-14 13:33:57', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '184', '1', 'Npg74rouZtC16FS'),
	(264, '4', 'XE77sObT8I', 'JBL Boombox 2', 1279.20, '2022-03-14 14:49:45', 'Comande a festa. De churrascos no quintal até viagens de fim de semana, o JBL Boombox 2 vem com graves monstruosos, design arrojado e incrível tempo de reprodução de 24 horas.', ' Cor: Preto', '185', '6', 'np7DnqD7946AQnE'),
	(265, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-14 14:49:45', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '185', '5', 'PgQm8xzF5lerZeC'),
	(266, '4', '71IS2MeJpJ', 'Copo térmico sem tampa Stanley, 473 ml', 189.00, '2022-03-14 14:49:45', '', '', '185', '17', 'qPkmr8MzXuC6m9R'),
	(267, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-14 15:06:35', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '186', '5', 'PgQm8xzF5lerZeC'),
	(268, '4', 'XE77sObT8I', 'Caixa De Som Mondial Mco-11 Amplificada', 219.00, '2022-03-14 15:06:35', 'A caixa de som mondial mco-11 bivolt amplificada é considerada uma das melhores caixas de som deste porte, destacando-se pelo seu design diferenciado, durabilidade do produto e confiabilidade da marca mondial em oferecer um produto de qualidade! ', '', '186', '4', 'RiI0jdTmPPpZXT6'),
	(269, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-14 15:06:35', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '186', '4', 'Npg74rouZtC16FS'),
	(270, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-14 15:34:11', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '187', '5', 'PgQm8xzF5lerZeC'),
	(271, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-14 15:34:11', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '187', '3', '2OJmr5pvLAlR3BN'),
	(272, '4', '71IS2MeJpJ', 'Copo térmico sem tampa Stanley, 473 ml', 189.00, '2022-03-14 15:34:11', '', '', '187', '3', 'qPkmr8MzXuC6m9R'),
	(273, '4', 'XE77sObT8I', 'Caixa De Som Mondial Mco-11 Amplificada', 219.00, '2022-03-14 17:48:12', 'A caixa de som mondial mco-11 bivolt amplificada é considerada uma das melhores caixas de som deste porte, destacando-se pelo seu design diferenciado, durabilidade do produto e confiabilidade da marca mondial em oferecer um produto de qualidade! ', '', '188', '5', 'RiI0jdTmPPpZXT6'),
	(274, '4', 'XE77sObT8I', 'Caixa de som bluetooth KTS', 139.00, '2022-03-14 17:48:12', 'Caixa de som bluetooth kts 1236 super potente Linda e muito potente!! Essa caixinha é perfeita!!Possuí suporte para celular onde poderá assistir seus vídeos.Possuí 10w de potência o que a torna com um som incrível!!Possuí luzes led que alternam de cor e fazem um efeito incrível ao tocar as músicas!!É o presente ideal !! Adultos, jovens e crianças irão amar!!!Especificações:• Alcance sem fio: até 10 metros• Tamanho da unidade do alto-falante: 3 polegadas• Potência de saída: 10w• Resposta de frequência: 100 Hz - 20 kHz -• Taxa de ruído do sinal:> = 85 db• Varredura de FM: 87,5-108,0 MHz -• Carregamento USB: DC5V• Capacidade da bateria: 1500mah• Capacidade de armazenamento SD: Pode suportar cartão SD de até 32 Gb• Tempo de carregamento: 3 - 4 horasItens Inclusos:- 01 Caixa de Som Portátil KTS-1236- 01 Cabo de carregamento USB', '', '188', '3', 'RxAFg4xszXD6iL2'),
	(275, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-14 17:48:12', 'SH375 + COND 170ML elseve longo dos sonhos', '', '188', '4', 'tAhLfOeLIP5FX3M'),
	(276, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-15 13:17:24', 'SH375 + COND 170ML elseve longo dos sonhos', '', '189', '2', 'tAhLfOeLIP5FX3M'),
	(277, '4', 'jbTpzPDoHe', 'levimune caps', 39.90, '2022-03-15 13:17:24', 'encapsulado para emagrecimento', '', '189', '3', '61k7EzcNU6zA9qb'),
	(278, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-15 13:17:24', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '189', '3', 'Npg74rouZtC16FS'),
	(279, '4', 'XE77sObT8I', 'Caixa De Som Mondial Mco-11 Amplificada', 219.00, '2022-03-15 13:17:24', 'A caixa de som mondial mco-11 bivolt amplificada é considerada uma das melhores caixas de som deste porte, destacando-se pelo seu design diferenciado, durabilidade do produto e confiabilidade da marca mondial em oferecer um produto de qualidade! ', '', '189', '3', 'RiI0jdTmPPpZXT6'),
	(280, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-15 13:54:46', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '190', '4', '2OJmr5pvLAlR3BN'),
	(281, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-15 13:54:46', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '190', '3', 'PgQm8xzF5lerZeC'),
	(282, '4', 'jbTpzPDoHe', 'Levimune 60', 149.00, '2022-03-15 13:54:46', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', '', '190', '10', 'Npg74rouZtC16FS'),
	(283, '4', 'XE77sObT8I', 'Caixa De Som Mondial Mco-11 Amplificada', 219.00, '2022-03-21 08:39:30', 'A caixa de som mondial mco-11 bivolt amplificada é considerada uma das melhores caixas de som deste porte, destacando-se pelo seu design diferenciado, durabilidade do produto e confiabilidade da marca mondial em oferecer um produto de qualidade! ', '', '191', '3', 'RiI0jdTmPPpZXT6'),
	(284, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-21 08:39:30', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '191', '6', 'PgQm8xzF5lerZeC'),
	(285, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-21 14:34:10', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '192', '3', '2OJmr5pvLAlR3BN'),
	(286, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-21 14:34:10', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '192', '3', 'PgQm8xzF5lerZeC'),
	(287, '4', 'XE77sObT8I', 'JBL PartyBox On-The-Go', 1399.00, '2022-03-22 11:00:30', 'Som inconfundível da JBL\r\nEncontre seu ritmo com 100 W RMS de som poderoso e explosivo com a marca inconfundível da JBL. Em ambientes internos ou ao ar livre, o JBL PartyBox On The Go oferece agudos nítidos, médios puros e graves encorpados, além da opção de reforço de graves para manter os bons momentos durante a noite toda.', '', '193', '4', '2OJmr5pvLAlR3BN'),
	(288, '4', 'XE77sObT8I', 'Caixa de som bluetooth KTS', 139.00, '2022-03-22 11:00:30', 'Caixa de som bluetooth kts 1236 super potente Linda e muito potente!! Essa caixinha é perfeita!!Possuí suporte para celular onde poderá assistir seus vídeos.Possuí 10w de potência o que a torna com um som incrível!!Possuí luzes led que alternam de cor e fazem um efeito incrível ao tocar as músicas!!É o presente ideal !! Adultos, jovens e crianças irão amar!!!Especificações:• Alcance sem fio: até 10 metros• Tamanho da unidade do alto-falante: 3 polegadas• Potência de saída: 10w• Resposta de frequência: 100 Hz - 20 kHz -• Taxa de ruído do sinal:> = 85 db• Varredura de FM: 87,5-108,0 MHz -• Carregamento USB: DC5V• Capacidade da bateria: 1500mah• Capacidade de armazenamento SD: Pode suportar cartão SD de até 32 Gb• Tempo de carregamento: 3 - 4 horasItens Inclusos:- 01 Caixa de Som Portátil KTS-1236- 01 Cabo de carregamento USB', '', '193', '4', 'RxAFg4xszXD6iL2'),
	(289, '4', '68MIxX9fjx', 'SH375 + COND 170ML elseve longo dos sonhos', 17.90, '2022-03-22 12:07:38', 'SH375 + COND 170ML elseve longo dos sonhos', '', '194', '1', 'tAhLfOeLIP5FX3M'),
	(290, '4', '68MIxX9fjx', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 130.10, '2022-03-22 14:18:34', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', '', '195', '1', 'PgQm8xzF5lerZeC');
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) NOT NULL DEFAULT '',
  `categorie_id` varchar(50) DEFAULT NULL,
  `categories` varchar(50) DEFAULT NULL,
  `product_id` varchar(50) NOT NULL DEFAULT '',
  `tags` varchar(50) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `price` decimal(10,2) DEFAULT '0.00',
  `discount` decimal(10,2) DEFAULT '0.00',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` varchar(1) NOT NULL DEFAULT '1',
  `featured` varchar(1) NOT NULL DEFAULT '0',
  `description` text,
  `variations_data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela yxyeuv_anyloja.products: ~17 rows (aproximadamente)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `store_id`, `categorie_id`, `categories`, `product_id`, `tags`, `name`, `price`, `discount`, `created`, `update`, `active`, `featured`, `description`, `variations_data`) VALUES
	(47, '3', 'dREbxafgUf', '', 't7IaZKLQTHCLBjO', '1,2', 'Produto teste', 100.00, 0.00, '2022-03-13 12:03:35', '2022-03-13 12:03:35', '1', '0', 'Desrição', NULL),
	(49, '4', '71IS2MeJpJ', NULL, 'qPkmr8MzXuC6m9R', '', 'Copo térmico sem tampa Stanley, 473 ml', 189.00, 0.00, '2022-03-13 15:24:21', '2022-03-13 16:11:39', '1', '0', '', NULL),
	(52, '4', '68MIxX9fjx', NULL, 'PgQm8xzF5lerZeC', '', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', 159.10, 29.00, '2022-03-13 21:30:10', '2022-03-13 21:30:18', '1', '1', 'Kit Ultranutrição Viva Cachos Intenso - Paresí Nature', NULL),
	(53, '4', 'jbTpzPDoHe', NULL, 'Npg74rouZtC16FS', '', 'Levimune 60', 149.00, 0.00, '2022-03-13 21:33:18', '2022-03-13 21:33:18', '1', '1', 'Contém:\r\nLeve 60 sachês sabor laranja + 30 sachês sabor laranja grátis\r\n\r\nLevimune é um Chá Misto de Laranja Amarga, Hortelã, Cidreira, Limão, Camomila, Gengibre, Erva Doce, Cúrcuma, Cravo e Canela com o sabor de laranja! Levimune contém os nutrientes essenciais para te proporcionar mais saúde, melhorando sua imunidade e deixando-a mais leve.', NULL),
	(55, '4', '68MIxX9fjx', NULL, 'tAhLfOeLIP5FX3M', '', 'SH375 + COND 170ML elseve longo dos sonhos', 19.90, 2.00, '2022-03-13 21:56:42', '2022-03-13 21:56:42', '1', '0', 'SH375 + COND 170ML elseve longo dos sonhos', NULL),
	(56, '4', 'jbTpzPDoHe', NULL, '61k7EzcNU6zA9qb', '', 'levimune caps', 39.90, 0.00, '2022-03-15 10:30:22', '2022-03-15 10:31:37', '1', '0', 'encapsulado para emagrecimento', NULL),
	(57, '4', 'XE77sObT8I', NULL, 'kB1l4ArcnNZCESL', '', 'Caixa de som bluetooth AL-852 a prova d\'água cod-354', 71.50, 0.00, '2022-03-22 15:15:27', '2022-03-22 15:15:27', '1', '1', 'Caixa de Som AL-852 À Prova de Água Altomex\r\n\r\nA nova caixa de som AL-852 À PROVA D\' ÁGUA , possui a melhor qualidade de áudio para você animar o ambiente com suas musicas favoritas! A AL-852 À PROVA D\' ÁGUA tem : - Especificação IP 66 á Prova de Água - Compatível com todos smartphones - Compatível com Computadores - MP4 - Fones de ouvido Portátil speaker - Rádio FM - Potencia de saída: 5W - Resposta de Frequência: 100hz-20k - Taxa de ruído 80dB - Capacidade da bateria: 1200mA - Tensão USB: DC 5V - Versão : 4.2 + EDR - Apoio: telefonema , cartão do TF, Cartão USB', NULL),
	(58, '4', 'XE77sObT8I', NULL, '7zJ4RI72a58RE0G', '', 'Caixa de som JBL charge 3 cod-74', 70.20, 0.00, '2022-03-22 15:19:34', '2022-03-22 15:19:34', '1', '0', 'A Caixa de Som Bluetooth Charge 3 e ideal para que gosta de ouvir música, tem excelente acabamento, ótima qualidade, e um bom custo x beneficio, possui 2 transdutor cada um com 10w, ela também tem entrada usb, cartão de memória tf, e possui transmissão sem fio via bluetooth, e isso mesmo voçê pode Transmitir, sem fio, som estéreo de alta qualidade a partir do seu smartphone ou tablet.\r\n\r\nFrequência de resposta: 65Hz-20kHz\r\nPotência: Bivolt - 2 x 10w (Total 20w Rms)\r\nAlto Falante: 2 x 50 mm\r\nSensibilidade: 80 db\r\nAlimentação: Bateria 6000 mAh Li-on\r\nTempo de recarga: Aproximadamente 8 horas potência máxima\r\nTempo de utilização: Aproximadamente 03 à 04 horas (podendo variar de acordo com o volume e conteúdo)\r\nPeso: 800 gramas\r\nRadio: fm\r\nCompatível com ios e Android\r\nTamanho: 21,3 cm x 8,7 x 8,85 cm.\r\n\r\nitens inclusos dentro da caixa:\r\n+ 01 Caixa de Som Portátil Charge 3 +\r\n+ 01 Cabo USB/Micro usb\r\n+ 01 Manual', NULL),
	(59, '4', 'XE77sObT8I', NULL, '3t7SsAnvPpmdxBP', '', 'Caixa de som Ds-14 cod-423', 176.80, 0.00, '2022-03-22 15:26:42', '2022-03-22 15:26:42', '1', '0', 'O Grasep D-S14 oferece um som natural, com grande clareza e precisão, que é uniformemente disperso. Um alto-falante que garante potência e qualidade por igual na reprodução de conteúdos multimídia.\r\n\r\nEsqueça do amplificador\r\nSendo ativo, você só precisará conectá-lo à fonte de som e o mesmo equipamento ficará encarregado de amplificar e tocar: você ganhará praticidade e espaço, pois também requer menos fiação do que um passivo. É a solução mais conveniente se você quer produzir música em casa ou em um estúdio, e também para DJs.\r\n- Vem com 1 microfone.\r\n- Inclui controle remoto.\r\n- Conector de entrada: Miniplug, Leitor SD, Plug.\r\n- Lugar de colocação: o piso.\r\n- Dimensões: 17cm de largura, 39.9cm de altura e 17cm de profundidade.', NULL),
	(60, '4', 'XE77sObT8I', NULL, 'iX5NFHuv83GHv4h', '', 'Caixa de som AL-008 cod-423', 58.90, 0.00, '2022-03-22 16:35:59', '2022-03-22 16:35:59', '1', '0', 'Caixa De Som Portátil AL-008 aproveite a melhor experiência ouvindo suas músicas com mais qualidade que nunca, conte com resistência e sofisticação, resistente à respingos, design slim tornando-a mais prática ao carregar no seu dia a dia, faça festas, divida momentos com amigos ou até aquela música perfeita para dar a disposição que você precisa!!Sem contar a longa duração da bateria, então não fique de fora e garanta já a sua Caixa De Som Portátil AL-008.', NULL),
	(61, '4', 'XE77sObT8I', NULL, 'kEHPZp4Td4smUMQ', '', 'Lampada bluetooth wj-l2 cod-423', 32.50, 0.00, '2022-03-22 16:40:19', '2022-03-22 16:40:19', '1', '0', 'Lampada Bluetooth Led Caixa D Som Música Controle, com ela a festa está garantida!\r\n\r\nLâmpada com Função Caixa de Som Bluetooth e Controle que muda suas cores.\r\nUm acessório prático e divertido de usar,\r\nFaça de qualquer sala um verdadeiro salão de festas!\r\n\r\n••INFORMAÇÕES TÉCNICAS:\r\n\r\nDescrição da Lâmpada:\r\n. Modelo redondo com dissipador de calor\r\n. Potência total: 12W\r\n. Potência LED: 6W\r\n. Potência alto falante: 3W\r\n. Frequência: 135Hz – 15KHz\r\n. Conexão bluetooth\r\n. Versão wireless: 4.2\r\n. Controle remoto infravermelho com 24 funções e 16 cores diferentes\r\n. Alcance do controle remoto: 10 metros\r\n. Controles para alterar cor e intensidade da luz\r\n. Reproduz músicas através de bluetooth, basta parear o smartphone\r\n. Controles para música; voltar, pausar, avançar\r\n. Soquete Receptáculo E27 (padrão lâmpada comum)\r\n. Voltagem: Bivolt 100V – 240V', NULL),
	(62, '4', 'XE77sObT8I', NULL, '76O1BHz0EvcnduV', '', 'caixa de som kombi ws-266 cod-96', 87.00, 0.00, '2022-03-22 17:04:58', '2022-03-22 17:04:58', '1', '0', 'Caixa De Som Kombi Rádio Fm Usb Micro Sd WS-266BT\r\n\r\nQue tal ter uma réplica idêntica da Kombi? Em um tamanho compacto, produz um som potente e de excelente qualidade.\r\n\r\nEste veículo faz parte da história de nossos pais, e tios foi produzida em 1957 até dezembro de 2013 era usada para transporte de passageiros e cargas. E também era um carro de família numerosa nas décadas de 50 a 70.\r\n\r\nCaixa de som estilo kombi (ou perua, ou kombosa para os amantes deste carro), é ótimo para decoração seu quarto ou sua estante e é uma bela peça com a excelente acabamento, aquela peça que não pode faltar para os amantes deste carro. \r\n\r\n- Bluetooth\r\n- Entrada para Cartão Micro SD, USB, Pen Drive compatível com formato MP3, Rádio FM Digital.\r\n- Pode ser utilizada como Caixa de Som para PC, Notebook, Compatível com Celular, iPod, MP3, etc...\r\n- Entrada DC-5V/Auxiliar\r\n- Antena para melhor recepção de Sinal\r\n-Frequência de Rádio 87.5 a 108 MHz\r\n- Memoriza 99 Estações de Rádio\r\n- Exclusividade com qualidade e modernidade.\r\n- Entrada auxiliar para MP4 a MP20.\r\n- Designer ultra Moderno\r\n- Potência: RMS 6w\r\n- Frequência: 150-18000hz\r\n- Sinal para Ruído 80db\r\n- Distorção: <0,5%\r\n- Bateria: Lítio (500ma)\r\n- Saída P2 para Fone de Ouvido\r\n- Visor de Led Digital que indica Estação de Rádio Faixa da Música Volume.\r\n- Dimensões: Alt. 9cm X Comp. 20cm X Larg. 8cm\r\n- Tempo em uso aproximadamente 4 horas\r\n\r\nEspecificação Técnica:\r\nFrequência: 150-18000Hz\r\nPower Output RMS 3W=THD10%\r\nInput DV - 5V\r\nBuilt-In BL-Bateria 5C\r\nFM - 88MHz-108MHz\r\n\r\nBotões Multi-funções:\r\n- Avanço/Volume (+)\r\n- Pausa/Scan FM\r\n- Retrocesso/Volume (-)\r\n- Liga/Desliga/Modo de Seleção: Rádio/MP3/Auxiliar\r\n\r\nConteúdo da Embalagem\r\n01 Caixa de som estilo kombi\r\n01 Bateira interna\r\n01 Cabo para carregar / Cabo auxiliar p2.', NULL),
	(63, '4', 'XE77sObT8I', NULL, 'mmVfxNck6bqVCtF', '', 'Caixa de som a prova d\'água Al-652 cod-361', 55.90, 0.00, '2022-03-22 17:09:30', '2022-03-22 17:09:30', '1', '0', 'Caixa de Som à prova d\'agua Altomex AL-652\r\nQualidade de som até em baixo d\'agua, ideal para todos os ambientes, seja em casa, na praia, em viagens e escritório (contém microfone que facilita em ligações e envio de áudios). Portátil com alça para melhor transportá-la.\r\nEla não vai te deixar na mão em lugar nenhum, pois possui uma bateria de longa duração (12hrs). Além disso, possui uma ótima qualidade de som, são 5W de potência.\r\nSeu bluetooth é compatível com todos os dispositivos (versão 4.2), funcionando em até 10m de distância.\r\nAlém disso, possui entradas Usb, auxiliar e para cartão sd; oferecendo um leque de opções para curtir um bom som.\r\n\r\nEspecificações:\r\nBluetooth Versão 4.2\r\nPotência: 5W.\r\nAlimentação: 5V dc via usb.\r\nCapacidade da Bateria: 3.7v/1200mah.\r\nImpedância: 4 ohm\r\nTempo de Carregamento: 2 horas.\r\nTempo de Utilização: 12 horas (aproximadamente).\r\nMaterial: Borracha, metal e circuito eletrônico.\r\n\r\nDimensões do produto:\r\nDimensão: 113 mm x 50 mm\r\n\r\nItens Inclusos:\r\n- 01 Mini Caixa de Som altomex AL-652.\r\n- 01 Cabo Micro/ USB V8.\r\n- 01 Cabo auxiliar', NULL),
	(64, '4', 'XE77sObT8I', NULL, '9PNQCCupTf06PSm', '', 'caixa de som Al-1185 cod-421', 31.00, 0.00, '2022-03-22 17:12:33', '2022-03-22 17:12:33', '1', '0', 'Caixa de Som Bluetooth Altomex 1185 Preta com Suporte Imagina ter uma caixa de som portátil e versátil, com som estéreo, que oferece várias alternativas de conexão, que possui alça de mão para carregá-la para qualquer lugar e ainda vem com suporte para apoio do seu aparelho Smartphone, incrível não? A Caixa de Som Altomex 1186 reúne tudo isso e muito mais, para você aproveitar bons momentos curtindo suas mídias preferidas, músicas, podcasts, vídeos, séries, onde quer que esteja! A Caixa de som 1186 possui conexão Bluetooth, Rádio fm, entrada USB para pendrive, entrada para cartão de memória Micro sd (cartão tf), som estéreo com excelente reprodução de graves, possui carregamento via cabo usb, além de luzes LED que acendem e mudam de cor ao ligar e reproduzir áudios, perfeito para para aquela festinha dentro de casa ou no rolê com os amigos. Possui ainda suporte para apoiar seu Smartphone enquanto está sincronizado à caixa, funcionalidade ideal para assistir aulas online, lives, vídeos, filmes e séries em casa sem esforços, no parque ou praça com os amigos sem problemas e com áudio excelente, ou mesmo deixar a playlist preferida tocar à vontade! Informações: Versão Bluetooth: 5.0 + edr (A2DP) Distância de operação: até 10 m Resposta de frequência: 20Hz - 20KHz Potência: 5W Carregamento: Conexão usb Capacidade de carga 500mAh Tensão de carregamento da bateria: 5V dc (usb) Tempo de Reprodução: 3 horas Tempo de Carregamento: 3 horaS Peso: 400g Cor: Preta Conteúdo da embalagem: 1 Caixa de Som Bluetooth Altomex 1186 1 cabo USB para Carregamentot-gift store é garantia de qualidade: entrega rápida, produtos bem embalados E com nota fiscal envio imediato Especificações Técnicas:', NULL),
	(65, '4', 'XE77sObT8I', NULL, 'ddP76R20I8psUm5', '', 'Caixa de som Q3 cod-307', 40.30, 0.00, '2022-03-22 17:17:43', '2022-03-22 17:17:43', '1', '0', 'Caixa De Som Bluetooth Receptor Caixinha Wireless Mp3 Usb Q3\r\n\r\n\r\nDados técnicos\r\n- Modelo Bleuttoth Q3\r\n- Entrada para pendrive, cartão de memória, radio FM, bluetooth universal\r\n- Pode ser utilizado como Viva voz, pois possui microfone interno\r\n- Controle de Volume, play e pause\r\n- Produto aplicável em qualquer aparelho bluetooth ex: Samsung, Iphone 6, Iphone 5, Iphone 4, Ipod, Ipad, Asus, Lg, etc.\r\n- Funciona com Todas As versões da Apple\r\n- Possui Bateria Interna Recarregável.\r\n- Carrega pelo Usb do Computador\r\n- Lê arquivos em formato de Mp3 e Mp4\r\n- Entrada Auxiliar P2 para ligar caixas auxiliares ( nao funiona para fone de ouvido )\r\n- Carrega em 3 horas, dura aprox 9 horas em uso ( varia conforme o nível de volume )\r\n- Peso: 457 gr\r\n- Voltagem: DC 5v\r\n- Frequência de resposta: 150hz-20khz\r\n- Tamanho: 9,5cm x 9,5cm x 10,8cm\r\n- Potencia saída: 5W*1\r\n\r\nItens inclusos\r\n-1x Caixinha de som modelo Q3\r\n-1x Cabo USB V8\r\n-1x Caixa Embalagem', NULL),
	(66, '4', 'XE77sObT8I', NULL, 'vK46IA6jjxSHESn', '', 'Caixa de som kts-1107 cod-283', 140.00, 0.00, '2022-03-22 17:23:38', '2022-03-22 17:23:38', '1', '0', 'Compatível com qualquer dispositivo Bluetooth com bateria recarregável Lion para máxima portabilidade. Controles de ajuste de volume e telefone de música. Possui slot para cartão TF, porta USB, rádio FM e função de karaokê.\r\n\r\nEspecificação:\r\n- Alcance de transmissão sem fio de até 10m\r\n- Tamanho da unidade do alto-falante: 6,5 polegadas\r\n- Potência de saída: 15w\r\n- Resposta em frequência: 100hz - 20khz\r\n- Relação de ruído do sinal:> = 85db\r\n- Carregamento USB: DC5V\r\n- Capacidade da bateria: 1200mAh\r\n- Pode suportar cartão SD de até 32gb\r\n- Tempo de carregamento: 3 horas\r\n1 x cabo de carregamento USB\r\n1 x microfone\r\n1 x controle remoto Bluetooth', NULL),
	(67, '4', 'XE77sObT8I', NULL, '37ApUxuG1Vuqu2X', '', 'Caixa de som com lanterna kts-1185 cod-463', 43.20, 0.00, '2022-03-22 17:27:24', '2022-03-22 17:27:24', '1', '0', 'A caixa de som portátil é capaz de tocar as músicas de formato MP3 de cartões SD/MMS ou USB, além de funcionar também como rádio FM. Possui função bluethooth que permite controlar o aparelho à distância. Por ter entrada para microfone, funciona também como um amplificador de som de altíssima qualidade e potência, permitindo seu uso em nas mais diversas situações, seja em reuniões de lazer ou como instrumento para divulgação de produtos e/ou campanhas. Bateria de bom desempenho e duração. Lanterna em LED que auxilia na iluminação durante campings ou atividades ao ar livre.Número do Modelo:HK-1185Compatibilidade: Bluetooth Cabo auxiliar USB (para pendrive)Entrada para microfoneOutras características:Tipo: Caixa de Som.Tamanho: 15cm x 12cm.Peso: 400gr.Saída: 5W.Frequência FM: 87.5 – 108.0 MHZ .Potência do Amplificador: >85Db.Alto-falante: 3 inch.Bateria Interna: 800mAh.Voltagem: 5VDC (recomenda-se utilizar tomada USB de 2 Amperes).Material utilizado na Fabricação: Plástico, metal e circuito eletrônico.', NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.sellers
CREATE TABLE IF NOT EXISTS `sellers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela yxyeuv_anyloja.sellers: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `sellers` DISABLE KEYS */;
INSERT INTO `sellers` (`id`, `store_id`, `url`, `created`, `update`, `name`, `phone`) VALUES
	(8, '1', 'xPCOR', '2020-08-19 16:22:04', '2022-03-14 13:21:23', 'Hilton', '(37) 99801-9655'),
	(9, '1', '2S4ea', '2020-08-27 10:45:34', '2020-08-27 10:45:34', 'José das vendas', '(37) 98827-2650'),
	(10, '2', 'dhR0z', '2021-01-16 11:06:50', '2021-01-16 11:06:50', 'Aécio', '(37) 98855-5554'),
	(11, '3', 'ArTVi', '2022-03-13 11:47:53', '2022-03-13 11:47:53', 'Aecio', '(37) 98855-5554'),
	(13, '4', 'bi1Ng', '2022-03-14 13:22:53', '2022-03-14 13:22:53', 'Hilton', '(37) 99801-9655');
/*!40000 ALTER TABLE `sellers` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.stores
CREATE TABLE IF NOT EXISTS `stores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store` varchar(50) DEFAULT NULL,
  `cod` varchar(50) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `uniq` varchar(255) DEFAULT NULL,
  `active` varchar(1) NOT NULL DEFAULT '1',
  `email` varchar(50) NOT NULL,
  `pixel` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `folder` varchar(50) NOT NULL DEFAULT '1',
  `address` varchar(255) DEFAULT '',
  `bio` varchar(255) DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `min_order` decimal(10,2) DEFAULT '0.00',
  `instagram` varchar(255) DEFAULT '',
  `facebook` varchar(255) DEFAULT '',
  `doc` varchar(255) DEFAULT '',
  `logo` varchar(255) DEFAULT '',
  `message` varchar(255) DEFAULT '',
  `show_categories_home` varchar(255) DEFAULT '',
  `show_banner_sequential` varchar(255) DEFAULT '',
  `show_search_at_home` varchar(255) DEFAULT '',
  `installment` varchar(50) DEFAULT NULL,
  `require_client` varchar(50) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela yxyeuv_anyloja.stores: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` (`id`, `store`, `cod`, `created`, `update`, `uniq`, `active`, `email`, `pixel`, `name`, `password`, `folder`, `address`, `bio`, `phone`, `min_order`, `instagram`, `facebook`, `doc`, `logo`, `message`, `show_categories_home`, `show_banner_sequential`, `show_search_at_home`, `installment`, `require_client`) VALUES
	(3, NULL, 'loja-teste', '2022-03-13 11:00:46', '2022-03-13 11:46:03', NULL, '1', 'a@a.com', '', 'Loja teste', '$2a$10$zXLkDHsEf2f6cDSfJXJZhuLgKGktAmqqO/6HEG7UMitu2TMNOAey.', 'loja-teste', '', '', '', 0.00, '@suaempresa', '', '', '1647182763155.webp', '', '1', '1', '1', '3', NULL),
	(4, NULL, 'maxima', '2022-03-13 13:59:35', '2022-03-13 22:20:52', NULL, '1', 'm@m.com', '', 'Maxima Atacadista', '$2a$10$wUltGF2BId.wISpxIVMBEu6UFsclWmNENexO8L3NLUL9g/EV9Ga12', 'maxima', '', '', '', 0.00, 'maxima_atacdista', '', '', '1647191287737.webp', '', '1', '1', '1', '0', '1');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.stories
CREATE TABLE IF NOT EXISTS `stories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) DEFAULT NULL,
  `order` varchar(50) DEFAULT NULL,
  `button` varchar(50) DEFAULT NULL,
  `url` text,
  `name` varchar(50) DEFAULT NULL,
  `processed` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela yxyeuv_anyloja.stories: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` (`id`, `store_id`, `order`, `button`, `url`, `name`, `processed`) VALUES
	(1, '3', '0', 'Texto', 'https://google.com.br', 'compressed_1647181029149.mp4', '1'),
	(3, '4', '1', 'VEJA NOSSOS ELETRONICOS', 'https://yxyeuv.conteige.cloud/maxima/buscar?categories=XE77sObT8I', 'compressed_1647191308261.mp4', '1'),
	(4, '4', '0', 'COMPRE AQUI', 'https://yxyeuv.conteige.cloud/maxima/product/np7DnqD7946AQnE', '1647192198024.mp4', '0');
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '0',
  `active` varchar(50) NOT NULL DEFAULT '0',
  `tags_title` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela yxyeuv_anyloja.tags: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` (`id`, `store_id`, `name`, `active`, `tags_title`) VALUES
	(1, '3', 'Grande', '1', '3'),
	(2, '3', 'Médio', '1', '3'),
	(3, '3', 'Pequeno', '1', '3'),
	(4, '4', 'Preto', '1', '5'),
	(6, '4', 'Camuflado', '1', '5');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;

-- Copiando estrutura para tabela yxyeuv_anyloja.tags_title
CREATE TABLE IF NOT EXISTS `tags_title` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` varchar(50) DEFAULT NULL,
  `active` varchar(50) DEFAULT NULL,
  `order` varchar(50) DEFAULT NULL,
  `required` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela yxyeuv_anyloja.tags_title: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tags_title` DISABLE KEYS */;
INSERT INTO `tags_title` (`id`, `store_id`, `active`, `order`, `required`, `name`) VALUES
	(3, '3', '1', NULL, '1', 'Tamanho'),
	(5, '4', '1', NULL, '1', 'Cor');
/*!40000 ALTER TABLE `tags_title` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
