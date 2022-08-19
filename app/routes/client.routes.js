module.exports = app => {
    const clientController = require("../controllers/client.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The client API is running'
      })
    })

    router.post('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The client API is running'
      })
    })

    router.post('/getByFields', clientController.findByFields)

    router.post('/create', clientController.create)

    router.put('/update', clientController.update)

    app.use('/client', router);
  };
  