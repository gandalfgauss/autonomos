const express = require("express"); // conectar no express
const app = express(); // Criar aplicacao backend
const config = require("./config/config") // importar arquivo de configuracoes
const mongoose = require("mongoose"); // importar mongoose para trabalhar com mongo db
const bodyParser = require("body-parser"); // importar boy-parse para trabalhar com envio de objetos via requisicao

const url = config.bd_string; // url de conexao

//Configuracoes do Mongo
mongoose.set("strictQuery", true);

mongoose.connect(url)

mongoose.connection.on("error", (err)=>{
    console.log("Erro na conexão com o banco de dados: " + err)
});

mongoose.connection.on("disconnected", ()=>{
    console.log("Aplicação desconectada do banco de dados!")
});

mongoose.connection.on("connected", ()=> {
    console.log("Aplicação conectada ao banco de dados!")
});

// Configurando body-parser da aplicação
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



const indexRoute = require("./Routes/index"); // importando rota index
const usersRoute = require("./Routes/users"); // importando rota de usuarios

// Adicionando rotas a aplicação
app.use("/", indexRoute); // Rota default
app.use("/users", usersRoute); // Rota de usuário


app.listen(3000); // Escutando na porta 3000


module.exports = app;

