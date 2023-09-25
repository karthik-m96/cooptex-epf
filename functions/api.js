const express = require("express");
const mysql = require("mysql2");

const app = express();
const serverless = require('serverless-http');
const router = express.Router();

const db = mysql.createConnection(process.env.DATABASE_URL);
 db.connect();


router.get("/epf/:uan", (req, res) => {
  const sqlQuery = `select uan,name,month,wages,work_share,epf_diff_amount,pen_contr,already_remitted,difference_amount,year,month from 2017to2023 where uan=${req.params.uan}`;
  db.query(sqlQuery, (err, rows, fields) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(rows);
    }
  });
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);