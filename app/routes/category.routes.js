module.exports = app => {
    const categoryController = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', categoryController.sendApiStatus)

    router.get('/get', categoryController.findAll)

    router.get('/get/:categoryKey', categoryController.findByKey)

    app.use('/category', router);
  };
  