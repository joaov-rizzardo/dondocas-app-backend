module.exports = app => {
    const colorsController = require("../controllers/colors.controller.js");
  
    var router = require("express").Router();
  
    router.get('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The colors API is running'
      })
    })
  
    router.post('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The colors API is running'
      })
    })
  
    router.get('/get', colorsController.findAll)
  
    //router.get('/get:subcategoryKey', subcategoryController.findByKey)
  
    app.use('/colors', router);
  };
  