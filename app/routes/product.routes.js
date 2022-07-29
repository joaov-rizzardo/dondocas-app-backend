module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', categoryController.sendApiStatus)

    router.get('/get', categoryController.findAll)

    router.get('/get/:productCode', categoryController.findByKey)

    app.use('/product', router);
  };
  