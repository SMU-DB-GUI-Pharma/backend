CREATE DATABASE IF NOT EXISTS MrPharma;
USE MrPharma;

-- create table in DB
CREATE TABLE `db`.`test_table` (
    `id` INT NOT NULL AUTO_INCREMENT, 
    `value` VARCHAR(45), 
    PRIMARY KEY (`id`), 
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

--create pharmacy table
CREATE TABLE 'Pharmacy' (
    'PharmacyName' VARCHAR(45),
    
);

--create user table
CREATE TABLE IF NOT EXISTS `MrPharma`.`User` (
    'InsuranceID' INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (InsuranceID),
    'Username' VARCHAR(45),
    'Password' VARCHAR(45),
    'PinCode' INT,
    --'PharmacyID' INT,
    'TotalCostPrescriptions' DECIMAL, 
    'MonthlyCost' DECIMAL
);

--populate users with dummy data
INSERT INTO `User` (Username, Password, PinCode, TotalCostPrescriptions,MonthlyCost)
VALUES
('throwerslug','password1', 1111, 100.00, 33.2),
('gorebland','password2', 2222, 200.00, 11.04, NULL),
('edenheight','password3', 3333, 300.00, 08.77, NULL),
('drugsarefun','password4', 4444, 250.00,  10.04,NULL),
('concoction','password5', 5555, 180.00, 09.44,NULL),
('bigpharmacy','password6', 6666, 400.70,  03.06,NULL);

--create user prescription brand table
CREATE TABLE PrescriptionBrand (
    'BrandID' INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (BrandID),
    'BrandName' VARCHAR(45),
    'Description' VARCHAR(256)
);

--create prescription table
CREATE TABLE Prescripton (
    Name VARCHAR(45),
    BrandID INT,
    DateOfIssue DATETIME,
    DateOfExpiration DATETIME,
    RefillDate DATETIME,
    RefillCount INT,
    PauseDate DATETIME,
    isRefillable BOOLEAN,
    isReccurring BOOLEAN,
    Description VARCHAR (256),
    Price DECIMAL
);

--create insurance table
CREATE TABLE Insurance (
    InsuranceID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (InsuranceID),
    Company VARCHAR(45),
    AddressLine1 VARCHAR(45),
    AddressLine2 VARCHAR(45),
    City VARCHAR(45),
    State VARCHAR(45),
    PostalCode INT,
    PhoneNumber INT,
    Email VARCHAR(45)
);


-- insert sample entry
INSERT INTO `db`.`test_table` (`value`) VALUES ('Sample Value');

-- create user called `manager` with password `Password`
CREATE USER 'manager'@'%' IDENTIFIED BY 'Password';

-- give access to manager on db
GRANT ALL PRIVILEGES ON db.* TO 'manager'@'%';

-- set password method to native password for mysql workbench access (mysql 8 issue)
ALTER USER 'manager'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';

-- flush them privileges
FLUSH PRIVILEGES;