const sql = require("./db.js");

exports.createProfile = (description, level, result) => {
    sql.query("INSERT INTO user_profile SET profile_description = ?, profile_level = ?", [description, level], (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}

exports.createUser = (params, result) => {
    sql.query("INSERT INTO user SET user_identification = ?, user_password = ?, user_name = ?, user_profile = ?", [params.identification, params.password, params.name, params.profile], (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}


exports.getUser = (identification, result) => {
    sql.query("SELECT * FROM vw_user WHERE user_identification = ?", [identification], (err, res) => {
        if(err){
            result(err, null)
            return
        }
        result(null, res)
    })
}

