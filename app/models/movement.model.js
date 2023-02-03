const sql = require("./db.js");

exports.getLastMovements = (result) => {

    sql.query("SELECT * FROM vw_movements ORDER BY date DESC LIMIT 20", (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}
