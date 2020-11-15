CREATE SCHEMA `xbshop` DEFAULT CHARACTER SET utf8;

insert into `c_useraccess` (`idUserAccess`, `code`) values (1, 'teamList'), (2, 'productList'), (3, 'category'), (4, 'customerList');

INSERT INTO `a_userrole` (`idRole`, `label`, `reserved`) VALUES
(1, 'superAdmin', 1);

INSERT INTO `l_roleaccess` (`roleId`, `accessId`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4);

INSERT INTO `a_user` (`idUser`, `username`, `password`, `phoneNumber`, `email`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 'paker1989', 'paker1989', '659657708', 'xubinqz@gmail.com', 0, '2020-08-19 00:00:00', '2020-08-19 00:00:00');

INSERT INTO `l_userpref` (`idUserPref`, `userroleId`, `userAccessId`, `userId`) VALUES
(1, 1, 1, 1);

-- https://www.data.gouv.fr/en/datasets/regions-departements-villes-et-villages-de-france-et-doutre-mer/
DROP TABLE IF EXISTS `c_fr_departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_fr_departments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `region_code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departments_region_code_foreign` (`region_code`),
  KEY `departments_code_index` (`code`),
  CONSTRAINT `departments_region_code_foreign` FOREIGN KEY (`region_code`) REFERENCES `regions` (`code`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `c_fr_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_fr_regions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE Øutf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `regions_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `c_fr_cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_fr_cities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `department_code` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `insee_code` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_code` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gps_lat` double(16,14) NOT NULL,
  `gps_lng` double(17,14) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cities_department_code_foreign` (`department_code`),
  CONSTRAINT `cities_department_code_foreign` FOREIGN KEY (`department_code`) REFERENCES `departments` (`code`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35854 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



