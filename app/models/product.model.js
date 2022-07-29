const sql = require("./db.js");

exports.createProduct = (data, result) => {
    sql.query(`INSERT INTO product SET product_code = ?, product_description = ?, category_key = ?,subcategory_key = ?,
product_cash_payment_value = ?, product_deferred_payment_value = ?, product_purchase_value = ?`,
        [data.productCode, data.productDescription, data.categoryKey, data.subcategoryKey, data.productCashPaymentValue, data.productDeferredPaymentValue, data.productPurchaseValue], (err, res) => {
            if (err) {
                result(err, false)
                return
            }
            result(null, true)
        })
}

exports.getAll = result => {
    sql.query('SELECT * FROM product', (err, res) => {
        if(err){
            result(err, null)
            return
        }
        
        result(null, res)
    })
}

exports.getByCode = (productCode, result) => {
    sql.query('SELECT * FROM product WHERE product_code = ?', [productCode], (err, res) => {
        if(err){
            console.log(err)
            result(err, null)
            return
        }

        result(null, res)
    })
}