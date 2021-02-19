-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: guild_management
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `guild_info`
--

DROP TABLE IF EXISTS `guild_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guild_info` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `input_date` date NOT NULL,
  `manager` varchar(45) NOT NULL,
  `world` int NOT NULL,
  `name` varchar(32) NOT NULL,
  `flag` int NOT NULL,
  `rade` int NOT NULL,
  `isfinished_rade` int NOT NULL DEFAULT '0',
  `room011` varchar(45) DEFAULT NULL,
  `room012` varchar(45) DEFAULT NULL,
  `room013` varchar(45) DEFAULT NULL,
  `room021` varchar(45) DEFAULT NULL,
  `room022` varchar(45) DEFAULT NULL,
  `room023` varchar(45) DEFAULT NULL,
  `room031` varchar(45) DEFAULT NULL,
  `room032` varchar(45) DEFAULT NULL,
  `room033` varchar(45) DEFAULT NULL,
  `room041` varchar(45) DEFAULT NULL,
  `room042` varchar(45) DEFAULT NULL,
  `room043` varchar(45) DEFAULT NULL,
  `room051` varchar(45) DEFAULT NULL,
  `room052` varchar(45) DEFAULT NULL,
  `room053` varchar(45) DEFAULT NULL,
  `room061` varchar(45) DEFAULT NULL,
  `room062` varchar(45) DEFAULT NULL,
  `room063` varchar(45) DEFAULT NULL,
  `room071` varchar(45) DEFAULT NULL,
  `room072` varchar(45) DEFAULT NULL,
  `room073` varchar(45) DEFAULT NULL,
  `room081` varchar(45) DEFAULT NULL,
  `room082` varchar(45) DEFAULT NULL,
  `room083` varchar(45) DEFAULT NULL,
  `room091` varchar(45) DEFAULT NULL,
  `room092` varchar(45) DEFAULT NULL,
  `room093` varchar(45) DEFAULT NULL,
  `room101` varchar(45) DEFAULT NULL,
  `room102` varchar(45) DEFAULT NULL,
  `room103` varchar(45) DEFAULT NULL,
  `room111` varchar(45) DEFAULT NULL,
  `room112` varchar(45) DEFAULT NULL,
  `room113` varchar(45) DEFAULT NULL,
  `room121` varchar(45) DEFAULT NULL,
  `room122` varchar(45) DEFAULT NULL,
  `room123` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `idx_UNIQUE` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guild_info`
--

LOCK TABLES `guild_info` WRITE;
/*!40000 ALTER TABLE `guild_info` DISABLE KEYS */;
INSERT INTO `guild_info` VALUES (12,'2021-02-10','jeonghun2009',29,'Meca',0,0,1,'RASHOMON 독다듀블 뽀솜잉','','휘빔','V루아르V 코노r 솜서애','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''),(13,'2021-02-10','jeonghun2009',29,'Meca',0,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'2021-01-18','jeonghun2009',29,'Meca',820,1460,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'2021-02-17','jeonghun2009',29,'Meca',0,0,1,'RASHOMON 독다듀블 뽀솜잉','휘빔','','V루아르V 코노r 솜서애','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''),(16,'2021-01-04','jeonghun2009',29,'Meca',820,1360,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'2021-02-17','jeonghun2020',29,'Lune',230,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `guild_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-20  1:26:34
