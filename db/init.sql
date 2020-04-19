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
CREATE TABLE IF NOT EXISTS `MrPharma`.`Pharmacy` (
  PharmacyID INT NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (`PharmacyID`),
  PharmacyName VARCHAR(50) NOT NULL,
  AddressLine1 VARCHAR(50) NOT NULL,
  AddressLine2 VARCHAR(50) NULL DEFAULT NULL,
  City VARCHAR(50) NOT NULL,
  State VARCHAR(50) NULL DEFAULT NULL,
  PostalCode VARCHAR(50) NULL DEFAULT NULL,
  Country VARCHAR(50) NULL DEFAULT NULL,
  Phone VARCHAR(50) NOT NULL,
  InsuranceID INT DEFAULT NULL,
  CodePin INT DEFAULT NULL,
--   FOREIGN KEY (`insurance_id`) REFERENCES `Insurance` (`InsuranceID`),
--   INDEX `idInsurance_idx` (`insurance_id`),
--   FOREIGN KEY (`code_pin`) REFERENCES `MrPharma`.`User` (`PinCode`),
--   INDEX `pinCode_idx` (`code_pin`)
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

ALTER TABLE User
ADD FinancialReport MEDIUMBLOB;

--populate users with dummy data
INSERT INTO `User` (Username, Password, PinCode, TotalCostPrescriptions,MonthlyCost)
VALUES
('throwerslug','password1', '1111', '100.00', '33.2'),
('gorebland','password2', '2222', '200.00', '11.04'),
('edenheight','password3', '3333', '300.00', '08.77'),
('drugsarefun','password4', '4444', '250.00',  '10.04'),
('concoction','password5', '5555', '180.00', '09.44'),
('bigpharmacy','password6', '6666', '400.70',  '03.06');

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
CREATE TABLE IF NOT EXISTS `MrPharma`.`Insurance` (
    InsuranceID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (InsuranceID),
    Company VARCHAR(45),
    AddressLine1 VARCHAR(45),
    AddressLine2 VARCHAR(45),
    City VARCHAR(45),
    State VARCHAR(45),
    PostalCode INT,
    Country VARCHAR(45),
    PhoneNumber INT,
    Email VARCHAR(45)
    FOREIGN KEY (`Code_Pin`) REFERENCES `MrPharma`.`User` (`PinCode`),
    INDEX `PinCode_Index` (`Code_Pin`)
);

INSERT INTO `Insurance` 
(Company, AddressLine1, AddressLine2, City, State, PostalCode, Country, PhoneNumber, Email, Code_Pin)
VALUES
('Blue Cross Blue Shield', '8364 Dyer Street', NULL, 'Dallas', 'Texas',  '75205', 'United States','4534126683', 'blue@email.com', 1),
('Humana','1111 Krome Avenue', NULL,  'Miami', 'Florida', '33101', 'United States','2025550104', 'humana@email.com', 2),
('UnitedHealth', '7434 Southampton Rd', '#2243','Minnetonka', 'Minnesota', '49009', 'United States', '7313741730', 'unitedhealth@email.com', 3),
('California Physicians Service', '1 Old Golf Dr', NULL, 'Los Angeles', 'California', '90274', 'United States', '5639735475', 'cps@email.com', 4),
('MetLife', '8845 Sycamore Lane', NULL,  'New York', 'New York', '60089',  'United States','3968131162', 'metro@email.com', 5),
('Highmark Group', '35 North Mulberry Street', '#1001', ' Pittsburgh', 'Pennsylvania',  '37601', 'United States', '8462420038','highmark@email.com',  6);



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