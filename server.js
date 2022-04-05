require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const manifest = require("./static/manifest.json");

// Create express app
const app = express();

const compression = require("compression");

app.use(compression());

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
        // manifest,
      });
    })
    .catch((err) => res.send(err));
});

// detail art page
app.get("/art/:id", (req, res) => {
  fetch(
    `https://www.rijksmuseum.nl/api/nl/collection/${req.params.id}?key=0tlmzj3f`
  )
    .then(async (response) => {
      const artCollection = await response.json();
      res.render("detail", {
        pageTitle: "Detailpage | Rijksmuseum collection",
        data: artCollection.artObject,
      });
    })
    .catch((err) => res.send(err));
});

app.get("/search", (req, res) => {
  fetch(
    `https://www.rijksmuseum.nl/api/nl/collection?key=0tlmzj3f&q=${req.query.search}&rs=20`
  )
    .then(async (response) => {
      const artCollection = await response.json();
      res.render("index", {
        pageTitle: "Home | Rijksmuseum collection",
        data: artCollection.artObjects,
      });
    })
    .catch((err) => res.send(err));
});

app.get("/offline", (req, res) => {
  res.render("offline", {
    pageTitle: "Offline | Rijksmuseum collection",
  });
});

// setup server
app.set("port", process.env.PORT || 8000);

const server = app.listen(app.get("port"), function () {
  console.log(`Server app started on port : ${app.get("port")}`);
});
