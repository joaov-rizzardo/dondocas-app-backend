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

    let query = "SELECT * FROM expense WHERE expense_status = 'A'"

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
    sql.query("INSERT INTO expense SET expense_description = ?, category_key = ?, expense_value = ?", [params.expenseDescription, params.categoryKey, params.expenseValue], (err, res) => {
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