require("dotenv").config();
const express = require("express");
const { json } = require("express/lib/response");

const fetch = require("node-fetch");

const port = 3000;

// Create express app
const app = express();

// Link templating engine ejs to express
app.set("view engine", "ejs");

// Template files
app.set("views", "views");

// Use static folder
app.use(express.static("static"));

// index route
app.get("/", (req, res) => {
  fetch("https://www.rijksmuseum.nl/api/nl/collection?key=0tlmzj3f")
    // .then((res) => res.json())
    // .then((json) => console.log(json))
    .then(async (response) => {
      const artCollection = await response.json();
      res.render("index", {
        pageTitle: "Home | Rijksmuseum collection",
        data: artCollection.artObjects,
      });
    })
    .catch((err) => res.send(err));
});


// setup server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
