const sql = require("./db.js");

exports.getAll = (result) => {

    sql.query("SELECT * FROM product_category", (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}