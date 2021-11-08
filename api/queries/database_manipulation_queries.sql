-- ------------------------------------ Musicians -----------------------------------
-- CREATE
INSERT INTO musicians (
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
SELECT * FROM musicians;


-- SELECT (filtered)
SELECT * FROM musicians WHERE firstName LIKE :firstName;
SELECT * FROM musicians WHERE firstName LIKE :lastName;
SELECT * FROM musicians WHERE birthdate = :birthdate;
SELECT * FROM musicians WHERE firstName LIKE :email;
SELECT * FROM musicians WHERE phoneNumber = :phoneNumber;
SELECT * FROM musicians WHERE street LIKE :street;
SELECT * FROM musicians WHERE city LIKE :city;
SELECT * FROM musicians WHERE state LIKE :state;
SELECT * FROM musicians WHERE zip = :zip;
SELECT * FROM musicians WHERE inEnsemble = :inEnsemble;
SELECT * FROM musicians WHERE active = :active;


-- UPDATE
UPDATE musicians
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
DELETE FROM musicians WHERE musicianID = :musicianID;


-- ----------------------------------- Instruments -----------------------------------
-- CREATE
INSERT INTO instruments (name)
VALUE (:name);


-- SELECT
SELECT * FROM instruments;

-- UPDATE
UPDATE instruments
SET name = :name
WHERE instrumentID = :instrumentID;

-- DELETE
DELETE FROM instruments WHERE instrumentID = :instrumentID;


-- ------------------------------------- Venues --------------------------------------
-- CREATE
INSERT INTO venues (capacity, name, street, city, state, zip)
VALUES (:capacity, :name, :street, :city, :state, :zip);


-- SELECT
SELECT * from venues;


-- UPDATE
UPDATE venues
SET capacity = :capacity,
    name = :name,
    street = :street,
    city = :city,
    state = :state,
    zip = :zip
WHERE venueID = :venueID;


-- DELETE
DELETE FROM venues WHERE venueID = :venueID;


-- ---------------------------------- ConcertCycles ----------------------------------
-- CREATE
INSERT INTO concert_cycles (
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
SELECT * FROM concert_cycles;


-- UPDATE
UPDATE concert_cycles
SET concertTitle = :concertTitle,
    startDate = :startDate,
    endDate = :endDate,
    conductorFirstName = :conductorFirstName,
    conductorLastName = :conductorLastName,
    soloistFirstName = :soloistFirstName,
    soloistLastName = :soloistLastName
WHERE concertID = :concertID;

-- DELETE
DELETE FROM concert_cycles WHERE concertID = :concertID;



-- ------------------------------------- Services ------------------------------------
-- CREATE
INSERT INTO services (startTime, endTime, isRehearsal, venueID, concertID)
VALUES (:startTime, :endTime, :isRehearsal, :venueID, :concertID);


-- SELECT
SELECT * FROM services;


-- UPDATE
UPDATE services
SET startTime = :startTime,
    endTime = :endTime,
    isRehearsal = :isRehearsal,
    venueID = :venueID,
    concertID = :concertID
WHERE serviceID = :serviceID;


-- DELETE
DELETE FROM services WHERE serviceID = :serviceID;

-- -------------------------------------- Pieces -------------------------------------
-- CREATE
INSERT INTO pieces (
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
SELECT * FROM pieces;


-- UPDATE
UPDATE pieces
SET pieceTitle = :pieceTitle,
    composerFirstName = :composerFirstName,
    composerLastName = :composerLastName,
    arrangerFirstName = :arrangerFirstName,
    arrangerLastName = :arrangerLastName,
    instrumentation = :instrumentation
WHERE pieceID = :pieceID;


-- DELETE
DELETE FROM pieces WHERE pieceID = :pieceID;


-- ------------------------------ MusiciansInstruments -------------------------------
-- CREATE
INSERT INTO musicians_instruments (musicianID, instrumentID)
VALUES (:musicianID, :instrumentID);


-- SELECT
SELECT * FROM musicians_instruments;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM musicians_instruments WHERE musicianID = :musicianID AND instrumentID = :instrumentID;


-- ------------------------------ MusiciansConcertCycles ------------------------------
-- CREATE
INSERT INTO musicians_concert_cycles (musicianID, concertID)
VALUES (:musicianID, :concertID);

-- SELECT
SELECT * FROM musicians_concert_cycles;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM musicians_concert_cycles WHERE musicianID = :musicianID AND concertID = :concertID;


-- ------------------------------- PiecesConcertCycles --------------------------------
-- CREATE
INSERT INTO pieces_concert_cycles (pieceID, concertID)
VALUES (:pieceID, :concertID);


-- SELECT
SELECT * FROM pieces_concert_cycles;


-- UPDATE is disallowed on this entity: delete then create instead


-- DELETE
DELETE FROM pieces_concert_cycles WHERE pieceID = :pieceID AND concertID = :concertID;

