const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
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
  const sqlQuery = `SELECT * FROM jun2023 where uan = '${req.params.uan}'`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else { 
      res.send(result);
    }
  });
});
