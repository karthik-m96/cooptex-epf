const express = require("express");
const mysql = require("mysql");

const app = express();
const serverless = require('serverless-http');
const router = express.Router();

const db = mysql.createConnection(process.env.DATABASE_URL);

router.get("/epf/:uan", (req, res) => {
  const sqlQuery = `select * from  2017to2023 where uan=${req.params.uan}`;
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