use Pharma;

CREATE TABLE User(
    InsuranceID INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (InsuranceID),
    Username VARCHAR(45),
    Password VARCHAR(45),
    PinCode INT,
    PharmacyID INT,
    TotalCostPrescriptions DECIMAL, 
    MonthlyCost DECIMAL
);

CREATE TABLE PrescriptionBrand (
    BrandID INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (BrandID),
    BrandName VARCHAR(45),
    Description VARCHAR(256)
);

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
