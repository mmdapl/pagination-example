/*
 Navicat MySQL Data Transfer

 Source Server         : 服务器
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : 142vip.cn:3306
 Source Schema         : pagination_test

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 08/07/2019 11:37:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_score_info
-- ----------------------------
DROP TABLE IF EXISTS `tbl_score_info`;
CREATE TABLE `tbl_score_info`  (
  `id` bigint(20) NOT NULL COMMENT '成绩ID，主键',
  `subject_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学科名称',
  `subject_score` int(255) NOT NULL COMMENT '成绩得分',
  `stu_id` bigint(20) NOT NULL COMMENT '学生ID，tbl_stu_info表的外键',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tbl_stu_info
-- ----------------------------
DROP TABLE IF EXISTS `tbl_stu_info`;
CREATE TABLE `tbl_stu_info`  (
  `sut_id` bigint(20) NOT NULL COMMENT '学生ID',
  `stu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '学生姓名',
  PRIMARY KEY (`sut_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
