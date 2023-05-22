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
-- Table structure for table `coin`
--

DROP TABLE IF EXISTS `coin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `internal` varchar(10) NOT NULL,
  `image_url` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `algorithm` varchar(50) NOT NULL,
  `proof_type` varchar(50) NOT NULL,
  `rating` varchar(10) NOT NULL,
  `technology_adoption_rating` varchar(10) DEFAULT NULL,
  `market_performance_rating` varchar(10) DEFAULT NULL,
  `net_hashes_per_second` bigint NOT NULL,
  `block_number` int NOT NULL,
  `block_time` int NOT NULL,
  `block_reward` decimal(10,2) NOT NULL,
  `asset_launch_date` date NOT NULL,
  `max_supply` decimal(18,9) DEFAULT NULL,
  `type` int NOT NULL,
  `document_type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin`
--

LOCK TABLES `coin` WRITE;
/*!40000 ALTER TABLE `coin` DISABLE KEYS */;
INSERT INTO `coin` VALUES (1182,'BTC','Bitcoin','BTC','/media/37746251/btc.png','/coins/btc/overview','SHA-256','PoW','','','',9007199254740991,790249,550,6.25,'2009-01-03',9007199.254740990,1,'Webpagecoinp'),(3808,'LTC','Litecoin','LTC','/media/37746243/ltc.png','/coins/ltc/overview','Scrypt','PoW','','','',784528117521820,2475725,135,12.51,'2011-10-08',9007199.254740990,1,'Webpagecoinp'),(4432,'DOGE','Dogecoin','DOGE','/media/37746339/doge.png','/coins/doge/overview','Scrypt','PoW','','','',571118772148896,4721834,63,10000.00,'2013-12-06',-1.000000000,1,'Webpagecoinp'),(5031,'XRP','XRP','XRP','/media/38553096/xrp.png','/coins/xrp/overview','N/A','XRP LCP','','','',0,79851686,4,0.00,'2012-09-26',9007199.254740990,1,'Webpagecoinp'),(7605,'ETH','Ethereum','ETH','/media/37746238/eth.png','/coins/eth/overview','Ethash','PoS','','','',0,17275671,12,2.04,'2015-07-30',-1.000000000,1,'Webpagecoinp'),(171986,'USDT','Tether','USDT','/media/37746338/usdt.png','/coins/usdt/overview','N/A','N/A','','','',0,0,0,0.00,'2014-10-06',-1.000000000,1,'Webpagecoinp'),(204788,'BNB','Binance Coin','BNB','/media/40485170/bnb.png','/coins/bnb/overview','BEP-2','PoSA','','','',0,315488106,0,0.00,'2019-04-18',-1.000000000,1,'Webpagecoinp'),(310829,'TRX','TRON','TRX','/media/37746879/trx.png','/coins/trx/overview','N/A','DPoS','','','',0,51366772,3,16.00,'2018-06-26',-1.000000000,1,'Webpagecoinp'),(321992,'ADA','Cardano','ADA','/media/37746235/ada.png','/coins/ada/overview','Ouroboros','PoS','','','',0,8788948,20,0.00,'2017-09-23',9007199.254740990,1,'Webpagecoinp'),(348131,'RNDR','Render Token','RNDR','/media/39500858/rndr.png','/coins/rndr/overview','N/A','N/A','','','',0,0,0,0.00,'2019-02-12',-1.000000000,1,'Webpagecoinp'),(844139,'TUSD','True USD','TUSD','/media/38554125/tusd.png','/coins/tusd/overview','N/A','N/A','','','',0,0,0,0.00,'2019-01-04',-1.000000000,1,'Webpagecoinp'),(925809,'USDC','USD Coin','USDC','/media/34835941/usdc.png','/coins/usdc/overview','N/A','N/A','','','',0,0,0,0.00,'2018-09-10',-1.000000000,1,'Webpagecoinp'),(930246,'MATIC','Polygon','MATIC','/media/37746047/matic.png','/coins/matic/overview','N/A','N/A','','','',0,42838968,2,0.40,'2020-05-30',-1.000000000,1,'Webpagecoinp'),(930345,'DREP','DREP','DREP','/media/35650539/drep.png','/coins/drep/overview','N/A','N/A','','','',0,0,0,0.00,'2019-09-05',-1.000000000,1,'Webpagecoinp'),(932135,'BUSD','Binance USD','BUSD','/media/37746248/busd.png','/coins/busd/overview','N/A','N/A','','','',0,0,0,0.00,'2019-09-10',-1.000000000,1,'Webpagecoinp'),(934443,'SOL','Solana','SOL','/media/37747734/sol.png','/coins/sol/overview','N/A','PoH','','','',0,177337559,1,0.00,'2020-03-31',-1.000000000,1,'Webpagecoinp'),(936750,'GALA','Gala','GALA','/media/39500762/gala.png','/coins/gala/overview','N/A','N/A','','','',0,0,0,0.00,'2020-09-11',-1.000000000,1,'Webpagecoinp'),(937569,'AXS','Axie Infinity Shards','AXS','/media/43687841/axs.png','/coins/axs/overview','N/A','N/A','','','',0,0,0,0.00,'2021-04-26',-1.000000000,1,'Webpagecoinp'),(937778,'CFX','Conflux Network','CFX','/media/37747293/cfx.png','/coins/cfx/overview','Octopus','PoW','','','',8293989189385,71717225,0,0.99,'2020-10-29',-1.000000000,1,'Webpagecoinp'),(938419,'LDO','Lido DAO','LDO','/media/40485192/ldo.png','/coins/ldo/overview','N/A','N/A','','','',0,0,0,0.00,'2020-12-17',9007199.254740990,1,'Webpagecoinp'),(948259,'PHB','Phoenix Global [v2]','PHB','/media/40124914/phbv1.png','/coins/phb/overview','N/A','N/A','','','',0,0,0,0.00,'2021-11-02',-1.000000000,1,'Webpagecoinp'),(948958,'OP','Optimism','OP','/media/40219338/op.png','/coins/op/overview','N/A','N/A','','','',0,0,0,0.00,'2021-11-11',-1.000000000,1,'Webpagecoinp'),(952987,'ARB','Arbitrum','ARB','/media/44081950/arb.png','/coins/arb/overview','N/A','N/A','','','',0,0,0,0.00,'2021-05-28',-1.000000000,1,'Webpagecoinp'),(953119,'SUI','Sui','SUI','/media/44082045/sui.png','/coins/sui/overview','N/A','N/A','','','',0,0,0,0.00,'2023-04-01',-1.000000000,1,'Webpagecoinp'),(953245,'PEPE','Pepe','PEPE','/media/44082118/pepe.png','/coins/pepe/overview','N/A','N/A','','','',0,0,0,0.00,'2023-04-14',-1.000000000,1,'Webpagecoinp');
/*!40000 ALTER TABLE `coin` ENABLE KEYS */;
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
