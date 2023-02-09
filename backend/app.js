const express = require("express"); // conectar no express
const app = express(); // Criar aplicacao backend
const config = require("./config/config") // importar arquivo de configuracoes
const mongoose = require("mongoose"); // importar mongoose para trabalhar com mongo db
const bodyParser = require("body-parser"); // importar boy-parse para trabalhar com envio de objetos via requisicao
const pino = require('express-pino-logger')();

const Twilio = require('twilio');

const accountSid = "AC2585bb2fa517031f6c509b81dcf6ee88";
const authToken = "13df8230a9394e7944226c8813396bad";
const client = new Twilio(accountSid, authToken);

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
app.use(pino);


const indexRoute = require("./Routes/index"); // importando rota index
const usersRoute = require("./Routes/users"); // importando rota de usuarios
const servicosRoute = require("./Routes/servicos"); // importando rota de servicos
const conversasRoute = require("./Routes/conversas"); // importando rota de conversas
const areasRoute = require("./Routes/areas"); // importando rota de conversas

// Adicionando rotas a aplicação
app.use("/", indexRoute); // Rota default
app.use("/users", usersRoute); // Rota de usuário
app.use("/servicos", servicosRoute); // Rota de servicos
app.use("/conversas", conversasRoute); // Rota de conversas
app.use("/areas", areasRoute); // Rota de areas

app.listen(3000); // Escutando na porta 3000


app.post("/sms", async (req,res)=>{
    const {telefone, codigoEnviado} = req.body;
    
    if(!telefone || !codigoEnviado){
        console.log("erro ai")
        return res.status(400).send({error: "Erro ao autenticar! Dados inválidos!"})
        
    }

    console.log(telefone, codigoEnviado)
    client.messages
      .create({
        from: "+19134238434",
        to: telefone,
        body: codigoEnviado
      })
      .then(() => {
        console.log("sucesso")
        res.send({ sucesso: true });
      })
      .catch(err => {
        console.log("Error", err)
        res.status(400).send({ sucesso: false });
      });
    
})



module.exports = app;

