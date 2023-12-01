const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authconfig = require("../config/auth.json");

const UserModel = require("../models/User");

const router = express.Router();

const generateToken = (user = {}) => {
    return jwt.sign({
        id: user.id,
        nome: user.nome
    }, authconfig.secret , {
        expiresIn: 86400
    });
}

router.post("/register", async(req, res) => { 

    const {email} = req.body;

    if(await UserModel.findOne({email})){
        return res.status(400).json({
            error: true,
            message:"Esse usuario já existe"
        })
    }
    const user = await UserModel.create(req.body);

    user.senha = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });
})

router.post("/authenticate", async(req, res) =>{
    console.log('auth ====>', req.body);
    const {email, senha} = req.body;
    const user = await UserModel.findOne({email}).select("+senha");

    if(!user){
        return res.status(400).json({
            error: true,
            message: 'Usuario não encontrado'
        })
    }
    if(!await bcrypt.compare(senha, user.senha)){
        return res.status(400).send({
            error: true,
            message:'Senha invalida'
        })
    }
    user.senha = undefined;

    return res.json({
        user,
        token: generateToken(user)
    });
});

module.exports = router;