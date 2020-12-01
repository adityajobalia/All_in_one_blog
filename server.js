const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const articleRouter = require("./routes/article");
const mongoose = require("mongoose");
const articleSchema = require("./models/article");

const url = ''
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true },
  (err) => {
    console.log("Database connected-----", err);
  }
);

app.use(express.urlencoded({ extended: false }));
app.use("/articles", articleRouter);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
    const articles = await articleSchema.find().sort({ createdAt : 'desc' })
  res.render("articles/index", { articles: articles });
});

app.listen(5000);
