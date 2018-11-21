/*
 Navicat SQLite Data Transfer

 Source Server         : test
 Source Server Type    : SQLite
 Source Server Version : 3012001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3012001
 File Encoding         : 65001

 Date: 17/11/2018 22:52:17
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for algorithm
-- ----------------------------
DROP TABLE IF EXISTS "algorithm";
CREATE TABLE "algorithm" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text(255) NOT NULL,
  "version_number" integer(11) NOT NULL DEFAULT 1,
  "description" blob,
  "state_id_start" integer(11) NOT NULL,
  CONSTRAINT "fk_1" FOREIGN KEY ("state_id_start") REFERENCES "state" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS "question";
CREATE TABLE "question" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "question" blob NOT NULL
);

-- ----------------------------
-- Table structure for question_option
-- ----------------------------
DROP TABLE IF EXISTS "question_option";
CREATE TABLE "question_option" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "value" text(255) NOT NULL,
  "is_good" integer(1) NOT NULL DEFAULT 0,
  "question_id" integer(11) NOT NULL,
  CONSTRAINT "fk_1" FOREIGN KEY ("question_id") REFERENCES "question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- ----------------------------
-- Table structure for recommendation
-- ----------------------------
DROP TABLE IF EXISTS "recommendation";
CREATE TABLE "recommendation" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" blob NOT NULL,
  "description" blob
);

-- ----------------------------
-- Table structure for state
-- ----------------------------
DROP TABLE IF EXISTS "state";
CREATE TABLE "state" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "state_id_next_good" integer(11) NOT NULL,
  "state_id_next_bad" integer(11) NOT NULL,
  CONSTRAINT "fk_1" FOREIGN KEY ("state_id_next_good") REFERENCES "state" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "fk_2" FOREIGN KEY ("state_id_next_bad") REFERENCES "state" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- ----------------------------
-- Table structure for state_question
-- ----------------------------
DROP TABLE IF EXISTS "state_question";
CREATE TABLE "state_question" (
  "state_id" integer(11) NOT NULL,
  "question_id" integer(11) NOT NULL,
  CONSTRAINT "fk1" FOREIGN KEY ("state_id") REFERENCES "state" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk2" FOREIGN KEY ("question_id") REFERENCES "question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- ----------------------------
-- Table structure for state_recommendation
-- ----------------------------
DROP TABLE IF EXISTS "state_recommendation";
CREATE TABLE "state_recommendation" (
  "state_id" integer(11) NOT NULL,
  "recommendation_id" integer(11) NOT NULL,
  CONSTRAINT "fk1" FOREIGN KEY ("state_id") REFERENCES "state" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "fk2" FOREIGN KEY ("recommendation_id") REFERENCES "recommendation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- ----------------------------
-- Auto increment value for algorithm
-- ----------------------------

-- ----------------------------
-- Auto increment value for question
-- ----------------------------

-- ----------------------------
-- Indexes structure for table question
-- ----------------------------
CREATE UNIQUE INDEX "main"."question_index_1"
ON "question" (
  "id" COLLATE NOCASE ASC
);

-- ----------------------------
-- Auto increment value for question_option
-- ----------------------------

-- ----------------------------
-- Indexes structure for table question_option
-- ----------------------------
CREATE UNIQUE INDEX "main"."question_option_index_1"
ON "question_option" (
  "id" COLLATE NOCASE ASC
);
CREATE INDEX "main"."question_option_index_2"
ON "question_option" (
  "question_id" COLLATE NOCASE ASC
);

-- ----------------------------
-- Auto increment value for recommendation
-- ----------------------------

-- ----------------------------
-- Indexes structure for table recommendation
-- ----------------------------
CREATE UNIQUE INDEX "main"."recommendation_index_1"
ON "recommendation" (
  "id" COLLATE NOCASE ASC
);

-- ----------------------------
-- Auto increment value for state
-- ----------------------------

-- ----------------------------
-- Indexes structure for table state
-- ----------------------------
CREATE UNIQUE INDEX "main"."state_index_1"
ON "state" (
  "id" COLLATE NOCASE ASC
);

PRAGMA foreign_keys = true;
