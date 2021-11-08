-- CS-340 Project Step 4
-- Group 42: Team Mango - Fahad Awan, Donato Quartuccia
-- Last Modified: 2021-11-08

-- Drop all tables simultaneously and in reverse order to avoid FK conflicts
DROP TABLE IF EXISTS
    pieces_concert_cycles,
    musicians_concert_cycles,
    musicians_instruments,
    pieces,
    services,
    concert_cycles,
    venues,
    instruments,
    musicians;


-- Create new tables for each entity
CREATE TABLE musicians (
    musicianID INT AUTO_INCREMENT UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(100),
    phoneNumber INT(9) ZEROFILL NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,
    zip INT(5) ZEROFILL NOT NULL,
    inEnsemble BIT(1) NOT NULL,
    active BIT(1) NOT NULL,
    PRIMARY KEY (musicianID)
)
COMMENT 'records the details and contact records of all musicians contracted for service by the orchestra';


CREATE TABLE instruments (
    instrumentID INT AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (instrumentID)
)
COMMENT 'records the instruments that may be played by musicians in the orchestra';


CREATE TABLE venues (
    venueID INT AUTO_INCREMENT UNIQUE NOT NULL,
    capacity SMALLINT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL,
    zip INT(5) ZEROFILL NOT NULL,
    PRIMARY KEY (venueID)
)
COMMENT 'records the details of venues where the orchestra may perform';


CREATE TABLE concert_cycles (
    concertID INT AUTO_INCREMENT UNIQUE NOT NULL,
    concertTitle VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    conductorFirstName VARCHAR(50) NOT NULL,
    conductorLastName VARCHAR(50) NOT NULL,
    soloistFirstName VARCHAR(50),
    soloistLastName VARCHAR(50),
    PRIMARY KEY (concertID)
)
COMMENT 'records the details of a group (cycle) of concerts';


CREATE TABLE services (
    serviceID INT AUTO_INCREMENT UNIQUE NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    isRehearsal BIT(1) NOT NULL,
    venueID INT,
    concertID INT NOT NULL,
    FOREIGN KEY (venueID) REFERENCES venues(venueID),
    FOREIGN KEY (concertID) REFERENCES concert_cycles(concertID),
    PRIMARY KEY (serviceID)
)
COMMENT 'records the details of specific services (i.e., performances) made by the orchestra';


CREATE TABLE pieces (
    pieceID INT AUTO_INCREMENT UNIQUE NOT NULL,
    pieceTitle VARCHAR(100) NOT NULL,
    composerFirstName VARCHAR(50) NOT NULL,
    composerLastName VARCHAR(50) NOT NULL,
    arrangerFirstName VARCHAR(50),
    arrangerLastName VARCHAR(50),
    instrumentation TEXT NOT NULL
)
COMMENT 'records details about the musical pieces that are performed by the orchestra during concert cycles';


CREATE TABLE musicians_instruments (
    musicianID INT NOT NULL,
    instrumentID INT NOT NULL,
    FOREIGN KEY (musicianID) REFERENCES musicians(musicianID),
    FOREIGN KEY (instrumentID) REFERENCES instruments(instrumentID),
    PRIMARY KEY (musicianID, instrumentID)
)
COMMENT 'an intersection table that implements M:M relationships between Musicians and Instruments';


CREATE TABLE musicians_concert_cycles (
    musicianID INT NOT NULL,
    concertID INT NOT NULL,
    FOREIGN KEY (musicianID) REFERENCES musicians(musicianID),
    FOREIGN KEY (concertID) REFERENCES concert_cycles(concertID),
    PRIMARY KEY (musicianID, concertID)
)
COMMENT 'an intersection table that implements M:M relationships between Musicians and ConcertCycles';


CREATE TABLE pieces_concert_cycles (
    pieceID INT NOT NULL,
    concertID INT NOT NULL,
    FOREIGN KEY (pieceID) REFERENCES pieces(pieceID),
    FOREIGN KEY (concertID) REFERENCES concert_cycles(concertID),
    PRIMARY KEY (pieceID, concertID)
)
COMMENT 'an intersection table that implements M:M relationships between Pieces and ConcertCycles';


-- Write initial data to each table
INSERT INTO musicians (firstName, lastName, birthdate, email, phoneNumber, street, city, state, zip, inEnsemble, active)
VALUES (

       ),
       (

       ),
       (

       );

INSERT INTO instruments (instrumentID, name)
VALUES (

       ),
       (

       ),
       (

       );



INSERT INTO venues (capacity, name, street, city, state, zip)
VALUES (

       ),
       (

       ),
       (

       );


INSERT INTO concert_cycles (concertTitle, startDate, endDate, conductorFirstName, conductorLastName, soloistFirstName, soloistLastName)
VALUES (

       ),
       (

       ),
       (

       );

INSERT INTO services (startTime, endTime, isRehearsal, venueID, concertID)
VALUES (

       ),
       (

       ),
       (

       );


INSERT INTO pieces (pieceID, pieceTitle, composerFirstName, composerLastName, arrangerFirstName, arrangerLastName, instrumentation)
VALUES (

       ),
       (

       ),
       (

       );


INSERT INTO musicians_instruments (musicianID, instrumentID)
VALUES (

       ),
       (

       ),
       (

       );

INSERT INTO musicians_concert_cycles (musicianID, concertID)
VALUES (

       ),
       (

       ),
       (

       );

INSERT INTO pieces_concert_cycles (pieceID, concertID)
VALUES (

       ),
       (

       ),
       (

       );


-- Test code: describe each db...
DESCRIBE pieces_concert_cycles;
DESCRIBE musicians_concert_cycles;
DESCRIBE musicians_instruments;
DESCRIBE pieces;
DESCRIBE services;
DESCRIBE concert_cycles;
DESCRIBE venues;
DESCRIBE instruments;
DESCRIBE musicians;

-- Test code: ...and query to ensure all values were inserted
SELECT * FROM pieces_concert_cycles;
SELECT * FROM musicians_concert_cycles;
SELECT * FROM musicians_instruments;
SELECT * FROM pieces;
SELECT * FROM services;
SELECT * FROM concert_cycles;
SELECT * FROM venues;
SELECT * FROM instruments;
SELECT * FROM musicians;
