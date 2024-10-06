const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const client = require("smartsheet");
require("dotenv").config();
const { ACCESS_TOKEN, PORT } = process.env;

const app = express();
app.use(morgan());
app.use(bodyParser.json());

const smartsheet = client.createClient({
  accessToken: ACCESS_TOKEN,
  logLevel: "info",
});

const options = {
  queryParameters: {
    // include: "attachments",
    includeAll: true,
  },
};

smartsheet.sheets
  .listSheets(options)
  .then((result) => {
    for (let i of result.data) {
      // console.log(i);
    }
    const sheetId = result.data[2].id;
    console.log(sheetId);
    smartsheet.sheets
      .getSheet({ id: sheetId })
      .then((sheetInfo) => {
        // console.log(sheetInfo);
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

smartsheet.reports
  .listReports()
  .then((result) => {
    // Loop through the list of reports and log each report's details
    // for (let i of result.data) {
    //   console.log(i);
    // }

    // Get the first report's ID and use it to get more information
    const reportId = result.data[0].id;
    // console.log("First Report ID:", reportId);

    // Fetch specific report details
    smartsheet.reports
      .getReport({ id: 2911177696825220 })
      .then((reportInfo) => {
        console.log("Report Details:", reportInfo.rows[0].cells);
      })
      .catch((err) => console.log("Error fetching report:", err));
  })
  .catch((err) => console.log("Error listing reports:", err));

app.listen(PORT, () => {
  console.log(`server is listening port ${PORT}`);
});
