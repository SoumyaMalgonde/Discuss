-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: discussion-forum
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `title` varchar(300) DEFAULT NULL,
  `body` varchar(750) NOT NULL,
  `posted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_id` int DEFAULT NULL,
  `root_id` int DEFAULT NULL,
  `is_discussion_comment` tinyint NOT NULL,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `comment_id_UNIQUE` (`comment_id`),
  UNIQUE KEY `body_UNIQUE` (`body`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `username_idx` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (159,'codingcat','Selenium WebDriver session ID','What is a *Selenium WebDriver session ID*?','2021-11-28 14:56:10',NULL,NULL,1),(160,'soumya_27','ICPC\'20','Hi everyone? I am from team *a_generic_teamname*. How was your experience of Amrita Qualifiers this year?\r Any amazing experiences like [this blog](https://codeforces.com/blog/entry/76290) ?','2021-11-28 15:07:43',NULL,NULL,1),(161,'Rohit','Placement Prep Advice','Please share some placement preparation tips. I am a third year student and want to start preparing for placements. I know decent development and good amount of cp. Also how to prepare for HR rounds?','2021-11-28 15:15:29',NULL,NULL,1),(162,'RishikaSharma','Want to learn DSA','How do I learn data structures & algorithms as a newbie and go from beginner to expert? Should I do the Princeton course from Coursera, or do the MOOC from MIT, or simply read Thomas Cormen\'s book \'Introduction to Algorithms\'?','2021-11-28 15:18:48',NULL,NULL,1),(163,'chandan',NULL,'Start with data structure\'s:\nYou can go through a website called [geeksforgeeks](https://www.geeksforgeeks.org/). For every data structure they have set of questions, just go through few of the questions of each data structure\'s. What this will do is you will get an idea of where to use a particular data structure. If you go on practicing this you will become pretty good at this.\nNow lets jump on to Algorithm\'s:\nThere are few things you should know like time/space complexity, some basic algorithms like different sorting algorithms, divide and conquer, dynamic programming etc. Here also follow the same logic go through few questions regarding certain algorithms and see how they solve them. Pretty cool right :)','2021-11-28 15:25:54',162,162,1),(164,'chandan',NULL,'Selenium WebDriver is a web automation tool.\n\nIt exposes API (application programming interface) that helps you control and interact with the browser.','2021-11-28 15:26:34',159,159,1),(165,'codingcat',NULL,'','2021-11-28 15:27:49',2,2,1),(166,'codingcat',NULL,'Yeah very precise answer, nice.','2021-11-28 15:29:38',164,159,1),(167,'coolAlex',NULL,'You can read more here: [https://www.selenium.dev/](https://www.selenium.dev/)','2021-11-28 15:33:28',166,159,1),(168,'codingcat',NULL,'Cool thanks!','2021-11-28 15:34:01',167,159,1),(169,'soumya_27',NULL,'As we all know, Selenium WebDriver is a tool that acts as a mediator between the browser and the test-script.\nSo when we create an instance of Selenium WebDriver, it opens up a browser session for the browser which we have created an instance for.\nEach browser session will have an session-id associated with it which is referred as Selenium WebDriver session-id.','2021-11-28 15:35:13',159,159,1),(170,'soumya_27',NULL,'Thomas Cormen\'s book is amazing I recommend it!','2021-11-28 15:36:30',162,162,1),(171,'Rohit',NULL,'I second that.','2021-11-28 15:37:53',170,162,1),(172,'soumya_27','Scholarships/externships/conferences','What are some good Scholarships/externships/conferences for students majoring in tech.','2021-11-28 15:41:11',NULL,NULL,1),(173,'Rohit',NULL,'Github externship is nice opportunity.','2021-11-28 15:43:08',172,172,1),(174,'RishikaSharma',NULL,'Microsoft Engage Mentorship Program is great.','2021-11-28 15:43:47',172,172,1),(175,'soumya_27',NULL,'Yes I am a mentee for that ^_^','2021-11-28 15:44:36',174,172,1),(176,'Ashley11','IT students - advice on elective subjects','Which elective among IWP(Internet and web programming) and Computational Optimization did you take up in last semester? (IT students)','2021-11-28 15:49:01',NULL,NULL,1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (30,'soumyamalgonde2001@gmail.com','soumya_27','$2b$10$VT097rinceliSSVwiSKpG.W41OhftAt64yXicj0cO0bNT9alFoKRy'),(31,'rohit@gmail.com','Rohit','$2b$10$iScwcklD8kiO4ZCCBjkr7OCG.eFA1QeYV.uxCGmRJhxL0xnJb4FYO'),(32,'rishika@gmail.com','RishikaSharma','$2b$10$8Em05pUovYfA4Qazhxdjx.WWmza0y.iQKWFWUx0EY0f5baajWu.UC'),(33,'mujtaba@gmail.com','codingcat','$2b$10$j1ZcUAxR85xbX.2ii4Yn6eZRb4d8/aSUOAX6YJhOkFYVkAXWwJEGu'),(34,'alex.dev@gmail.com','coolAlex','$2b$10$zSvhZHXToLe/zNT3aWSuteHwJPSUyUZTZnmOTi5kDswY9Hiv8YQ6u'),(35,'chandan20@gmail.com','chandan','$2b$10$NUIRD5d/aHIImnklgZWQUO7ddL6vrvxL9dt1dguABpcWp2VgtSmg6'),(36,'ashley27@gmail.com','Ashley11','$2b$10$bahPmgNq0gWyhKmqkyV7IeretSjJXTZknHtgs1c3ZqFOYyVU0rbpy');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `voter` varchar(32) NOT NULL,
  `comment_id` int NOT NULL,
  `is_upvote` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `username_idx` (`voter`),
  KEY `comment_id_idx` (`comment_id`),
  CONSTRAINT `comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `voter` FOREIGN KEY (`voter`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (32,'codingcat',164,1),(34,'coolAlex',164,1),(36,'soumya_27',167,0),(37,'Rohit',170,1),(38,'RishikaSharma',173,1),(39,'soumya_27',174,1),(40,'soumya_27',173,1);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-28 21:59:49
