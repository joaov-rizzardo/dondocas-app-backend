module.exports = app => {

    const userController = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.get('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The user API is running'
      })
    })
  
    router.post('/', (req, res) => {      
      res.status(200).send({
        status: 'success',
        message: 'The user API is running'
      })
    })
  
    router.post('/profile/create', userController.createProfile)

    router.post('/create', userController.createUser)

    router.post('/authenticate', userController.authenticate)

    app.use('/user', router);
  };
  