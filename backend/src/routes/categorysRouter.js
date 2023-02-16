const { Router } = require("express");
const router = Router();
const {
  getCategorys,
  postCategorys,
  deleteCategory,
} = require("../controllers/categorysControllers");

router.get("/", getCategorys);

router.post("/", postCategorys);

router.delete("/:id", deleteCategory);

module.exports = router;
