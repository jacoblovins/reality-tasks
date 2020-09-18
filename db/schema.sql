
DROP DATABASE IF EXISTS vrtasklist_db;

CREATE DATABASE vrtasklist_db;

USE vrtasklist_db;

CREATE TABLE members (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE office_tasks (
	task_id INT NOT NULL AUTO_INCREMENT,
	task_name VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES members(id),
	PRIMARY KEY (task_id)
);

CREATE TABLE school_tasks (
	task_id INT NOT NULL AUTO_INCREMENT,
	task_name VARCHAR(255) NOT NULL,
	user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES members(id),
	PRIMARY KEY (task_id)
);

CREATE TABLE home_tasks (
	task_id INT NOT NULL AUTO_INCREMENT,
	task_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES members(id),
	PRIMARY KEY (task_id)
);

CREATE TABLE store_tasks (
	task_id INT NOT NULL AUTO_INCREMENT,
	task_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES members(id),
	PRIMARY KEY (task_id)
);
