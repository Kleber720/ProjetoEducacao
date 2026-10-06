-- Active: 1786479805455@@127.0.0.1@3306@edukation
CREATE DATABASE IF NOT EXISTS edukation;
USE edukation;


CREATE TABLE IF NOT EXISTS User(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARBINARY(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(255) UNIQUE

);


CREATE TABLE IF NOT EXISTS Category(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    idUser INT NOT NULL, FOREIGN KEY(idUser) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Theme(
    id INT  PRIMARY KEY AUTO_INCREMENT,
    idCategory INT NOT NULL,FOREIGN KEY (idCategory) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(255)UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Activities(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idTheme INT NOT NULL, FOREIGN KEY(idTheme) REFERENCES theme(id) ON DELETE CASCADE ON UPDATE CASCADE,
    description VARCHAR(255),
    exercises VARCHAR(1000)NOT NULL,
    status BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS Module(
    id INT PRIMARY KEY AUTO_INCREMENT,
    chooseModule VARCHAR(255)NOT NULL,
    description VARCHAR(255),
    idActivities INT NOT NULL, FOREIGN KEY(idActivities) REFERENCES Activities(id) ON DELETE CASCADE ON UPDATE CASCADE 
);

CREATE TABLE IF NOT EXISTS Timeline(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)NOT NULL,
    description VARCHAR(255),
    startDate DATE,
    endDate DATE,
    idModule INT, FOREIGN KEY(idModule) REFERENCES Module(id) ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO User(name,password,email,phone) VALUES(
    "ana", "1234","anaclara@","1199999"
);

INSERT INTO Category(idUser,name)VALUES
(1,"Matematica");

INSERT INTO Theme(idCategory,name,description) VALUES(
    1,"Trigonometria","aula de trigonometria"
);

INSERT INTO Activities (idTheme, description, exercises, status) 
VALUES (
    1, 
    'Atividades práticas sobre Loops e Estruturas de Repetição', 
    '1. Crie um loop FOR de 1 a 10. 2. Implemente um WHILE para validar entrada do usuário.', 
    TRUE
);

INSERT INTO module(description) VALUES(

);

SELECT * FROM User;
SELECT * FROM Category;
SELECT * FROM Theme;
SELECT * FROM activities;

DELETE FROM User WHERE id=1;
ALTER TABLE module CHANGE COLUMN name chooseModule VARCHAR(255)NOT NULL;



DROP DATABASE edukation;