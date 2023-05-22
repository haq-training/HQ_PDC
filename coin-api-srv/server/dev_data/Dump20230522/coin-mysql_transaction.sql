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
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionType` varchar(145) NOT NULL,
  `createdAt` date NOT NULL,
  `symbol` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `address` varchar(245) NOT NULL,
  `balance` decimal(18,8) NOT NULL,
  `usdBalance` varchar(245) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'Buy','2022-01-12','BTC','Pending','0898hshiw36...',0.22313450,'11,032.24'),(2,'Sell','2022-01-13','BTC','Pending','0898hshiw36...',0.23134500,'1,032.24'),(3,'Buy','2022-01-14','BTC','Pending','0898hshiw36...',0.32313450,'21,032.24'),(4,'Sell','2022-01-15','BTC','Pending','0898hshiw36...',0.53134500,'1,232.24'),(5,'Buy','2022-01-16','BTC','Pending','0898hshiw36...',0.19313450,'9,032.24'),(6,'Buy','2022-01-17','BTC','Pending','0898hshiw36...',0.42313450,'31,032.24'),(7,'Buy','2022-01-18','BTC','Pending','0898hshiw36...',0.82313450,'61,032.24'),(8,'Buy','2022-01-19','BTC','Pending','0898hshiw36...',0.14313450,'4,032.24'),(9,'Buy','2022-01-20','BTC','Pending','0898hshiw36...',0.31313450,'41,032.24'),(10,'Buy','2022-01-21','BTC','Pending','0898hshiw36...',0.54313450,'65,032.24'),(11,'Buy','2022-01-22','BTC','Pending','0898hshiw36...',0.75313450,'68,032.24'),(12,'Buy','2022-01-23','BTC','Pending','0898hshiw36...',0.29313450,'21,032.24');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
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
