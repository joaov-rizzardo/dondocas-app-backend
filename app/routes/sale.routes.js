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

    router.post('/get', saleController.getSaleByDate)

    router.post('/get/dailyInfo', saleController.getDailyInfo)
  
    router.post('/create', saleController.validateCreateRequest)

    router.post('/dailySales', saleController.findDailySales)

    router.post('/salePerWeekday', saleController.findSalePerWeekday)
  
    app.use('/sale', router);
  };
  