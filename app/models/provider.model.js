const sql = require("./db.js");

exports.getAll = result => {
    sql.query("SELECT * FROM vw_provider ORDER BY provider_date DESC", (err, res) => {
        if(err){
            result(err, null)
            return
        }

        result(null, res)
    })
}

exports.createProvider = (args, result) => {
    sql.query("INSERT INTO provider (provider_name, provider_telephone, provider_email, provider_category, provider_site) VALUES (?)", [[args.providerName, args.providerTelephone, args.providerEmail, args.providerCategory, args.providerSite]], (err, res) => {
        if(err){
            result(err, null)
            console.log(err)
            return
        }
        result(null, res)
    })
}

exports.updateProvider = (args, result) => {
    sql.query("UPDATE provider SET provider_name = ?, provider_telephone = ?, provider_email = ?, provider_category = ?, provider_site = ? WHERE provider_key = ?", [args.providerName, args.providerTelephone, args.providerEmail, args.providerCategory, args.providerSite, args.providerKey], (err, res) => {
        if(err){
            result(err, null)
            console.log(err)
            return
        }
        result(null, res)
    })
}