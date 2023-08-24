const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const dirname = path.dirname("");

const buildPath = path.join(dirname, "./build");

const app = express();
app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("App is listening on port " + listener.address().port);
});


app.get("/epf/:uan", (req, res) => {
  const sqlQuery = `CALL epfdata.EPF3A(${req.params.uan})`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result[0]);
    }
  });

  
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"), (err) => {
    res.status(500).send(err);
  });
});
});
