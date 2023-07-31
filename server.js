const express = require("express"); // it is similar to import and export keywords in clientside
const mysql = require("mysql");
const cors = require("cors");//Cross-Origin Resource Sharing (CORS). It allows servers to specify who can access their resources and helps prevent cross-origin security issues
require("dotenv").config(); //used in Node.js to load environment variables from a .env file into the application's environment.

const app = express(); 
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

const listener = app.listen(3001, () => {
  console.log("App is listening on port " + listener.address().port);
});

app.get("/epf/:uan", (req, res) => {
  const sqlQuery = `SELECT * FROM feb2017 where uan = '${req.params.uan}'`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else { 
      res.send(result);
    }
  });
});
