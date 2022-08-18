const sql = require("./db.js");

exports.getByFields = (clientName, clientTelephone, result) => {

    let query = 'SELECT * FROM client WHERE client_name = ?'

    let params = [
        clientName
    ]
    // SE RECEBER O NÚMERO DE TELEFONE, O MESMO SERÁ CONSIDERADO NAS BUSCAS
    if(clientTelephone){
        query += ' OR client_telephone = ?'
        params.push(clientTelephone)
    }

    sql.query(query, params, (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}