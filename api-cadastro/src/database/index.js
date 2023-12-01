const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        console.log('env =>', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connection ok');
        // console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error){
        console.log('falha ao conectar mongodb', error);
        process.exit(1);
    }
}

// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Listening on port ${PORT}`)
//     })
// }); 

connectDB();

mongoose.Promise = global.Promise;

module.exports = mongoose;

