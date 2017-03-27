/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50635
Source Host           : localhost:3306
Source Database       : node-cms

Target Server Type    : MYSQL
Target Server Version : 50635
File Encoding         : 65001

Date: 2017-03-27 20:00:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Uid` varchar(36) NOT NULL COMMENT '用户UID',
  `UserName` varchar(32) NOT NULL COMMENT '用户名',
  `Password` varchar(64) NOT NULL COMMENT '密码',
  `Salt` varchar(36) DEFAULT NULL COMMENT '加密盐',
  `Email` varchar(32) DEFAULT NULL COMMENT '邮箱号码',
  `Mobile` varchar(15) DEFAULT NULL COMMENT '手机号码',
  `RegIP` varchar(20) DEFAULT NULL COMMENT '注册IP',
  `RegTime` varchar(20) DEFAULT NULL COMMENT '注册时间',
  `UpdateTime` varchar(20) DEFAULT NULL COMMENT '更新时间',
  `Status` enum('OFF','ON') DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Uid` (`Uid`) USING BTREE,
  UNIQUE KEY `UserName` (`UserName`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
