module.exports = app => {
    const subcategoryController = require("../controllers/subcategory.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', subcategoryController.sendApiStatus)

    router.get('/get', subcategoryController.findAll)

    router.get('/get:subcategoryKey', subcategoryController.findByKey)

    app.use('/subcategory', router);
  };
  