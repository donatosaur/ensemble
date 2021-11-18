import path from "path";
import morgan from "morgan";
import fs from "fs";

// Logging file
let logFileStream = fs.createWriteStream(
  path.join(path.resolve(), "/logs/responses.log"),
  { flags: "a" }
);

// determines which requests to log response for
function skip(req) {
  let { url } = req;
  // do not skip requests for homepage
  if (url === "/") return false;
  // skip requests for these file extensions
  if (url.match(/(js|jpg|png|json|js|ico|css|woff|woff2|map|txt)$/)) {
    return true;
  }
  // do not skip any other requests
  return false;
}

// response logging middleware function
const loggingMiddleware = morgan("combined", {
  skip: skip,
  stream: logFileStream,
});

export default loggingMiddleware;
