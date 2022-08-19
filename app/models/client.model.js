const sql = require("./db.js");

exports.getByFields = (clientName, clientTelephone, result) => {

    let params = []

    let query = 'SELECT * FROM client'
    
    if(!clientName && !clientTelephone){
        result('Invalid params', null)
        return
    }

    // CONDIÇÃO QUANDO OS DOIS PARAMETROS SÃO PREENCHIDOS
    if(clientName && clientTelephone){
        query += ' WHERE client_name = ? OR client_telephone = ?'
        params = [clientName, clientTelephone]
    }

    // CONDIÇÃO QUANDO APENAS CLIENT_NAME É PREENCHIDO
    if(clientName && !clientTelephone){
        query += ' WHERE client_name = ?'
        params = [clientName]
    }

    // CONDIÇÃO QUANDO APENAS CLIENT_TELEPHONE É PREENCHIDO
    if(!clientName && clientTelephone){
        query += ' WHERE client_telephone = ?'
        params = [clientTelephone]
    }

    sql.query(query, params, (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}

exports.createClient = (clientName, clientTelephone, result) => {
    sql.query('INSERT INTO client SET client_name = ?, client_telephone = ?', [clientName, clientTelephone], (err, res) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, res)
    })
}

exports.updateClient = (clientData, result) => {
    let query = 'UPDATE client SET'

    let params = []

    if(clientData.client_name && clientData.client_telephone){
        query += ' client_name = ?, client_telephone = ?'
        params = [clientData.client_name, clientData.client_telephone]
    }

    if(clientData.client_name && !clientData.client_telephone){
        query += ' client_name = ?'
        params = [clientData.client_name]
    }

    if(!clientData.client_name && clientData.client_telephone){
        query += ' client_telephone = ?'
        params = [clientData.client_telephone]
    }

    query += ', client_update_date = now()'

    query += ' WHERE client_key = ?'

    params.push(clientData.client_key)
    
    
    sql.query(query, params, (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, res)
    })
}