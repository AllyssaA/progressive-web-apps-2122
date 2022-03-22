const express = require("express");
const ejs = require("ejs");

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
  res.render("index", {
    pageTitle: `Home | Rijksmuseum collection`,
  });
});

app.get("test", (req, res) => {
  res.render("test", {
    pageTitle: "Test",
  });
});

// fetch("https://www.rijksmuseum.nl/api/nl/collection?key=0tlmzj3f")
//   .then((res) => res.json())
//   .then((json) => console.log(json));

(async () => {
  const res = await fetch(
    "https://www.rijksmuseum.nl/api/nl/collection?key=0tlmzj3f"
  );
  const json = await res.json();
  console.log(json);
})();

// setup server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const response = await fetch("https://httpbin.org/post", {
//   method: "POST",
//   body: "a=1",
// });
// const data = await response.json();

// console.log(data);
