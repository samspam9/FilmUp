const Koa = require("koa");
const respond = require("koa-respond");
const bodyParser = require("koa-bodyparser");
const cors = require("koa-cors");

const movieRoutes = require("./routes/movie.route.js");

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser());
app.use(respond());

app.use(movieRoutes);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
