module.exports = app => {
    const movementController = require("../controllers/movement.controller.js");
  
    var router = require("express").Router();
    
    router.all('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The movement API is running'
      })
    })

    router.get('/lastMovements', movementController.findLastMovements)


    app.use('/movement', router);
  };
  