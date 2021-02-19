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
-- Table structure for table `char_info`
--

DROP TABLE IF EXISTS `char_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `char_info` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `input_date` date NOT NULL,
  `world` int NOT NULL,
  `gname` varchar(32) NOT NULL,
  `position` varchar(16) NOT NULL,
  `name` varchar(32) NOT NULL,
  `class` varchar(45) NOT NULL,
  `lv` varchar(8) NOT NULL,
  `exp` varchar(45) NOT NULL,
  `popularity` varchar(8) NOT NULL,
  `dojang_best_info` varchar(16) NOT NULL,
  `dojang_latest_info` varchar(16) NOT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `idx_UNIQUE` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=870 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `char_info`
--

LOCK TABLES `char_info` WRITE;
/*!40000 ALTER TABLE `char_info` DISABLE KEYS */;
INSERT INTO `char_info` VALUES (548,'2021-02-10',29,'Meca','마스터','RASHOMON','다크나이트','Lv.260','1,934,426,946,110','534','52층','52층'),(549,'2021-02-10',29,'Meca','부마스터','제논s천사','제논','Lv.250','540,325,998,686','3,785','00층','44층'),(550,'2021-02-10',29,'Meca','부마스터','KWJungRoo','나이트워커','Lv.242','161,045,570,580','98','45층','43층'),(551,'2021-02-10',29,'Meca','부마스터','뽀솜잉','비숍','Lv.242','126,913,168,831','188','00층','00층'),(552,'2021-02-10',29,'Meca','부마스터','독다듀블','듀얼블레이더','Lv.240','338,550,430,305','13','49층','49층'),(553,'2021-02-10',29,'Meca','부마스터','아델아랑사','아델','Lv.236','212,547,285,572','46','00층','00층'),(554,'2021-02-10',29,'Meca','부마스터','청악룡','듀얼블레이더','Lv.215','9,108,322,107','45','00층','00층'),(555,'2021-02-10',29,'Meca','부마스터','이쁜이영이26','카인','Lv.207','4,015,313,115','0','00층','00층'),(556,'2021-02-10',29,'Meca','길드원','뮤쿠','엔젤릭버스터','Lv.250','884,181,000,277','191','47층','46층'),(557,'2021-02-10',29,'Meca','길드원','HoWo0','아란','Lv.241','22,252,576,902','53','45층','45층'),(558,'2021-02-10',29,'Meca','길드원','디뇨','아크메이지(썬,콜)','Lv.240','212,164,689,012','436','45층','44층'),(559,'2021-02-10',29,'Meca','길드원','허디우디','아크','Lv.236','142,831,965,979','21','45층','45층'),(560,'2021-02-10',29,'Meca','길드원','ii쟈니ii','루미너스','Lv.233','51,105,318,713','44','00층','00층'),(561,'2021-02-10',29,'Meca','길드원','앨르라기','아델','Lv.233','49,451,054,024','27','38층','38층'),(562,'2021-02-10',29,'Meca','길드원','박즈성','히어로','Lv.232','73,588,615,174','56','37층','37층'),(563,'2021-02-10',29,'Meca','길드원','애기바늘꽃','비숍','Lv.230','55,109,387,816','1,096','00층','06층'),(564,'2021-02-10',29,'Meca','길드원','다예뽀용','데몬어벤져','Lv.227','1,237,384,977','143','00층','00층'),(565,'2021-02-10',29,'Meca','길드원','박즈성2','나이트워커','Lv.226','627,119,194','41','00층','00층'),(566,'2021-02-10',29,'Meca','길드원','라류린트','데몬슬레이어','Lv.225','52,082,247,615','717','29층','19층'),(567,'2021-02-10',29,'Meca','길드원','기울어진호영','호영','Lv.225','438,747,810','0','29층','29층'),(568,'2021-02-10',29,'Meca','길드원','카데나s천사','카데나','Lv.223','53,288,609,740','50','00층','18층'),(569,'2021-02-10',29,'Meca','길드원','정로E','은월','Lv.222','13,469,715,102','357','29층','29층'),(570,'2021-02-10',29,'Meca','길드원','간장건담치킨','메카닉','Lv.220','31,877,097,988','4','39층','39층'),(571,'2021-02-10',29,'Meca','길드원','허브헛개수','비숍','Lv.220','6,848,109,147','4','00층','00층'),(572,'2021-02-10',29,'Meca','길드원','채랑현','은월','Lv.219','2,267,924,625','3','00층','00층'),(573,'2021-02-10',29,'Meca','길드원','악몽의눈','아크','Lv.218','19,591,664,301','14','38층','38층'),(574,'2021-02-10',29,'Meca','길드원','해동듀블','듀얼블레이더','Lv.217','10,043,386,538','0','00층','00층'),(575,'2021-02-10',29,'Meca','길드원','롱비아델','아델','Lv.217','4,246,650,357','0','00층','00층'),(576,'2021-02-10',29,'Meca','길드원','비숍키움돠','비숍','Lv.216','9,504,055,731','14','00층','01층'),(577,'2021-02-10',29,'Meca','길드원','보스는검성','히어로','Lv.215','390,520,374','0','00층','00층'),(578,'2021-02-10',29,'Meca','길드원','눈마','소울마스터','Lv.213','13,293,929,398','15','38층','38층'),(579,'2021-02-10',29,'Meca','길드원','아크s천사','아크','Lv.213','170,493,113','17','00층','08층'),(580,'2021-02-10',29,'Meca','길드원','일리움s천사','일리움','Lv.212','3,613,831,059','15','26층','26층'),(581,'2021-02-10',29,'Meca','길드원','학생연','듀얼블레이더','Lv.211','10,689,504,264','0','00층','00층'),(582,'2021-02-10',29,'Meca','길드원','호랭푸','호영','Lv.211','8,768,792,562','32','00층','00층'),(583,'2021-02-10',29,'Meca','길드원','소마s천사','소울마스터','Lv.211','5,240,620,054','593','29층','29층'),(584,'2021-02-10',29,'Meca','길드원','섀도키움돠','섀도어','Lv.211','4,112,726,766','2','00층','00층'),(585,'2021-02-10',29,'Meca','길드원','로또되면장마','은월','Lv.210','4,376,312,672','0','00층','00층'),(586,'2021-02-10',29,'Meca','길드원','팔라s천사','팔라딘','Lv.210','824,827,013','310','00층','07층'),(587,'2021-02-10',29,'Meca','길드원','두유버블티','히어로','Lv.206','834,219,122','1','00층','00층'),(588,'2021-02-10',29,'Meca','길드원','카드폴','팬텀','Lv.205','1,697,159,325','1','00층','00층'),(589,'2021-02-10',29,'Meca','길드원','소마키움돠','소울마스터','Lv.205','1,330,532,948','0','00층','00층'),(590,'2021-02-10',29,'Meca','길드원','천상의s사랑','아란','Lv.202','25,568,284','321','00층','07층'),(591,'2021-02-10',29,'Meca','길드원','멋쟁이솜이25','소울마스터','Lv.200','224,858,151','1','00층','00층'),(592,'2021-02-10',29,'Meca','길드원','아델키움돠','아델','Lv.200','211,537,228','0','00층','00층'),(593,'2021-02-10',29,'Meca','길드원','간장컬몬치킨','메카닉','Lv.165','38,476,297','-1','00층','00층'),(594,'2021-02-10',29,'Meca','길드원','NPC보안용사','크루세이더','Lv.160','29,482,192','0','00층','00층'),(595,'2021-02-10',29,'Meca','길드원','민님','메르세데스','Lv.253','372,630,900,049','177','45층','45층'),(596,'2021-02-10',29,'Meca','길드원','뛰리','듀얼블레이더','Lv.252','825,317,257,482','169','47층','46층'),(597,'2021-02-10',29,'Meca','길드원','휘빔','아크메이지(불,독)','Lv.251','111,028,538,753','394','49층','46층'),(598,'2021-02-10',29,'Meca','길드원','닉선택어렵다','아크','Lv.250','20,673,644,872','2','47층','47층'),(599,'2021-02-10',29,'Meca','길드원','뎅라','듀얼블레이더','Lv.246','394,584,080,544','117','42층','42층'),(600,'2021-02-10',29,'Meca','길드원','또치는돼지야','비숍','Lv.246','276,695,582,152','56','36층','36층'),(601,'2021-02-10',29,'Meca','길드원','김지김지울랄','아란','Lv.246','102,441,925,656','316','48층','48층'),(602,'2021-02-10',29,'Meca','길드원','느Er리','윈드브레이커','Lv.246','84,871,708,999','120','47층','47층'),(603,'2021-02-10',29,'Meca','길드원','어노씌','비숍','Lv.245','439,266,522,578','233','46층','46층'),(604,'2021-02-10',29,'Meca','길드원','솜서애','아크메이지(썬,콜)','Lv.245','432,505,341,180','96','48층','48층'),(605,'2021-02-10',29,'Meca','길드원','소마p','소울마스터','Lv.245','338,554,587,256','144','46층','46층'),(606,'2021-02-10',29,'Meca','길드원','마스코트e','아델','Lv.245','100,353,506,830','10','41층','41층'),(607,'2021-02-10',29,'Meca','길드원','미주왈','엔젤릭버스터','Lv.244','94,543,530,236','53','47층','47층'),(608,'2021-02-10',29,'Meca','길드원','V루아르V','데몬어벤져','Lv.243','191,933,638,899','41','49층','49층'),(609,'2021-02-10',29,'Meca','길드원','잔악도','아란','Lv.243','63,340,603,139','126','47층','00층'),(610,'2021-02-10',29,'Meca','길드원','뻥쭉','섀도어','Lv.242','187,227,634,346','1,036','47층','47층'),(611,'2021-02-10',29,'Meca','길드원','코노r','패스파인더','Lv.242','123,991,725,273','75','48층','48층'),(612,'2021-02-10',29,'Meca','길드원','주황토끼','아란','Lv.242','84,066,967,622','68','00층','31층'),(613,'2021-02-10',29,'Meca','길드원','츄카뚱','아크메이지(썬,콜)','Lv.240','302,370,906,452','38','33층','33층'),(614,'2021-02-10',29,'Meca','길드원','폭탄부2세','듀얼블레이더','Lv.240','18,860,652,240','93','49층','49층'),(615,'2021-02-10',29,'Meca','길드원','또비또치','다크나이트','Lv.238','104,277,891,192','54','39층','39층'),(616,'2021-02-10',29,'Meca','길드원','아델코리','아델','Lv.236','176,869,244,020','3','46층','46층'),(617,'2021-02-10',29,'Meca','길드원','진화하는꽁','듀얼블레이더','Lv.236','115,762,888,272','128','42층','01층'),(618,'2021-02-10',29,'Meca','길드원','To온비','비숍','Lv.236','95,551,072,579','641','35층','29층'),(619,'2021-02-10',29,'Meca','길드원','나의일기장','보우마스터','Lv.235','160,079,893,138','200','10층','10층'),(620,'2021-02-10',29,'Meca','길드원','느할아배','제논','Lv.235','116,439,296,018','9','44층','41층'),(621,'2021-02-10',29,'Meca','길드원','캄품','아크','Lv.235','39,057,454,287','45','48층','48층'),(622,'2021-02-10',29,'Meca','길드원','너만네번째','메르세데스','Lv.234','106,830,971,819','184','12층','29층'),(623,'2021-02-10',29,'Meca','길드원','이캉만','메르세데스','Lv.234','57,879,418,846','983','44층','44층'),(624,'2021-02-10',29,'Meca','길드원','Black태연','섀도어','Lv.234','14,993,737,727','4','00층','00층'),(625,'2021-02-10',29,'Meca','길드원','검호롱','아델','Lv.233','16,901,910,903','138','40층','40층'),(626,'2021-02-10',29,'Meca','길드원','92guy','듀얼블레이더','Lv.233','14,391,413,352','4','37층','37층'),(627,'2021-02-10',29,'Meca','길드원','이프가그랫대','섀도어','Lv.232','131,074,819,568','3','29층','29층'),(628,'2021-02-10',29,'Meca','길드원','NPC놀이','나이트로드','Lv.232','76,232,034,613','475','10층','10층'),(629,'2021-02-10',29,'Meca','길드원','않대','섀도어','Lv.232','42,505,355,705','10','43층','43층'),(630,'2021-02-10',29,'Meca','길드원','Okidrohan','듀얼블레이더','Lv.232','20,560,704,834','3','41층','41층'),(631,'2021-02-10',29,'Meca','길드원','박혀델','아델','Lv.232','3,954,601,833','118','29층','29층'),(632,'2021-02-10',29,'Meca','길드원','계절제로','제로','Lv.231','76,753,335,557','3,784','00층','00층'),(633,'2021-02-10',29,'Meca','길드원','민셔린','아델','Lv.231','32,432,873,398','227','41층','41층'),(634,'2021-02-10',29,'Meca','길드원','HKTO','아크','Lv.230','140,347,411,750','15','43층','43층'),(635,'2021-02-10',29,'Meca','길드원','해방된오더','아델','Lv.230','95,686,650,171','3','29층','29층'),(636,'2021-02-10',29,'Meca','길드원','Vzel','에반','Lv.229','54,330,340,120','20','38층','38층'),(637,'2021-02-10',29,'Meca','길드원','비숍레우','아크메이지(불,독)','Lv.229','35,850,347,934','30','00층','00층'),(638,'2021-02-10',29,'Meca','길드원','축복로봇','제논','Lv.229','6,383,678,433','4,358','46층','46층'),(639,'2021-02-10',29,'Meca','길드원','소모바사탕','패스파인더','Lv.228','20,139,410,183','11','29층','29층'),(640,'2021-02-10',29,'Meca','길드원','삐여루','배틀메이지','Lv.227','80,550,533,804','23','41층','41층'),(641,'2021-02-10',29,'Meca','길드원','민셔륑','팬텀','Lv.227','24,460,165','105','40층','40층'),(642,'2021-02-10',29,'Meca','길드원','앵무둘','데몬어벤져','Lv.226','42,566,023,557','24','45층','45층'),(643,'2021-02-10',29,'Meca','길드원','엥무델','아델','Lv.226','13,681,923,615','15','00층','00층'),(644,'2021-02-10',29,'Meca','길드원','사지분해예정','카인','Lv.225','66,445,719,434','0','43층','43층'),(645,'2021-02-10',29,'Meca','길드원','철갑아델형아','아델','Lv.223','29,086,917,002','19','29층','29층'),(646,'2021-02-10',29,'Meca','길드원','키사메베프','스트라이커','Lv.223','14,548,867,056','15','00층','00층'),(647,'2021-02-10',29,'Meca','길드원','츄독','윈드브레이커','Lv.222','49,141,866,036','7','00층','00층'),(648,'2021-02-10',29,'Meca','길드원','옥슬병크','아크','Lv.222','26,114,642,341','3','38층','38층'),(649,'2021-02-10',29,'Meca','길드원','보우는숍','비숍','Lv.222','892,267,094','87','00층','00층'),(650,'2021-02-10',29,'Meca','길드원','꼬마여제은월','은월','Lv.220','42,504,392,361','84','00층','00층'),(651,'2021-02-10',29,'Meca','길드원','soultreeee','은월','Lv.220','25,049,912,572','1','00층','00층'),(652,'2021-02-10',29,'Meca','길드원','호우윔','윈드브레이커','Lv.220','16,244,345,297','0','00층','00층'),(653,'2021-02-10',29,'Meca','길드원','보라색맛두유','듀얼블레이더','Lv.218','21,148,908,814','24','35층','35층'),(654,'2021-02-10',29,'Meca','길드원','반레우','에반','Lv.216','3,409,441','1','43층','43층'),(655,'2021-02-10',29,'Meca','길드원','두어머유','아크메이지(썬,콜)','Lv.215','9,735,515,675','68','31층','31층'),(656,'2021-02-10',29,'Meca','길드원','이캉만1','팬텀','Lv.215','8,374,805,901','2','00층','29층'),(657,'2021-02-10',29,'Meca','길드원','늘콕','나이트로드','Lv.215','4,461,121,502','53','12층','19층'),(658,'2021-02-10',29,'Meca','길드원','또비는우에엥','은월','Lv.215','2,287,509,079','2','00층','00층'),(659,'2021-02-10',29,'Meca','길드원','철갑제논캡','제논','Lv.214','11,960,232,355','38','00층','00층'),(660,'2021-02-10',29,'Meca','길드원','듀블철갑삼촌','듀얼블레이더','Lv.213','2,248,403,874','18','00층','00층'),(661,'2021-02-10',29,'Meca','길드원','WARRIORchamp','아델','Lv.210','8,355,312,339','1','19층','19층'),(662,'2021-02-10',29,'Meca','길드원','쁑쭉','아크메이지(불,독)','Lv.205','2,374,398,927','2','00층','00층'),(663,'2021-02-10',29,'Meca','길드원','여신시니','메르세데스','Lv.204','2,660,535,159','209','00층','00층'),(664,'2021-02-10',29,'Meca','길드원','은정이발바닥','아크메이지(썬,콜)','Lv.203','2,602,352,942','43','00층','00층'),(665,'2021-02-10',29,'Meca','길드원','왕비아리아','팬텀','Lv.202','1,406,812,785','203','00층','00층'),(666,'2021-02-10',29,'Meca','길드원','빙하은','호영','Lv.220','31,428,084,471','0','00층','00층'),(667,'2021-02-10',29,'Meca','길드원','선재환','아델','Lv.220','263,178,894','3','00층','00층'),(668,'2021-02-10',29,'Meca','길드원','하앙루미','루미너스','Lv.215','14,630,486,869','0','00층','00층'),(669,'2021-02-10',29,'Meca','길드원','또비냥냥','듀얼블레이더','Lv.211','81,854,308','0','00층','00층'),(670,'2021-02-10',29,'Meca','길드원','호우그','플레임위자드','Lv.211','39,987,755','0','00층','00층'),(671,'2021-02-10',29,'Meca','길드원','펑쭉','아델','Lv.210','2,474,600,524','0','00층','00층'),(672,'2021-02-10',29,'Meca','길드원','맹꼬요','윈드브레이커','Lv.210','329,372,831','2','00층','00층'),(673,'2021-02-10',29,'Meca','길드원','칸티로','카이저','Lv.204','1,728,390,695','0','00층','00층'),(674,'2021-02-10',29,'Meca','길드원','치우렐','아델','Lv.202','2,388,593,917','0','00층','00층'),(675,'2021-02-10',29,'Meca','길드원','이든노예','배틀메이지','Lv.201','137,623,706','0','00층','00층'),(676,'2021-02-10',29,'Meca','길드원','무무검성','윈드브레이커','Lv.201','49,513,621','0','00층','00층'),(677,'2021-02-10',29,'Meca','길드원','암산20','엔젤릭버스터','Lv.200','23,837,352','1','00층','00층'),(678,'2021-02-10',29,'Meca','길드원','의칠','데몬어벤져','Lv.200','16,968,499','0','00층','00층'),(679,'2021-02-10',29,'Meca','길드원','산수20','엔젤릭버스터','Lv.200','13,477,466','0','00층','00층'),(680,'2021-02-10',29,'Meca','길드원','시니전용제로','제로','Lv.200','11,137,182','0','00층','00층'),(681,'2021-02-10',29,'Meca','길드원','암산10','엔젤릭버스터','Lv.193','327,253,596','1','00층','00층'),(682,'2021-02-10',29,'Meca','길드원','산수10','엔젤릭버스터','Lv.190','246,656,769','0','00층','00층'),(683,'2021-02-10',29,'Meca','길드원','와소다','미하일','Lv.190','15,935,362','0','00층','00층'),(684,'2021-02-10',29,'Meca','길드원','와헌테라0129','와일드헌터','Lv.184','147,116,817','0','00층','00층'),(685,'2021-02-10',29,'Meca','길드원','Link윈브9','윈드브레이커','Lv.176','116,127,422','0','00층','00층'),(686,'2021-02-10',29,'Meca','길드원','효둑','팬텀','Lv.171','32,510,072','1','00층','00층'),(687,'2021-02-10',29,'Meca','길드원','지해심조','엔젤릭버스터','Lv.167','104,777,410','0','00층','00층'),(688,'2021-02-10',29,'Meca','길드원','블래키움돠','블래스터','Lv.145','12,788,864','0','00층','00층'),(689,'2021-02-10',29,'Meca','길드원','나워210202','나이트워커','Lv.133','3,477,243','0','00층','00층'),(690,'2021-02-10',29,'Meca','마스터','RASHOMON','다크나이트','Lv.260','1,934,426,946,110','534','52층','52층'),(691,'2021-02-10',29,'Meca','부마스터','제논s천사','제논','Lv.250','540,325,998,686','3,785','00층','44층'),(692,'2021-02-10',29,'Meca','부마스터','KWJungRoo','나이트워커','Lv.242','161,045,570,580','98','45층','43층'),(693,'2021-02-10',29,'Meca','부마스터','뽀솜잉','비숍','Lv.242','126,913,168,831','188','00층','00층'),(694,'2021-02-10',29,'Meca','부마스터','독다듀블','듀얼블레이더','Lv.240','338,550,430,305','13','49층','49층'),(695,'2021-02-10',29,'Meca','부마스터','아델아랑사','아델','Lv.236','212,547,285,572','46','00층','00층'),(696,'2021-02-10',29,'Meca','부마스터','청악룡','듀얼블레이더','Lv.215','9,108,322,107','45','00층','00층'),(697,'2021-02-10',29,'Meca','부마스터','이쁜이영이26','카인','Lv.207','4,015,313,115','0','00층','00층'),(698,'2021-02-10',29,'Meca','길드원','뮤쿠','엔젤릭버스터','Lv.250','884,181,000,277','191','47층','46층'),(699,'2021-02-10',29,'Meca','길드원','HoWo0','아란','Lv.241','22,252,576,902','53','45층','45층'),(700,'2021-02-10',29,'Meca','길드원','디뇨','아크메이지(썬,콜)','Lv.240','212,164,689,012','436','45층','44층'),(701,'2021-02-10',29,'Meca','길드원','허디우디','아크','Lv.236','142,831,965,979','21','45층','45층'),(702,'2021-02-10',29,'Meca','길드원','ii쟈니ii','루미너스','Lv.233','51,105,318,713','44','00층','00층'),(703,'2021-02-10',29,'Meca','길드원','앨르라기','아델','Lv.233','49,451,054,024','27','38층','38층'),(704,'2021-02-10',29,'Meca','길드원','박즈성','히어로','Lv.232','73,588,615,174','56','37층','37층'),(705,'2021-02-10',29,'Meca','길드원','애기바늘꽃','비숍','Lv.230','55,109,387,816','1,096','00층','06층'),(706,'2021-02-10',29,'Meca','길드원','다예뽀용','데몬어벤져','Lv.227','1,237,384,977','143','00층','00층'),(707,'2021-02-10',29,'Meca','길드원','박즈성2','나이트워커','Lv.226','627,119,194','41','00층','00층'),(708,'2021-02-10',29,'Meca','길드원','라류린트','데몬슬레이어','Lv.225','52,082,247,615','717','29층','19층'),(709,'2021-02-10',29,'Meca','길드원','기울어진호영','호영','Lv.225','438,747,810','0','29층','29층'),(710,'2021-02-10',29,'Meca','길드원','카데나s천사','카데나','Lv.223','53,288,609,740','50','00층','18층'),(711,'2021-02-10',29,'Meca','길드원','정로E','은월','Lv.222','13,469,715,102','357','29층','29층'),(712,'2021-02-10',29,'Meca','길드원','간장건담치킨','메카닉','Lv.220','31,877,097,988','4','39층','39층'),(713,'2021-02-10',29,'Meca','길드원','허브헛개수','비숍','Lv.220','6,848,109,147','4','00층','00층'),(714,'2021-02-10',29,'Meca','길드원','채랑현','은월','Lv.219','2,267,924,625','3','00층','00층'),(715,'2021-02-10',29,'Meca','길드원','악몽의눈','아크','Lv.218','19,591,664,301','14','38층','38층'),(716,'2021-02-10',29,'Meca','길드원','해동듀블','듀얼블레이더','Lv.217','10,043,386,538','0','00층','00층'),(717,'2021-02-10',29,'Meca','길드원','롱비아델','아델','Lv.217','4,246,650,357','0','00층','00층'),(718,'2021-02-10',29,'Meca','길드원','비숍키움돠','비숍','Lv.216','9,504,055,731','14','00층','01층'),(719,'2021-02-10',29,'Meca','길드원','보스는검성','히어로','Lv.215','390,520,374','0','00층','00층'),(720,'2021-02-10',29,'Meca','길드원','눈마','소울마스터','Lv.213','13,293,929,398','15','38층','38층'),(721,'2021-02-10',29,'Meca','길드원','아크s천사','아크','Lv.213','170,493,113','17','00층','08층'),(722,'2021-02-10',29,'Meca','길드원','일리움s천사','일리움','Lv.212','3,613,831,059','15','26층','26층'),(723,'2021-02-10',29,'Meca','길드원','학생연','듀얼블레이더','Lv.211','10,689,504,264','0','00층','00층'),(724,'2021-02-10',29,'Meca','길드원','호랭푸','호영','Lv.211','8,768,792,562','32','00층','00층'),(725,'2021-02-10',29,'Meca','길드원','소마s천사','소울마스터','Lv.211','5,240,620,054','593','29층','29층'),(726,'2021-02-10',29,'Meca','길드원','섀도키움돠','섀도어','Lv.211','4,112,726,766','2','00층','00층'),(727,'2021-02-10',29,'Meca','길드원','로또되면장마','은월','Lv.210','4,376,312,672','0','00층','00층'),(728,'2021-02-10',29,'Meca','길드원','팔라s천사','팔라딘','Lv.210','824,827,013','310','00층','07층'),(729,'2021-02-10',29,'Meca','길드원','두유버블티','히어로','Lv.206','834,219,122','1','00층','00층'),(730,'2021-02-10',29,'Meca','길드원','카드폴','팬텀','Lv.205','1,697,159,325','1','00층','00층'),(731,'2021-02-10',29,'Meca','길드원','소마키움돠','소울마스터','Lv.205','1,330,532,948','0','00층','00층'),(732,'2021-02-10',29,'Meca','길드원','천상의s사랑','아란','Lv.202','25,568,284','321','00층','07층'),(733,'2021-02-10',29,'Meca','길드원','멋쟁이솜이25','소울마스터','Lv.200','224,858,151','1','00층','00층'),(734,'2021-02-10',29,'Meca','길드원','아델키움돠','아델','Lv.200','211,537,228','0','00층','00층'),(735,'2021-02-10',29,'Meca','길드원','간장컬몬치킨','메카닉','Lv.165','38,476,297','-1','00층','00층'),(736,'2021-02-10',29,'Meca','길드원','NPC보안용사','크루세이더','Lv.160','29,482,192','0','00층','00층'),(737,'2021-02-10',29,'Meca','길드원','민님','메르세데스','Lv.253','372,630,900,049','177','45층','45층'),(738,'2021-02-10',29,'Meca','길드원','뛰리','듀얼블레이더','Lv.252','825,317,257,482','169','47층','46층'),(739,'2021-02-10',29,'Meca','길드원','휘빔','아크메이지(불,독)','Lv.251','111,028,538,753','394','49층','46층'),(740,'2021-02-10',29,'Meca','길드원','닉선택어렵다','아크','Lv.250','20,673,644,872','2','47층','47층'),(741,'2021-02-10',29,'Meca','길드원','뎅라','듀얼블레이더','Lv.246','394,584,080,544','117','42층','42층'),(742,'2021-02-10',29,'Meca','길드원','또치는돼지야','비숍','Lv.246','276,695,582,152','56','36층','36층'),(743,'2021-02-10',29,'Meca','길드원','김지김지울랄','아란','Lv.246','102,441,925,656','316','48층','48층'),(744,'2021-02-10',29,'Meca','길드원','느Er리','윈드브레이커','Lv.246','84,871,708,999','120','47층','47층'),(745,'2021-02-10',29,'Meca','길드원','어노씌','비숍','Lv.245','439,266,522,578','233','46층','46층'),(746,'2021-02-10',29,'Meca','길드원','솜서애','아크메이지(썬,콜)','Lv.245','432,505,341,180','96','48층','48층'),(747,'2021-02-10',29,'Meca','길드원','소마p','소울마스터','Lv.245','338,554,587,256','144','46층','46층'),(748,'2021-02-10',29,'Meca','길드원','마스코트e','아델','Lv.245','100,353,506,830','10','41층','41층'),(749,'2021-02-10',29,'Meca','길드원','미주왈','엔젤릭버스터','Lv.244','94,543,530,236','53','47층','47층'),(750,'2021-02-10',29,'Meca','길드원','V루아르V','데몬어벤져','Lv.243','191,933,638,899','41','49층','49층'),(751,'2021-02-10',29,'Meca','길드원','잔악도','아란','Lv.243','63,340,603,139','126','47층','00층'),(752,'2021-02-10',29,'Meca','길드원','뻥쭉','섀도어','Lv.242','187,227,634,346','1,036','47층','47층'),(753,'2021-02-10',29,'Meca','길드원','코노r','패스파인더','Lv.242','123,991,725,273','75','48층','48층'),(754,'2021-02-10',29,'Meca','길드원','주황토끼','아란','Lv.242','84,066,967,622','68','00층','31층'),(755,'2021-02-10',29,'Meca','길드원','츄카뚱','아크메이지(썬,콜)','Lv.240','302,370,906,452','38','33층','33층'),(756,'2021-02-10',29,'Meca','길드원','폭탄부2세','듀얼블레이더','Lv.240','18,860,652,240','93','49층','49층'),(757,'2021-02-10',29,'Meca','길드원','또비또치','다크나이트','Lv.238','104,277,891,192','54','39층','39층'),(758,'2021-02-10',29,'Meca','길드원','아델코리','아델','Lv.236','176,869,244,020','3','46층','46층'),(759,'2021-02-10',29,'Meca','길드원','진화하는꽁','듀얼블레이더','Lv.236','115,762,888,272','128','42층','01층'),(760,'2021-02-10',29,'Meca','길드원','To온비','비숍','Lv.236','95,551,072,579','641','35층','29층'),(761,'2021-02-10',29,'Meca','길드원','나의일기장','보우마스터','Lv.235','160,079,893,138','200','10층','10층'),(762,'2021-02-10',29,'Meca','길드원','느할아배','제논','Lv.235','116,439,296,018','9','44층','41층'),(763,'2021-02-10',29,'Meca','길드원','캄품','아크','Lv.235','39,057,454,287','45','48층','48층'),(764,'2021-02-10',29,'Meca','길드원','너만네번째','메르세데스','Lv.234','106,830,971,819','184','12층','29층'),(765,'2021-02-10',29,'Meca','길드원','이캉만','메르세데스','Lv.234','57,879,418,846','983','44층','44층'),(766,'2021-02-10',29,'Meca','길드원','Black태연','섀도어','Lv.234','14,993,737,727','4','00층','00층'),(767,'2021-02-10',29,'Meca','길드원','검호롱','아델','Lv.233','16,901,910,903','138','40층','40층'),(768,'2021-02-10',29,'Meca','길드원','92guy','듀얼블레이더','Lv.233','14,391,413,352','4','37층','37층'),(769,'2021-02-10',29,'Meca','길드원','이프가그랫대','섀도어','Lv.232','131,074,819,568','3','29층','29층'),(770,'2021-02-10',29,'Meca','길드원','NPC놀이','나이트로드','Lv.232','76,232,034,613','475','10층','10층'),(771,'2021-02-10',29,'Meca','길드원','않대','섀도어','Lv.232','42,505,355,705','10','43층','43층'),(772,'2021-02-10',29,'Meca','길드원','Okidrohan','듀얼블레이더','Lv.232','20,560,704,834','3','41층','41층'),(773,'2021-02-10',29,'Meca','길드원','박혀델','아델','Lv.232','3,954,601,833','118','29층','29층'),(774,'2021-02-10',29,'Meca','길드원','계절제로','제로','Lv.231','76,753,335,557','3,784','00층','00층'),(775,'2021-02-10',29,'Meca','길드원','민셔린','아델','Lv.231','32,432,873,398','227','41층','41층'),(776,'2021-02-10',29,'Meca','길드원','HKTO','아크','Lv.230','140,347,411,750','15','43층','43층'),(777,'2021-02-10',29,'Meca','길드원','해방된오더','아델','Lv.230','95,686,650,171','3','29층','29층'),(778,'2021-02-10',29,'Meca','길드원','Vzel','에반','Lv.229','54,330,340,120','20','38층','38층'),(779,'2021-02-10',29,'Meca','길드원','비숍레우','아크메이지(불,독)','Lv.229','35,850,347,934','30','00층','00층'),(780,'2021-02-10',29,'Meca','길드원','축복로봇','제논','Lv.229','6,383,678,433','4,358','46층','46층'),(781,'2021-02-10',29,'Meca','길드원','소모바사탕','패스파인더','Lv.228','20,139,410,183','11','29층','29층'),(782,'2021-02-10',29,'Meca','길드원','삐여루','배틀메이지','Lv.227','80,550,533,804','23','41층','41층'),(783,'2021-02-10',29,'Meca','길드원','민셔륑','팬텀','Lv.227','24,460,165','105','40층','40층'),(784,'2021-02-10',29,'Meca','길드원','앵무둘','데몬어벤져','Lv.226','42,566,023,557','24','45층','45층'),(785,'2021-02-10',29,'Meca','길드원','엥무델','아델','Lv.226','13,681,923,615','15','00층','00층'),(786,'2021-02-10',29,'Meca','길드원','사지분해예정','카인','Lv.225','66,445,719,434','0','43층','43층'),(787,'2021-02-10',29,'Meca','길드원','철갑아델형아','아델','Lv.223','29,086,917,002','19','29층','29층'),(788,'2021-02-10',29,'Meca','길드원','키사메베프','스트라이커','Lv.223','14,548,867,056','15','00층','00층'),(789,'2021-02-10',29,'Meca','길드원','츄독','윈드브레이커','Lv.222','49,141,866,036','7','00층','00층'),(790,'2021-02-10',29,'Meca','길드원','옥슬병크','아크','Lv.222','26,114,642,341','3','38층','38층'),(791,'2021-02-10',29,'Meca','길드원','보우는숍','비숍','Lv.222','892,267,094','87','00층','00층'),(792,'2021-02-10',29,'Meca','길드원','꼬마여제은월','은월','Lv.220','42,504,392,361','84','00층','00층'),(793,'2021-02-10',29,'Meca','길드원','soultreeee','은월','Lv.220','25,049,912,572','1','00층','00층'),(794,'2021-02-10',29,'Meca','길드원','호우윔','윈드브레이커','Lv.220','16,244,345,297','0','00층','00층'),(795,'2021-02-10',29,'Meca','길드원','보라색맛두유','듀얼블레이더','Lv.218','21,148,908,814','24','35층','35층'),(796,'2021-02-10',29,'Meca','길드원','반레우','에반','Lv.216','3,409,441','1','43층','43층'),(797,'2021-02-10',29,'Meca','길드원','두어머유','아크메이지(썬,콜)','Lv.215','9,735,515,675','68','31층','31층'),(798,'2021-02-10',29,'Meca','길드원','이캉만1','팬텀','Lv.215','8,374,805,901','2','00층','29층'),(799,'2021-02-10',29,'Meca','길드원','늘콕','나이트로드','Lv.215','4,461,121,502','53','12층','19층'),(800,'2021-02-10',29,'Meca','길드원','또비는우에엥','은월','Lv.215','2,287,509,079','2','00층','00층'),(801,'2021-02-10',29,'Meca','길드원','철갑제논캡','제논','Lv.214','11,960,232,355','38','00층','00층'),(802,'2021-02-10',29,'Meca','길드원','듀블철갑삼촌','듀얼블레이더','Lv.213','2,248,403,874','18','00층','00층'),(803,'2021-02-10',29,'Meca','길드원','WARRIORchamp','아델','Lv.210','8,355,312,339','1','19층','19층'),(804,'2021-02-10',29,'Meca','길드원','쁑쭉','아크메이지(불,독)','Lv.205','2,374,398,927','2','00층','00층'),(805,'2021-02-10',29,'Meca','길드원','여신시니','메르세데스','Lv.204','2,660,535,159','209','00층','00층'),(806,'2021-02-10',29,'Meca','길드원','은정이발바닥','아크메이지(썬,콜)','Lv.203','2,602,352,942','43','00층','00층'),(807,'2021-02-10',29,'Meca','길드원','왕비아리아','팬텀','Lv.202','1,406,812,785','203','00층','00층'),(808,'2021-02-10',29,'Meca','길드원','빙하은','호영','Lv.220','31,428,084,471','0','00층','00층'),(809,'2021-02-10',29,'Meca','길드원','선재환','아델','Lv.220','263,178,894','3','00층','00층'),(810,'2021-02-10',29,'Meca','길드원','하앙루미','루미너스','Lv.215','14,630,486,869','0','00층','00층'),(811,'2021-02-10',29,'Meca','길드원','또비냥냥','듀얼블레이더','Lv.211','81,854,308','0','00층','00층'),(812,'2021-02-10',29,'Meca','길드원','호우그','플레임위자드','Lv.211','39,987,755','0','00층','00층'),(813,'2021-02-10',29,'Meca','길드원','펑쭉','아델','Lv.210','2,474,600,524','0','00층','00층'),(814,'2021-02-10',29,'Meca','길드원','맹꼬요','윈드브레이커','Lv.210','329,372,831','2','00층','00층'),(815,'2021-02-10',29,'Meca','길드원','칸티로','카이저','Lv.204','1,728,390,695','0','00층','00층'),(816,'2021-02-10',29,'Meca','길드원','치우렐','아델','Lv.202','2,388,593,917','0','00층','00층'),(817,'2021-02-10',29,'Meca','길드원','이든노예','배틀메이지','Lv.201','137,623,706','0','00층','00층'),(818,'2021-02-10',29,'Meca','길드원','무무검성','윈드브레이커','Lv.201','49,513,621','0','00층','00층'),(819,'2021-02-10',29,'Meca','길드원','암산20','엔젤릭버스터','Lv.200','23,837,352','1','00층','00층'),(820,'2021-02-10',29,'Meca','길드원','의칠','데몬어벤져','Lv.200','16,968,499','0','00층','00층'),(821,'2021-02-10',29,'Meca','길드원','산수20','엔젤릭버스터','Lv.200','13,477,466','0','00층','00층'),(822,'2021-02-10',29,'Meca','길드원','시니전용제로','제로','Lv.200','11,137,182','0','00층','00층'),(823,'2021-02-10',29,'Meca','길드원','암산10','엔젤릭버스터','Lv.193','327,253,596','1','00층','00층'),(824,'2021-02-10',29,'Meca','길드원','산수10','엔젤릭버스터','Lv.190','246,656,769','0','00층','00층'),(825,'2021-02-10',29,'Meca','길드원','와소다','미하일','Lv.190','15,935,362','0','00층','00층'),(826,'2021-02-10',29,'Meca','길드원','와헌테라0129','와일드헌터','Lv.184','147,116,817','0','00층','00층'),(827,'2021-02-10',29,'Meca','길드원','Link윈브9','윈드브레이커','Lv.176','116,127,422','0','00층','00층'),(828,'2021-02-10',29,'Meca','길드원','효둑','팬텀','Lv.171','32,510,072','1','00층','00층'),(829,'2021-02-10',29,'Meca','길드원','지해심조','엔젤릭버스터','Lv.167','104,777,410','0','00층','00층'),(830,'2021-02-10',29,'Meca','길드원','블래키움돠','블래스터','Lv.145','12,788,864','0','00층','00층'),(831,'2021-02-10',29,'Meca','길드원','나워210202','나이트워커','Lv.133','3,477,243','0','00층','00층'),(832,'2021-02-17',29,'Lune','마스터','라쇼님','듀얼블레이더','Lv.261','1,399,869,879,094','59','00층','00층'),(833,'2021-02-17',29,'Lune','부마스터','롱비','아크메이지(불,독)','Lv.261','2,717,386,389,532','261','56층','55층'),(834,'2021-02-17',29,'Lune','부마스터','듐닌','듀얼블레이더','Lv.254','1,213,221,407,291','43','53층','53층'),(835,'2021-02-17',29,'Lune','부마스터','R정로','데몬슬레이어','Lv.253','679,952,470,146','7,178','48층','47층'),(836,'2021-02-17',29,'Lune','부마스터','무무갬성','섀도어','Lv.251','491,128,706,962','49','49층','49층'),(837,'2021-02-17',29,'Lune','부마스터','쁘나델','아델','Lv.246','82,171,949,647','181','12층','00층'),(838,'2021-02-17',29,'Lune','부마스터','레프폴','일리움','Lv.233','11,245,588,593','104','38층','38층'),(839,'2021-02-17',29,'Lune','길드원','성녀의이야기','아크메이지(썬,콜)','Lv.265','1,916,780,010,447','140','50층','50층'),(840,'2021-02-17',29,'Lune','길드원','해동카이저','카이저','Lv.263','280,601,351,157','5,944','50층','50층'),(841,'2021-02-17',29,'Lune','길드원','간장간장치킨','아란','Lv.257','481,359,634,171','777','48층','48층'),(842,'2021-02-17',29,'Lune','길드원','Diggin','보우마스터','Lv.256','3,332,004,254','14,252','54층','52층'),(843,'2021-02-17',29,'Lune','길드원','천사추v','엔젤릭버스터','Lv.255','650,669,223,549','955','00층','00층'),(844,'2021-02-17',29,'Lune','길드원','계절계절','제로','Lv.254','401,402,672,156','4,400','52층','51층'),(845,'2021-02-17',29,'Lune','길드원','허렵','엔젤릭버스터','Lv.253','452,773,672,395','-16,699','00층','00층'),(846,'2021-02-17',29,'Lune','길드원','츄신','와일드헌터','Lv.251','917,014,156,525','216','00층','44층'),(847,'2021-02-17',29,'Lune','길드원','나쁜암떼시','아란','Lv.250','813,413,780,804','35','49층','49층'),(848,'2021-02-17',29,'Lune','길드원','키우는중임돠','데몬슬레이어','Lv.245','333,247,366,037','181','47층','47층'),(849,'2021-02-17',29,'Lune','길드원','단풍잎경찰관','제로','Lv.245','186,635,139,694','3,771','40층','40층'),(850,'2021-02-17',29,'Lune','길드원','박주성9','패스파인더','Lv.245','37,741,435,998','35','47층','45층'),(851,'2021-02-17',29,'Lune','길드원','에이스콜리','윈드브레이커','Lv.244','280,172,871,090','274','00층','00층'),(852,'2021-02-17',29,'Lune','길드원','로또되면검마','아크','Lv.243','339,051,324,385','22','47층','47층'),(853,'2021-02-17',29,'Lune','길드원','좋은날을','팬텀','Lv.243','51,896,150,726','1,559','47층','47층'),(854,'2021-02-17',29,'Lune','길드원','정아역','나이트워커','Lv.242','132,138,356,776','67','49층','49층'),(855,'2021-02-17',29,'Lune','길드원','보스는파인더','패스파인더','Lv.240','342,504,646,131','71','40층','40층'),(856,'2021-02-17',29,'Lune','길드원','은정짱','다크나이트','Lv.240','254,541,302,326','419','49층','49층'),(857,'2021-02-17',29,'Lune','길드원','시묫','윈드브레이커','Lv.238','29,437,984,261','28','43층','43층'),(858,'2021-02-17',29,'Lune','길드원','호우넬','아델','Lv.236','185,070,357,015','7','48층','48층'),(859,'2021-02-17',29,'Lune','길드원','눈까리파삘라','듀얼블레이더','Lv.230','66,855,689,396','1,120','46층','46층'),(860,'2021-02-17',29,'Lune','길드원','논춘','아델','Lv.230','17,601,425,454','28','44층','44층'),(861,'2021-02-17',29,'Lune','길드원','채랑푸','아델','Lv.229','26,450,074','88','00층','00층'),(862,'2021-02-17',29,'Lune','길드원','전사사','히어로','Lv.227','5,468,029,375','0','00층','00층'),(863,'2021-02-17',29,'Lune','길드원','프리s천사','비숍','Lv.225','34,623,085,352','818','00층','16층'),(864,'2021-02-17',29,'Lune','길드원','베에에에','은월','Lv.223','43,383,990,155','20','40층','40층'),(865,'2021-02-17',29,'Lune','길드원','LBSGERRN','아크','Lv.223','6,515,959,160','9','29층','29층'),(866,'2021-02-17',29,'Lune','길드원','뮤쿠','엔젤릭버스터','Lv.250','951,438,086,715','192','47층','46층'),(867,'2021-02-17',29,'Lune','길드원','Q투컴비숍Q','비숍','Lv.245','347,228,531,852','1,054','40층','40층'),(868,'2021-02-17',29,'Lune','길드원','독다듀블','듀얼블레이더','Lv.241','253,136,123,745','14','49층','49층'),(869,'2021-02-17',29,'Lune','길드원','에인셀','배틀메이지','Lv.203','2,136,856,921','2','00층','00층');
/*!40000 ALTER TABLE `char_info` ENABLE KEYS */;
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
