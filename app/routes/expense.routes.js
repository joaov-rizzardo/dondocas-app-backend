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

    router.get('/get/:year/:month', expenseController.findExpenses)

    router.put('/update', expenseController.updateExpense)

    router.put('/inactivate/:expenseKey', expenseController.inactivateExpense)

    router.post('/category/create', expenseController.createCategory)

    router.get('/expensePerMonth/:year/:month', expenseController.getTotalExpensesByMonth)

    router.get('/amountPerCategory/:year/:month', expenseController.getAmountByCategory)

    router.get('/amountPerCategory', expenseController.getAmountByCategory)

    router.post('/amountPerCategory', expenseController.getAmountByCategory)

    router.post('/totalExpensePerPeriod', expenseController.findTotalExpensePerPeriod)

    app.use('/expense', router);
  };
  