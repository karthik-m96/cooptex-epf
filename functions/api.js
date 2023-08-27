const express = require("express");
const mysql = require("mysql");

const app = express();
const serverless = require('serverless-http');
const router = express.Router();

const db = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: process.env.REACT_APP_DB,
});


router.get("/epf/:uan", (req, res) => {
  const sqlQuery = `CALL epfdata.EPF3A(${req.params.uan})`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result[0]);
    }
  });
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);