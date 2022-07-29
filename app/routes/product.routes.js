module.exports = app => {
    const productController = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
    
    //router.get('/', categoryController.sendApiStatus)

    //router.get('/get', categoryController.findAll)

    //router.get('/get/:productCode', categoryController.findByKey)

    router.post('/create', productController.create)

    app.use('/product', router);
  };
  