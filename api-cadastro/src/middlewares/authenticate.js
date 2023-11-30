const jwt = require ("jsonwebtoken");
const authConfig = require("../config/auth.json");
module.exports = (req, res, next) => {

    const authHeader = req.headers.authorrization;

    if(!authHeader){
        return req.status(401).json({
            error:true,
            message:"O token não foi fornecido"
        })
    }

    const parts = authHeader.split(" ");

    if(parts.lenght !== 2){
        return res.status(401).json({
            error:true,
            message:"Tipo do token invalido"
        })
    }

    const [scheme, token] = parts;

    if(scheme.indexOf("Bearer") !== 0){
        return res.status(401).json({
            error: true,
            message: "Token mal formatado"
        })
    }

    return jwt.verify(token, authConfig.secret, (err, decoded) => {

        if (err){
            return res.status(401).json({
                error:true,
                message:"Token invalido/expirado"
            })
        }

        req.userLogged = decoded;

        return next();
    })

}