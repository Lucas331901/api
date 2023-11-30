const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lucaspdn1:Lucas331901@cluster0.l8ni8j3.mongodb.net/, {}, (error)=>{
    if(error){
        console.log('Falha ao autenticar com mongodb');
        console.log(error);
        return;
    }

    console.log('conexão com mongodb estável');
})

mongoose.Promise = global.Promise;

module.exports = mongoose;

