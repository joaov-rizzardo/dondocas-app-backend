const sql = require("./db.js");

exports.getAll = (result) => {
    sql.query("SELECT * FROM product_subcategory", (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}

exports.getByKey = (subcategoryKey, result) => {
    sql.query("SELECT * FROM product_subcategory WHERE subcategory_key = ?", [subcategoryKey], (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}