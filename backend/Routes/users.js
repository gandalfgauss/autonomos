
const express = require("express");

const router = express.Router();

const Users = require("../model/user");

router.get("/", async (req,res)=>{

    try {
        
        const users = await Users.find({});
        return res.send(users);
    } catch (err){
        return res.send({error: "Erro na consulta de usuários"});
    }
})


router.post("/create", async (req,res)=>{

    const {telefone, tipo, nome} = req.body;
 

    if(!telefone || !tipo || !nome){
        return res.status(400).send({error: "Erro no cadastro ! Dados insuficientes !"});
    }
    console.log("Cadastrou Inicial")
    try{
        if(await Users.findOne({telefone: telefone, tipo: tipo})){
            console.log("erro")
            return res.status(400).send({error: "Erro no cadastro ! Usuário já registrado !"});
        }

        console.log("Cadastrou meio")
        const user = await Users.create(req.body);
       
        console.log("Cadastrou")
        return res.send(user);


    }catch(err){
        return res.send({error: "Erro ao cadastrar usuário !"});
    }
});

router.post("/auth", async (req,res)=>{
    const {telefone, tipo} = req.body;

    if(!telefone || !tipo){
        return res.status(400).send({error: "Erro ao autenticar! Dados insuficientes !"})
    }

    try{
        const user = await Users.findOne({telefone: telefone, tipo: tipo});

        if(!user)
        {
            return res.status(400).send({error: "Erro ao autenticar ! Usuário não registrado !"})
        }

        return res.send(user);
    }catch{
        return res.status(400).send({error: "Erro ao autenticar !"})
    }
})

module.exports = router