module.exports = app => {
    const paymentController = require("../controllers/payment.controller.js");
  
    var router = require("express").Router();
  
    router.get('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The payment API is running'
      })
    })
  
    router.post('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The payment API is running'
      })
    })
  
    router.get('/get', paymentController.findAll)
  
    //router.get('/get:subcategoryKey', subcategoryController.findByKey)
  
    app.use('/payment', router);
  };
  