const { Category } = require("../db.js");

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

const deleteCategory = async (req, res) => {
  try {
    let { id } = req.params;
    const category = await Category.findByPk(id);

    console.log(category);
    await category.destroy();
    res.status(200).json(category);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  getCategorys,
  postCategorys,
  deleteCategory,
};
