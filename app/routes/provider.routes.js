module.exports = app => {
    const providerController = require("../controllers/provider.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The provider API is running'
      })
    })

    router.post('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The category API is running'
      })
    })

    router.get('/get', providerController.findAll)

    router.post('/create', providerController.create)

    router.put('/update', providerController.update)

    router.put('/inactivate', providerController.inactivate)
    
    app.use('/provider', router);
  };
  