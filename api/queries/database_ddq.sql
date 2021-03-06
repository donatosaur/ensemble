-- CS-340 Project Step 4
-- Group 42: Team Mango - Fahad Awan, Donato Quartuccia
-- Last Modified: 2021-12-05

-- ------------------------------------ Drop Tables ------------------------------------

-- Drop all tables simultaneously and in reverse order to avoid FK conflicts
DROP TABLE IF EXISTS
    PiecesConcertCycles,
    MusiciansConcertCycles,
    MusiciansInstruments,
    Pieces,
    Services,
    ConcertCycles,
    Venues,
    Instruments,
    Musicians;


-- ------------------------------------ Create Tables ------------------------------------

-- Create Musicians Table
-- Regarding the constraints, we had issues getting regular expression to behave; normally, we would have used \d here,
-- which the MariaDB documentation indicates is supported (https://mariadb.com/kb/en/pcre/), but it didn't work when
-- combined with any other operators like intervals or + so we resorted to using character ranges instead.

CREATE TABLE Musicians (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(100),
    phoneNumber CHAR(10) CHECK (phoneNumber IS NULL OR phoneNumber REGEXP '^[0-9]{10}$'),
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL,
    zip CHAR(5) NOT NULL CHECK (zip REGEXP '^[0-9]{5}$'),
    inEnsemble BOOLEAN NOT NULL,
    active BOOLEAN NOT NULL,
    PRIMARY KEY (id)
)
ENGINE = InnoDB,
COMMENT 'records the details and contact records of all musicians contracted for service by the orchestra';


-- Create Instruments Table

CREATE TABLE Instruments (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (id)
)
ENGINE = InnoDB,
COMMENT 'records the instruments that may be played by musicians in the orchestra';


CREATE TABLE Venues (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    capacity INT UNSIGNED NOT NULL,
    name VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state CHAR(2) NOT NULL,
    zip CHAR(5) NOT NULL CHECK (zip REGEXP '^[0-9]{5}$'),
    PRIMARY KEY (id)
)
ENGINE = InnoDB,
COMMENT 'records the details of venues where the orchestra may perform';


-- Create ConcertCycles Table

CREATE TABLE ConcertCycles (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    concertTitle VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    conductorFirstName VARCHAR(50) NOT NULL,
    conductorLastName VARCHAR(50) NOT NULL,
    soloistFirstName VARCHAR(50),
    soloistLastName VARCHAR(50),
    PRIMARY KEY (id)
)
ENGINE = InnoDB,
COMMENT 'records the details of a group (cycle) of concerts';


-- Create Services Table

CREATE TABLE Services (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    startTime DATETIME NOT NULL,
    endTime DATETIME NOT NULL,
    isRehearsal BOOLEAN NOT NULL,
    venueID INT,
    concertID INT NOT NULL,
    FOREIGN KEY (venueID) REFERENCES Venues(id),
    FOREIGN KEY (concertID) REFERENCES ConcertCycles(id),
    PRIMARY KEY (id)
)
ENGINE = InnoDB,
COMMENT 'records the details of specific services (i.e., performances) made by the orchestra';


-- Create Pieces Table

CREATE TABLE Pieces (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    pieceTitle VARCHAR(100) NOT NULL,
    composerFirstName VARCHAR(50) NOT NULL,
    composerLastName VARCHAR(50) NOT NULL,
    arrangerFirstName VARCHAR(50),
    arrangerLastName VARCHAR(50),
    instrumentation TEXT NOT NULL,
    PRIMARY KEY (id)
)
ENGINE = InnoDB,
COMMENT 'records details about the musical pieces that are performed by the orchestra during concert cycles';


-- Create MusiciansInstruments Table

CREATE TABLE MusiciansInstruments (
    musicianID INT NOT NULL,
    instrumentID INT NOT NULL,
    FOREIGN KEY (musicianID) REFERENCES Musicians(id) ON DELETE CASCADE,
    FOREIGN KEY (instrumentID) REFERENCES Instruments(id),
    PRIMARY KEY (musicianID, instrumentID)
)
ENGINE = InnoDB,
COMMENT 'an intersection table that implements M:M relationships between Musicians and Instruments';


-- Create MusiciansConcertCycles Table

CREATE TABLE MusiciansConcertCycles (
    musicianID INT NOT NULL,
    concertID INT NOT NULL,
    FOREIGN KEY (musicianID) REFERENCES Musicians(id) ON DELETE CASCADE,
    FOREIGN KEY (concertID) REFERENCES ConcertCycles(id),
    PRIMARY KEY (musicianID, concertID)
)
ENGINE = InnoDB,
COMMENT 'an intersection table that implements M:M relationships between Musicians and ConcertCycles';


-- Create PiecesConcertCycles Table

CREATE TABLE PiecesConcertCycles (
    pieceID INT NOT NULL,
    concertID INT NOT NULL,
    FOREIGN KEY (pieceID) REFERENCES Pieces (id),
    FOREIGN KEY (concertID) REFERENCES ConcertCycles(id),
    PRIMARY KEY (pieceID, concertID)
)
ENGINE = InnoDB,
COMMENT 'an intersection table that implements M:M relationships between Pieces and ConcertCycles';


-- ------------------------------------ Write Initial Data ------------------------------------

-- Write initial Musicians data
INSERT INTO Musicians (firstName,
                       lastName,
                       birthdate,
                       email,
                       phoneNumber,
                       street,
                       city,
                       state,
                       zip,
                       inEnsemble,
                       active)
VALUES ('Annabelle',
        'Enitan',
        '1966-01-22',
        'hoyt1@gmail.com',
        '2022472839',
        '3225 Argyle Ave',
        'Philadelphia',
        'PA',
        '86392',
        1,
        0
       ),
       ('Barend',
        'Vasu',
        '1982-08-14',
        NULL,
        '1829385670',
        '300 S Delaware St',
        'Butler',
        'MO',
        '12564',
        0,
        1
       ),
       ('Anja',
        'Lynwood',
        '2000-04-27',
        'aj.lynwood@hotmail.com',
        NULL,
        '1412 Sunset Ave',
        'Chico',
        'CA',
        '95926',
        0,
        0);


-- Write initial Instruments data
INSERT INTO Instruments (name)
VALUES ('Viola'),
       ('Sousaphone'),
       ('Glockenspiel'),
       ('Ocarina');


-- Write initial Venues data
INSERT INTO Venues (capacity, name, street, city, state, zip)
VALUES (1742, 'Orpheus Theatre', '765 S Grandview Dr', 'Paoli', 'IN', '47454'),
       (22634, 'Capital Theatre', '4548 Akialoa Rd', 'Kekaha', 'HI', '96752'),
       (05443, 'Red Rocks Theatre', '22 Harvard St', 'Boston', 'MA', '02124');


-- Write initial ConcertCycles data
INSERT INTO ConcertCycles (concertTitle,
                            startDate,
                            endDate,
                            conductorFirstName,
                            conductorLastName,
                            soloistFirstName,
                            soloistLastName)
VALUES ('Celebrating the Season',
        '2021-12-20',
        '2021-12-24',
        'Alex',
        'Ferguson',
        'Carl',
        'Stockhausen'
       ),
       ('The Music of the Spheres',
        '2022-05-02',
        '2021-05-04',
        'Johannes',
        'Kepler',
        'Terrence',
        'Howard'
       ),
       ('The Magic of Mozart',
        '2021-03-04',
        '2021-03-09',
        'Rebecca',
        'Boelzner',
        NULL,
        NULL);


-- Write initial Services data
INSERT INTO Services (startTime, endTime, isRehearsal, venueID, concertID)
VALUES ('2021-12-20 13:00:21', '2021-12-20 15:00:00', 1, 1, 1),
       ('2021-12-24 13:00:00', '2021-12-24 15:00:00', 0, 1, 1),
       ('2022-05-02 08:00:00', '2022-05-02 11:00:00', 0, NULL, 2);


-- Write initial Pieces data
INSERT INTO Pieces (pieceTitle,
                    composerFirstName,
                    composerLastName,
                    arrangerFirstName,
                    arrangerLastName,
                    instrumentation)
VALUES ('The Star Spangled Banner',
        'Francis Scott',
        'Key',
        'Leopold',
        'Stokowski',
        '2 2 2 2 - 2a 2 3 1 - T+3 - str (14.12.10.11.8)'
       ),
       ('Traces',
        'Elizabeth',
        'Start',
        NULL,
        NULL,
        '2 2 2 2 - 2a 2 3 1 - T+3 - str (14.12.10.11.8)'
       ),
       ('Concerto No. 25 for Piano and Orchestra in C Major, K. 503',
        'Amadeus',
        'Mozart',
        NULL,
        NULL,
        'Solo Pf - 1 2 0 2 - 2a 2 0 0 - T - str (12.10.8.6.4)'
       );


-- Write initial MusiciansInstruments data
INSERT INTO MusiciansInstruments (musicianID, instrumentID)
VALUES (1, 2),
       (2, 1),
       (3, 2);


-- Write initial MusiciansConcertCycles data
INSERT INTO MusiciansConcertCycles (musicianID, concertID)
VALUES (2, 1),
       (1, 1),
       (1, 2);


-- Write initial PiecesConcertCycles data
INSERT INTO PiecesConcertCycles (pieceID, concertID)
VALUES (1, 1),
       (2, 1),
       (3, 1);
