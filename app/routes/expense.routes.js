module.exports = app => {
    const expenseController = require("../controllers/expense.controller.js");
  
    var router = require("express").Router();
    
    router.get('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The expense API is running'
      })
    })

    router.post('/', (req, res) => {
      res.status(200).send({
          status: 'success',
          message: 'The expense API is running'
      })
    })

    router.get('/category/get', expenseController.findAllCategory)

    router.get('/get', expenseController.findExpenses)

    router.post('/create', expenseController.createExpense)

    router.get('/get/:month/:year', expenseController.findExpenses)

    router.post('/category/create', expenseController.createCategory)

    app.use('/expense', router);
  };
  