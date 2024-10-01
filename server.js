// importdependencies
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

const app = express();

const PORT = process.env.PORT || 3000;

//configure environmental variables
dotenv.config();

//create a db connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//test connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as ID " + db.threadId);
});

// Question 1 Retrieve all patients
app.get("/allpatients", (req, res) => {
  const getPatientsQuery = "SELECT * FROM patients";

  db.query(getPatientsQuery, (err, results) => {
    if (err) {
      console.error("Error Executing query: " + err.stack);
      res.status(500).send("Error fetching patients");
      return;
    }

    res.status(200).json(results);
  });
});

// Question 2 Retrieve all providers

app.get("/allproviders", (req, res) => {
  const getProvidersQuery =
    "SELECT first_name,last_name,provider_specialty FROM providers;";

  db.query(getProvidersQuery, (err, results) => {
    if (err) {
      console.error("Error Executing query: " + err.stack);
      res.status(500).send("Error fetching providers");
      return;
    }

    res.status(200).json(results);
  });
});

// Question 3 Filter patients by First Name
app.get("/patientsfirstname", (req, res) => {
  const getPatientsFirstname = "SELECT first_name FROM patients";

  db.query(getPatientsFirstname, (err, results) => {
    if (err) {
      console.error("Error Executing query: " + err.stack);
      res.status(500).send("Error fetching patients firstnames");
    }

    res.status(200).json(results);
    // res.status(200).send(results);
  });
});
// Question 4 Retrieve all providers by their specialty

app.get("/providerspeciality", (req, res) => {
  const getProvidersSpecialty =
    "SELECT first_name,last_name,provider_specialty FROM providers ORDER BY provider_specialty";

  db.query(getProvidersSpecialty, (err, results) => {
    if (err) {
      console.error("Error Executing query: " + err.stack);
      res.status(500).send("Error fetching Providers Specialties " + err.stack);
    }

    res.status(200).json(results);
  });
});

//start and listen to the server
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`);
});
