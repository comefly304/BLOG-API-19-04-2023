const CategoryRouter = require("express").Router()
const Category = require("../models/category.model")

CategoryRouter.post("/create", async (req, res) => {
  const newCat = new Category(req.body)
  try {
    const savedCat = await newCat.save()
    res.status(200).json({
        msg:"category created successfully...",
        data:savedCat
    })
  } catch (error) {
    res.status(500).json(error)
  }
})


// get all cat
CategoryRouter.get("/get", async (req, res) => {
  try {
    const cat = await Category.find()
    res.status(200).json(cat)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = CategoryRouter