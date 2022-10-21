const sql = require("./db.js");

exports.getAllCategory = (result) => {
    
    sql.query("SELECT * FROM expense_category WHERE category_status = 'A'", (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.createCategory = (categoryDescription , result) => {

    sql.query("INSERT INTO expense_category SET category_description = ?", [categoryDescription], (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, true)
    })
}

exports.getExpenses = (result, expenseYear = false, expenseMonth = false) => {
    
    const params = []

    let query = "SELECT * FROM vw_expense WHERE expense_status = 'A'"

    if(expenseYear !== false && expenseMonth !==  false){
        const condition = `${expenseYear}-${expenseMonth}%`

        query = `${query} AND expense_date LIKE ?`

        params.push(condition)
    }

    sql.query(query, params, (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.createExpense = (params, result) => {
    sql.query("INSERT INTO expense SET expense_description = ?, category_key = ?, expense_value = ?, expense_date = ?", [params.expenseDescription, params.categoryKey, params.expenseValue, params.expenseDate], (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, true)
    })
}

exports.updateExpense = (params, result) => {
    sql.query("UPDATE expense SET expense_description = ?, category_key = ?, expense_value = ? WHERE expense_key = ?", [params.expenseDescription, params.categoryKey, params.expenseValue, params.expenseKey], (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, true)
    })
}

exports.inactivateExpense = (expenseKey, result) => {
    sql.query("UPDATE expense SET expense_status = 'I' WHERE expense_key = ?", [expenseKey], (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, true)
    })
}

exports.findTotalExpensesByMonth = (year, month, result) => {
    const condition = `${year}-${month}%`

    sql.query("SELECT IFNULL(SUM(IFNULL(expense_value, 0)), 0) AS totalAmount FROM expense WHERE expense_status = 'A' AND expense_date LIKE ?", [condition], (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.findAmountByCategory = (args, result) => {

    let query = 'SELECT IFNULL(SUM(expense_value), 0) AS amount, category_key, category_description FROM vw_exp_gp_categ WHERE 0 = 0'

    let params = []

    if(args.month && args.year){
        const condition = `${args.year}-${args.month}%`
        query += " AND expense_date LIKE ?"
        params.push(condition)

    }else if(args.startDate && args.finishDate){
        query += " AND expense_date BETWEEN ? AND ?"
        params.push(args.startDate)
        params.push(args.finishDate)
    }

    query += " GROUP BY category_key"

    sql.query(query, params, (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.getTotalExpensePerPeriod = (data, result) => {
    sql.query("SELECT IFNULL(SUM(expense_value), 0) AS 'totalAmount' from expense WHERE expense_date BETWEEN ? AND ?", [data.startDate + ' 00:00:00', data.finishDate + ' 23:59:59'], (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, res)
    })
}