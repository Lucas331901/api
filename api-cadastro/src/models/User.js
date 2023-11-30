const mongoose = require("../database");
const TelephoneSchema = require('../db/TelephoneSchema');

const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:  true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    telefones: {
        type: [TelephoneSchema],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", async function(next) {
    const hash = await bcryptjs.hash(this.senha, 10 );
    this.senha = hash;
})

const User = mongoose.model("User", UserSchema);

module.exports = User;