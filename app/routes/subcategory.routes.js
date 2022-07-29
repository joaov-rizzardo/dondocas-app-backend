module.exports = app => {
  const subcategoryController = require("../controllers/subcategory.controller.js");

  var router = require("express").Router();

  router.get('/', (req, res) => {
    res.status(200).send({
      status: 'success',
      message: 'The subcategory API is running'
    })
  })

  router.post('/', (req, res) => {
    res.status(200).send({
      status: 'success',
      message: 'The subcategory API is running'
    })
  })

  router.get('/get', subcategoryController.findAll)

  router.get('/get:subcategoryKey', subcategoryController.findByKey)

  app.use('/subcategory', router);
};
