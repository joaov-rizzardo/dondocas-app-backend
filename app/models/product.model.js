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
    sql.query('SELECT p.*, pc.category_description, ps.subcategory_description FROM product AS p INNER JOIN product_category AS pc ON p.category_key = pc.category_key INNER JOIN product_subcategory AS ps ON ps.subcategory_key = p.subcategory_key ORDER BY product_date DESC', (err, res) => {
        if(err){
            result(err, null)
            return
        }
        
        result(null, res)
    })
}

exports.getByCode = (productCode, subcategory, result) => {
    sql.query('SELECT * FROM product WHERE product_code = ? AND subcategory_key = ? ', [productCode, subcategory], (err, res) => {
        if(err){
            console.log(err)
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.updateProduct = (data, result) => {
    sql.query(`UPDATE product SET product_code = ?, product_description = ?, category_key = ?,subcategory_key = ?,
product_cash_payment_value = ?, product_deferred_payment_value = ?, product_purchase_value = ? WHERE product_key = ?`,
        [data.productCode, data.productDescription, data.categoryKey, data.subcategoryKey, data.productCashPaymentValue, data.productDeferredPaymentValue, data.productPurchaseValue, data.productKey], (err, res) => {
            if (err) {
                result(err, false)
                return
            }
            result(null, true)
        })
}

exports.changeStatus = (data, result) => {
    sql.query('UPDATE product SET product_status = ? WHERE product_key = ?', [data.productStatus, data.productKey], (err, res) => {
        if (err) {
            result(err, false)
            return
        }
        result(null, true)
    })
}

exports.deleteByKey = (product_key, result) => {
    sql.query('DELETE FROM product WHERE product_key = ?', [product_key], (err, res) => {
        if (err) {
            result(err, false)
            return
        }
        result(null, true)
    })
}