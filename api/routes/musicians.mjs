import express from "express";
import db from "../database/db_connector.mjs";
import * as sendResponse from "../responses.mjs";

let musicians = express.Router();

/**
 * CREATE  POST    /api/Musicians
 * READ    GET     /api/Musicians[?field=...]
 * UPDATE  PUT     /api/Musicians?id=...
 * DELETE  DELETE  /api/Musicians?id=...
 */

// CREATE
musicians.post("/", (req, res) => {
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.birthdate,
    req.body.email,
    req.body.phoneNumber,
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.inEnsemble,
    req.body.active,
  ];

  const createQuery = "INSERT INTO Musicians (firstName, lastName, birthdate, email, phoneNumber, street, city, " +
                      "state, zip, inEnsemble, active) VALUES (?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?);";

  db.query(createQuery, values, sendResponse.insertResponse(res));
});


// READ
musicians.get("/", (req, res, next) => {
  // check whether there are any query parameters
  if (req.query === undefined || Object.keys(req.query).length === 0) {
    next();
    return;
  }

  let [key, value] = Object.entries(req.query)[0];  // only look for the first key-value pair
  const formatString = () => value = `%${value}%`;  // properly format LIKE queries

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

  db.query(filterQuery, [value], sendResponse.selectResponse(res));
});


musicians.get("/", (req, res) => {
  db.query("SELECT * FROM Musicians;", sendResponse.selectResponse(res));
});


// UPDATE
musicians.put("/", function (req, res) {
  const values = [
    safeParseInt(req.query.id),
    req.body.firstName,
    req.body.lastName,
    req.body.birthdate,
    req.body.email,
    req.body.phoneNumber,
    req.body.street,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.inEnsemble,
    req.body.active,
  ];

  const updateQuery = "UPDATE Musicians SET firstName = ?, lastName = ?, birthdate = ?, email = ?, phoneNumber= ?, " +
                      "street= ?, city = ?, state = ?, zip = ?, inEnsemble = ?, active = ? WHERE id = ?";

  db.query(updateQuery, values, sendResponse.insertResponse(res));
});

musicians.delete("/", function (req, res) {
  const values = [safeParseInt(req.query.id)];
  const deleteQuery = "DELETE FROM Musicians WHERE id = ?;";

  db.query(deleteQuery, values, sendResponse.deleteResponse(res));
});

export default musicians;
