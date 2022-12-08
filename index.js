const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const client = require("smartsheet");
require('dotenv').config();
const {ACCESS_TOKEN, PORT} = process.env

const app = express()
app.use(morgan());
app.use(bodyParser.json())

const smartsheet = client.createClient({
  accessToken:ACCESS_TOKEN,
  logLevel: "info"
});

const options = {
  queryParameters: {
    // include: "attachments",
    includeAll: true
  }
};

smartsheet.sheets.listSheets(options).then((result)=> {
  const sheetId = result.data[0].id
  smartsheet.sheets.getSheet({id: sheetId})
    .then((sheetInfo)=> console.log(sheetInfo))
    .catch((err)=> console.log(err))
}).catch((err)=> console.log(err));

app.listen(PORT, ()=> {
  console.log(`server is listening port ${PORT}`)
})