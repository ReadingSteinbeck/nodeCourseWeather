const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { request } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Alex",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText: "This is a message is in app.js",
    name: "Sasha Braus",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(lat, lng, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
  // res.send({
  //   forecast: "sunny",
  //   location: "Philadelphia",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "Help Article not found",
    name: "Falco Grice",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "PAGE DOES NOT EXIST!",
    name: "Gabi Braun",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
