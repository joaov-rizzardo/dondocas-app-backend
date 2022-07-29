module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The category API is running'
      })
    })

    router.post('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The category API is running'
      })
    })

    router.get('/get', categoryController.findAll)

    router.get('/get/:categoryKey', categoryController.findByKey)

    app.use('/category', router);
  };
  