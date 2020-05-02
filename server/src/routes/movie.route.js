const Router = require("koa-router");
const movie = require("../controllers/movie.controller");
const router = new Router();

router.get("/search", movie.search);
router.get("/movie/:id", movie.getDetails);

module.exports = router.routes();
