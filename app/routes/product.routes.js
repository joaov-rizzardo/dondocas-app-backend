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

    router.put('/change/status', productController.changeStatus)

    router.delete('/delete/:product_key', productController.delete)

    // ROTA PARA RETORNAR TODOS OS PRODUTOS CADASTRADOS
    router.get('/get', productController.findAll)

    router.get('/get/:subcategory/:productCode', productController.findByCode)

    // ROTA PARA CRIAÇÃO DE PRODUTO
    router.post('/create', productController.create)

    app.use('/product', router);
  };
  