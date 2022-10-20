const sql = require("./db.js");

exports.createHeader = (data, result) => {

    sql.query("INSERT INTO sale(client_key, payment_key, sale_net_amount, sale_gross_amount, sale_cost, sale_date) VALUES (?)", [[data.client_key, data.payment_key, data.sale_net_amount, data.sale_gross_amount, data.sale_cost, data.sale_date]], (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}

exports.createItems = (products, result) => {
    sql.query("INSERT INTO sale_item(sale_key, product_code, product_description, category_key, subcategory_key, color_key, size_key, product_unit_cost, product_quantity, product_unit_amount) VALUES ?", [products], (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}

exports.getSaleHeader = (saleDate, result) => {
    sql.query("SELECT s.*, date_format(s.sale_date, '%H:%i:%s') AS 'sale_hour', c.client_name, pf.payment_description FROM sale AS s INNER JOIN payment_form as pf ON pf.payment_key = s.payment_key INNER JOIN client AS c ON c.client_key = s.client_key WHERE sale_date BETWEEN ? AND ? ORDER BY sale_date DESC", [saleDate + ' 00:00:00', saleDate + ' 23:59:59'], async (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        let sales = []

        for (const sale of res) {
            const items = await getSaleItems(sale.sale_key)

            const salePayload = {
                ...sale,
                products: items
            }

            sales.push(salePayload)
        }

        result(null, sales)
    })
}

const getSaleItems = (sale_key) => {

    return new Promise((resolve, reject) => {
        sql.query('SELECT si.*, pc.category_description, ps.subcategory_description, c.color_description, psi.size_description FROM sale_item AS si INNER JOIN product_category AS pc ON pc.category_key = si.category_key INNER JOIN product_subcategory AS ps ON ps.subcategory_key = si.subcategory_key INNER JOIN colors AS c ON c.color_key = si.color_key INNER JOIN product_sizes AS psi ON psi.size_key = si.size_key WHERE sale_key = ?', [sale_key], (err, res) => {
            if (err) {
                reject(new Error(err.message))
                return
            }
            resolve(res)
        })
    })

}

exports.getDailyInfo = (saleDate, result) => {
    sql.query("SELECT IFNULL(SUM(sale_net_amount), 0) AS 'grossAmount', IFNULL(SUM((sale_net_amount - sale_cost)), 0) AS 'netAmount', IFNULL(SUM(sale_cost), 0) AS 'cost' FROM sale WHERE sale_date BETWEEN ? AND ?", [saleDate + ' 00:00:00', saleDate + ' 23:59:59'], (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.getDailySales = (startDate, finishDate, result) => {
    sql.query("SELECT DATE_FORMAT(sale_date, '%d/%m/%Y') AS 'date', SUM(sale_net_amount) AS 'amount' FROM sale WHERE sale_date BETWEEN ? AND ? GROUP BY DATE_FORMAT(sale_date, '%d/%m/%Y') ORDER BY 'date' ASC", [startDate + ' 00:00:00', finishDate + ' 23:59:59'], (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.getSalePerWeekDay = (startDate, finishDate, result) => {
    sql.query("SELECT (CASE WHEN WEEKDAY(sale_date) = 0 THEN 'Segunda Feira' WHEN WEEKDAY(sale_date) = 1 THEN 'Terça Feira' WHEN WEEKDAY(sale_date) = 2 THEN 'Quarta Feira' WHEN WEEKDAY(sale_date) = 3 THEN 'Quinta Feira' WHEN WEEKDAY(sale_date) = 4 THEN 'Sexta Feira' WHEN WEEKDAY(sale_date) = 5 THEN 'Sábado' WHEN WEEKDAY(sale_date) = 6 THEN 'Domingo' END ) AS 'weekday', ROUND(AVG(sale_net_amount), 2) AS 'amount'  FROM sale WHERE sale_date BETWEEN ? AND ? GROUP BY WEEKDAY(sale_date) ORDER BY WEEKDAY(sale_date) ASC", [startDate + ' 00:00:00', finishDate + ' 23:59:59'], (err, res) => {
        if (err) {
            result(err, null)
            return
        }

        result(null, res)
    })
}
