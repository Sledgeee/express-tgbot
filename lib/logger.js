const fs = require("fs");
const util = require("util");
const DateTime = require("./datetime");
process.env["NTBA_FIX_350"] = 1;

!fs.existsSync("logs") && fs.mkdirSync("logs");
const logFile = fs.createWriteStream(
  `logs/log-${DateTime.nowUtcFormatted()}.log`,
  { flags: "a" }
);
const logStdout = process.stdout;

console.log = function () {
  logFile.write(
    `[${DateTime.now().format("DD.MM.YYYY HH:mm:ss")}] ` +
      util.format.apply(null, arguments) +
      "\n"
  );
  logStdout.write(
    `[${DateTime.now().format("DD.MM.YYYY HH:mm:ss")}] ` +
      util.format.apply(null, arguments) +
      "\n"
  );
};
console.error = console.log;
