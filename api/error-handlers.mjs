
/**
 * Error-handling middleware for errors thrown by mysql
 */
export function sqlErrorHandler(err, req, res, next) {
  if (err.fatal) {
    console.error(err);
    res.status(503).json(err);
  } else if (err.sqlMessage) {
    console.log(err);
    res.status(400).json(err);
  } else {
    next(err);
  }
}
