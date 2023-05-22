-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: coin-mysql
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collections` (
  `idCollection` int NOT NULL AUTO_INCREMENT,
  `nameCollection` varchar(145) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(245) NOT NULL,
  `coverImage` varchar(145) NOT NULL,
  `numberOfArtwork` int NOT NULL,
  `image` varchar(245) NOT NULL,
  `avatar` varchar(245) NOT NULL,
  `userName` varchar(245) NOT NULL,
  `userSlug` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`idCollection`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections`
--

LOCK TABLES `collections` WRITE;
/*!40000 ALTER TABLE `collections` DISABLE KEYS */;
INSERT INTO `collections` VALUES (1,'Artbyck','nft-details','Intutive Motion','CollectionCover1',3,'CollectionImage1','User1','Cameronwilliamson','cameronwilliamson'),(2,'Artbyck','nft-details','Intutive Motion','CollectionCover2',3,'CollectionImage2','User2','Cameronwilliamson','cameronwilliamson'),(3,'Artbyck','nft-details','Intutive Motion','CollectionCover3',3,'CollectionImage3','User3','Cameronwilliamson','cameronwilliamson'),(4,'Artbyck','nft-details','Intutive Motion','CollectionCover4',3,'CollectionImage4','User4','Cameronwilliamson','cameronwilliamson'),(5,'Artbyck','nft-details','Intutive Motion','CollectionCover5',3,'CollectionImage5','User5','Cameronwilliamson','cameronwilliamson'),(6,'Artbyck','nft-details','Intutive Motion','CollectionCover6',3,'CollectionImage6','User4','Cameronwilliamson','cameronwilliamson'),(7,'Artbyck','nft-details','Intutive Motion','CollectionCover7',3,'CollectionImage2','User1','Cameronwilliamson','cameronwilliamson'),(8,'Artbyck','nft-details','Intutive Motion','CollectionCover8',3,'CollectionImage1','User2','Cameronwilliamson','cameronwilliamson');
/*!40000 ALTER TABLE `collections` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22  9:08:12
