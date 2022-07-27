module.exports = app => {
    const subcategoryController = require("../controllers/subcategory.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', subcategoryController.findAll)

    router.get('/:subcategoryKey', subcategoryController.findByKey)

    app.use('/subcategory', router);
  };
  