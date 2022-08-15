module.exports = app => {
    const sizesController = require("../controllers/sizes.controller.js");
  
    var router = require("express").Router();
  
    router.get('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The sizes API is running'
      })
    })
  
    router.post('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The sizes API is running'
      })
    })
  
    router.get('/get', sizesController.findAll)
  
  
    app.use('/sizes', router);
  };
  