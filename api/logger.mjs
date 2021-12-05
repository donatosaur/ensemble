import path from "path";
import fs from "fs";
import morgan from "morgan";
import chalk from "chalk";

// set directory for log file
const LOG_DIR = "./logs";

// create the directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

// set the log output file
const logFileStream = fs.createWriteStream(
  path.resolve(LOG_DIR, "responses.log"),
  { flags: "a" }
);

const morganConfig = (tokens, req, res) => {
  try {
    // color requests by CRUD type (PUT -> yellow, POST -> red, GET -> green, DELETE -> green)
    const requestColor = req.method === "PUT" ? "#EAEA1A" : req.method === "POST" ? "#EA461A" : "#19EA20";

    /**
     * Customize the morgan logger by adding color to it.
     * For the token formatting, see "using a custom format function" at https://github.com/expressjs/morgan#readme
     * For chalk color definitions, see https://www.npmjs.com/package/chalk (especially "define your own theme")
     *
     *
     * **NOTE**: the color scheme and text formatting here was adapted from the following github post made by Param
     * Singh (source url https://github.com/expressjs/morgan/issues/53#issuecomment-393182002 accessed Nov 2021)
     */
    return [
      chalk.green(`${tokens["total-time"](req, res)?.padStart(8, " ")} ms`),    // total time (####.### is 8 chars)
      chalk.redBright(`@ ${tokens.date(req, res)}`),                            // date
      chalk.hex(requestColor)(tokens.method(req, res)),                         // method
      chalk.hex("#FCBA03")(tokens.status(req, res)),                            // status
      chalk.hex("#FF4040")(tokens.url(req, res)),                               // url
      chalk.hex("#FFDD00")(tokens["remote-addr"](req, res)),                    // ip
      chalk.blueBright(tokens["user-agent"](req, res)),                         // agent (browser, OS)
    ].join(" ");
  } catch (error) {
    // if something goes wrong, log it and just fall back to morgan's defaults (by not returning anything)
    console.error(error);
  }
};

/**
 * Create morgan logging middleware. We only want to log requests for an actual endpoint on the server, and not
 * for any files (JS, fonts, css, images etc). Our endpoints don't have a dot in them, but file extensions always
 * will, so we can accomplish this by simply checking for a dot character in the request url.
 */

const loggingMiddleware = morgan(morganConfig, {
  skip: (req) => req.url?.includes("."),
  stream: logFileStream,
});

export default loggingMiddleware;
