require('dotenv').config();
const express = require('express');
const  router = express.Router();

const AuthController = require("./controllers/AuthController");
const AdminController = require("./controllers/AdminController");

const authenticateMiddleware = require("./middlewares/authenticate");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/auth", AuthController);
app.use("/admin", authenticateMiddleware, AdminController);

app.get('/', (req, res) => {
  res.status(200).json({ mensagem: 'Bem-vindo à API!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });



