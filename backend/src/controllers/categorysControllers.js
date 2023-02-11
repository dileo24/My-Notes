const { Category, Note } = require("../db.js");

const getCategorys = async (req, res) => {
  try {
    const data = await Category.findAll();
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postCategorys = async (req, res) => {
  const { name } = req.body;

  try {
    const data = await Category.create({
      name,
    });
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getCategorys,
  postCategorys,
};
