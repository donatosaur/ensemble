import path from "path";
import morgan from "morgan";
import fs from "fs";
import chalk from "chalk";

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

const morganConfig = (tokens, req, res) => {
  try {
    let color;
    switch (req.method) {
      case "PUT":
        color = "#EAEA1A";
        break;
      case "POST":
        color = "#EA461A";
        break;
      default:
        color = "#1AEA20";
    }
    return [
      chalk.greenBright.bold(tokens["response-time"](req, res) + " ms"),
      chalk.redBright.bold("@ " + tokens.date(req, res)),
      chalk.hex(color).bold(tokens.method(req, res)),
      chalk.hex("#ffb142").bold(tokens.status(req, res)),
      chalk.hex("#ff5252").bold(tokens.url(req, res)),
      // chalk.hex("#2ed573").bold(tokens.res(req, res, "content-length")),
      chalk.yellow(tokens["remote-addr"](req, res)),
      chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
      chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
    ].join(" ");
  } catch (e) {
    console.error(e);
  }
};

// response logging middleware function
const loggingMiddleware = morgan(morganConfig, {
  skip: skip,
  stream: logFileStream,
});

export default loggingMiddleware;
