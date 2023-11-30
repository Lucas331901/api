const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Lucas331901:Lucaspdn1@api.ajw7nns.mongodb.net/api-cadastro?retryWrites=true&w=majority", {}, (error)=>{
    if(error){
        console.log('Falha ao autenticar com mongodb');
        console.log(error);
        return;
    }

    console.log('conexão com mongodb estável');
})

mongoose.Promise = global.Promise;

module.exports = mongoose;

