module.exports = app => {
    const saleController = require("../controllers/sale.controller.js");
  
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
  
    router.post('/create', saleController.validateCreateRequest)
  
  
    app.use('/sale', router);
  };
  