import express from "express";
import db from "../database/db_connector.mjs";

let musicians = express.Router();

/**
 * CREATE  POST    /api/Musicians
 * READ    GET     /api/Musicians[?field=...]
 * UPDATE  PUT     /api/Musicians?id=...
 * DELETE  DELETE  /api/Musicians?id=...
 */

// CREATE
musicians.post("/", function (req, res) {
  // get body params
  let {
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
    active,
  } = req.body;

  // query
  const createQuery = "INSERT INTO Musicians (firstName, lastName, birthdate, email, phoneNumber, street, city, " +
                      "state, zip, inEnsemble, active) VALUES (?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?);";

  db.query(
    createQuery,
    [
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
      active,
    ],
    (error) => {
      if (error) {
        // send back a description of the error as well as the error status
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(201).json({ status: "Created" });
      }
    }
  );
});


// READ
musicians.get("/", (req, res, next) => {
  // check whether there are any query parameters
  if (req.query === undefined || Object.keys(req.query).length === 0) {
    next();
    return;
  }

  // get the first key-value pair (currently, only filtering by one field at a time is allowed)
  let [key, value] = Object.entries(req.query)[0];

  // value parser (reduce code duplication)
  function formatString() { value = `%${value}%` }

  // choose the correct query
  let filterQuery;
  switch (key) {
    case 'id': {
      value = parseInt(value?.toString());  // just in case value is null (unlikely, but cheaper than crashing the app)
      value = isNaN(value) ? null : value;
      filterQuery = "SELECT * FROM Musicians WHERE id = ?";
      break;
    }
    case 'firstName': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE firstName LIKE ?";
      break;
    }
    case 'lastName': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE lastName LIKE ?";
      break;
    }
    case 'birthdate': {
      filterQuery = "SELECT * FROM Musicians WHERE birthdate = ?";
      break;
    }
    case 'email': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE email LIKE ?";
      break;
    }
    case 'phoneNumber': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE phoneNumber LIKE ?";
      break;
    }
    case 'street': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE street LIKE ?";
      break;
    }
    case 'city': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE city LIKE ?";
      break;
    }
    case 'state': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE state LIKE ?";
      break;
    }
    case 'zip': {
      formatString();
      filterQuery = "SELECT * FROM Musicians WHERE zip LIKE ?";
      break;
    }
    case 'inEnsemble': {
      filterQuery = "SELECT * FROM Musicians WHERE inEnsemble = ?";
      break;
    }
    case 'active': {
      filterQuery = "SELECT * FROM Musicians WHERE active = ?";
      break;
    }
    default:
      next(); // just ignore the query params if they're invalid
      return;
  }

  db.query(filterQuery, [value], (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(503).json(error);
    } else {
      res.status(200).json(rows);
    }
  });
});


musicians.get("/", (req, res) => {

  db.query("SELECT * FROM Musicians;", (error, rows) => {
    if (error) {
      // we should only get an error here if something's wrong with the database connection
      console.log(error);
      res.status(503).json(error);
    } else {
      res.status(200).json(rows);
    }
  });
});


// UPDATE
musicians.put("/", function (req, res) {
  // get params
  let id = req.query.id;
  let {
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
    active,
  } = req.body;

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  // query
  const updateQuery = "UPDATE Musicians SET firstName = ?, lastName = ?, birthdate = ?, email = ?, phoneNumber= ?, " +
                      "street= ?, city = ?, state = ?, zip = ?, inEnsemble = ?, active = ? WHERE id = ?";

  db.query(
    updateQuery,
    [
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
      active,
      id,
    ],
    (error) => {
      if (error) {
        console.log(error);
        res.status(400).json(error);
      } else {
        res.status(200).json({ status: "OK" });
      }
    }
  );
});

musicians.delete("/", function (req, res) {
  // get query param
  let id = req.query.id;

  // parse
  id = parseInt(id);
  id = isNaN(id) ? null : id;

  // query
  const deleteQuery = "DELETE FROM Musicians WHERE id = ?;";

  db.query(deleteQuery, [id], (error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json({ status: "OK" });
    }
  });
});

export default musicians;
