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
VALUES ("Annabelle", "Enitan", "1966-01-22", "hoyt1@gmail.com", 0222472839, "3225 Argyle Ave", "Philadelphia", "PA", 86392, 1, 0

       ),
       ("Barend", "Vasu", "1982-08-14", NULL, 18293856, "300 S Delaware St", "Butler", "MO", 647730, 0, 1

       ),
       ("Anja", "Lynwood", "2000-04-27", "aj.lynwood@hotmail.com", 39078965, "1412 Sunset Ave", "Chico", "CA", 95926, 0, 0

       );

INSERT INTO instruments (name)
VALUES ("Viola"

       ),
       ("Sousaphone"

       ),
       ("Glockenspiel"

       );



INSERT INTO venues (capacity, name, street, city, state, zip)
VALUES (1742, "Orpheus Theatre", "765 S Grandview Dr", "Paoli", "IN", 47454

       ),
       (22634, "Capital Theatre", "4548 Akialoa Rd", "Kekaha", "HI", 96752

       ),
       (05443, "Red Rocks Theatre", "22 Harvard St", "Boston", "MA", 02124

       );


INSERT INTO concert_cycles (concertTitle, startDate, endDate, conductorFirstName, conductorLastName, soloistFirstName, soloistLastName)
VALUES ("Celebrating the Season", "2021-12-20", "2021-12-24", "Alex", "Ferguson", "Carl", "Stockhausen"

       ),
       ("The Music of the Spheres", "2022-05-02", "2021-05-04", "Donato", "Quartuccia", "Terrence", "Howard"

       ),
       ("The Magic of Mozart", "2021-03-04", "2021-03-09", "Rebecca", "Boelzner", NULL, NULL

       );

INSERT INTO services (startTime, endTime, isRehearsal, venueID, concertID)
VALUES ("2021-12-20 13:00:21", "2021-12-20 15:00:00", 1, 1, 1

       ),
       ("2021-12-24 13:00:00", "2021-12-24 15:00:00", 0, 1, 1

       ),
       ("2022-05-02 08:00:00", "2022-05-02 11:00:00", 0, NULL, 2

       );


INSERT INTO pieces (pieceTitle, composerFirstName, composerLastName, arrangerFirstName, arrangerLastName, instrumentation)
VALUES ("The Star Spanged Banner", "Francis Scott", "Key", "Leopold", "Stokowski", "2 2 2 2 - 2a 2 3 1 - T+3 - str (14.12.10.11.8)"

       ),
       ("Traces", "Elizabeth", "Start", NULL, NULL, "2 2 2 2 - 2a 2 3 1 - T+3 - str (14.12.10.11.8)"

       ),
       ("Concerto No. 25 for Piano and Orchestra in C Major, K. 503", "Amadeus", "Mozart", NULL, NULL, "Solo Pf - 1 2 0 2 - 2a 2 0 0 - T - str (12.10.8.6.4)"

       );


INSERT INTO musicians_instruments (musicianID, instrumentID)
VALUES (1, 2

       ),
       ( 2, 1

       ),
       (3, 2

       );

INSERT INTO musicians_concert_cycles (musicianID, concertID)
VALUES (2, 1

       ),
       (1, 1

       ),
       (1, 2

       );

INSERT INTO pieces_concert_cycles (pieceID, concertID)
VALUES (1, 1

       ),
       (2, 1

       ),
       (3, 1

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
