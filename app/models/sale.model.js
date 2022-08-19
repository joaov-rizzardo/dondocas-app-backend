const sql = require("./db.js");

exports.createHeader = (data, result) => {

    sql.query("INSERT INTO sale(client_key, payment_key, sale_net_amount, sale_gross_amount, sale_cost) VALUES (?)", [[data.client_key, data.payment_key, data.sale_net_amount, data.sale_gross_amount, data.sale_cost]], (err, res) => {
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
