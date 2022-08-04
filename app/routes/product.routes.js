module.exports = app => {
    const productController = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The product API is running'
      })
    })

    router.post('/', (req, res) => {
      res.status(200).send({
        status: 'success',
        message: 'The product API is running'
      })
    })

    router.post('/update', productController.update)

    // ROTA PARA RETORNAR TODOS OS PRODUTOS CADASTRADOS
    router.get('/get', productController.findAll)

    router.get('/get/:subcategory/:productCode', productController.findByCode)

    // ROTA PARA CRIAÇÃO DE PRODUTO
    router.post('/create', productController.create)

    app.use('/product', router);
  };
  