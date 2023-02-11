const { Router } = require("express");
const router = Router();
const {
  getCategorys,
  postCategorys,
} = require("../controllers/categorysControllers");

router.get("/", getCategorys);

router.post("/", postCategorys);

module.exports = router;
