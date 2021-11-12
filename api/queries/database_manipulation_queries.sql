-- ------------------------------------ Musicians -----------------------------------
-- CREATE
INSERT INTO Musicians (
    firstName,
    lastName,
    birthdate,
    email,
    phoneNumber,
    street,
    city,
    state,
    zip,
    inEnsemble,
    active
)
VALUES (
    :firstName,
    :lastName,
    :birthdate,
    :email,
    :phoneNumber,
    :street,
    :city,
    :state,
    :zip,
    :inEnsemble,
    :active
);

-- SELECT (all)
SELECT * FROM Musicians;


-- SELECT (filtered)
SELECT * FROM Musicians WHERE firstName LIKE :firstName;
SELECT * FROM Musicians WHERE firstName LIKE :lastName;
SELECT * FROM Musicians WHERE birthdate = :birthdate;
SELECT * FROM Musicians WHERE firstName LIKE :email;
SELECT * FROM Musicians WHERE phoneNumber = :phoneNumber;
SELECT * FROM Musicians WHERE street LIKE :street;
SELECT * FROM Musicians WHERE city LIKE :city;
SELECT * FROM Musicians WHERE state LIKE :state;
SELECT * FROM Musicians WHERE zip = :zip;
SELECT * FROM Musicians WHERE inEnsemble = :inEnsemble;
SELECT * FROM Musicians WHERE active = :active;


-- UPDATE
UPDATE Musicians
SET firstName = :firstName,
    lastName = :lastName,
    birthdate = :birthdate,
    email = :email,
    phoneNumber = :phoneNumber,
    street = :street,
    city = :city,
    state = :state,
    zip = :zip,
    inEnsemble = :inEnsemble,
    active =:active
WHERE musicianID = :musicianID;


-- DELETE
DELETE FROM Musicians WHERE musicianID = :musicianID;


-- ----------------------------------- Instruments -----------------------------------
-- CREATE
INSERT INTO Instruments (name)
VALUE (:name);


-- SELECT
SELECT * FROM Instruments;

-- UPDATE
UPDATE Instruments
SET name = :name
WHERE instrumentID = :instrumentID;

-- DELETE
DELETE FROM Instruments WHERE instrumentID = :instrumentID;


-- ------------------------------------- Venues --------------------------------------
-- CREATE
INSERT INTO Venues (capacity, name, street, city, state, zip)
VALUES (:capacity, :name, :street, :city, :state, :zip);


-- SELECT
SELECT * from Venues;


-- UPDATE
UPDATE Venues
SET capacity = :capacity,
    name = :name,
    street = :street,
    city = :city,
    state = :state,
    zip = :zip
WHERE venueID = :venueID;


-- DELETE
DELETE FROM Venues WHERE venueID = :venueID;


-- ---------------------------------- ConcertCycles ----------------------------------
-- CREATE
INSERT INTO ConcertCycles (
    concertTitle,
    startDate,
    endDate,
    conductorFirstName,
    conductorLastName,
    soloistFirstName,
    soloistLastName
)
VALUES (
    :concertTitle,
    :startDate,
    :endDate,
    :conductorFirstName,
    :conductorLastName,
    :soloistFirstName,
    :soloistLastName
);


-- SELECT
SELECT * FROM ConcertCycles;


-- UPDATE
UPDATE ConcertCycles
SET concertTitle = :concertTitle,
    startDate = :startDate,
    endDate = :endDate,
    conductorFirstName = :conductorFirstName,
    conductorLastName = :conductorLastName,
    soloistFirstName = :soloistFirstName,
    soloistLastName = :soloistLastName
WHERE concertID = :concertID;

-- DELETE
DELETE FROM ConcertCycles WHERE concertID = :concertID;



-- ------------------------------------- Services ------------------------------------
-- CREATE
INSERT INTO Services (startTime, endTime, isRehearsal, venueID, concertID)
VALUES (:startTime, :endTime, :isRehearsal, :venueID, :concertID);


-- SELECT
SELECT * FROM Services;


-- UPDATE
UPDATE Services
SET startTime = :startTime,
    endTime = :endTime,
    isRehearsal = :isRehearsal,
    venueID = :venueID,
    concertID = :concertID
WHERE serviceID = :serviceID;


-- DELETE
DELETE FROM Services WHERE serviceID = :serviceID;

-- -------------------------------------- Pieces -------------------------------------
-- CREATE
INSERT INTO Pieces (
    pieceTitle,
    composerFirstName,
    composerLastName,
    arrangerFirstName,
    arrangerLastName,
    instrumentation
)
VALUES (
    :pieceTitle,
    :composerFirstName,
    :composerLastName,
    :arrangerFirstName,
    :arrangerLastName,
    :instrumentation
);


-- SELECT
SELECT * FROM Pieces;


-- UPDATE
UPDATE Pieces
SET pieceTitle = :pieceTitle,
    composerFirstName = :composerFirstName,
    composerLastName = :composerLastName,
    arrangerFirstName = :arrangerFirstName,
    arrangerLastName = :arrangerLastName,
    instrumentation = :instrumentation
WHERE pieceID = :pieceID;


-- DELETE
DELETE FROM Pieces WHERE pieceID = :pieceID;


-- ------------------------------ MusiciansInstruments -------------------------------
-- CREATE
INSERT INTO MusiciansInstruments (musicianID, instrumentID)
VALUES (:musicianID, :instrumentID);


-- SELECT
SELECT * FROM MusiciansInstruments;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM MusiciansInstruments WHERE musicianID = :musicianID AND instrumentID = :instrumentID;


-- ------------------------------ MusiciansConcertCycles ------------------------------
-- CREATE
INSERT INTO MusiciansConcertCycles (musicianID, concertID)
VALUES (:musicianID, :concertID);

-- SELECT
SELECT * FROM MusiciansConcertCycles;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM MusiciansConcertCycles WHERE musicianID = :musicianID AND concertID = :concertID;


-- ------------------------------- PiecesConcertCycles --------------------------------
-- CREATE
INSERT INTO PiecesConcertCycles (pieceID, concertID)
VALUES (:pieceID, :concertID);


-- SELECT
SELECT * FROM PiecesConcertCycles;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM PiecesConcertCycles WHERE pieceID = :pieceID AND concertID = :concertID;


