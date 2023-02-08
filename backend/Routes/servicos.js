
const express = require("express");

const router = express.Router();

const Servicos = require("../model/servico");

router.get("/", async (req,res)=>{

    try {
        
        const servicos = await Servicos.find({});
        return res.send(servicos);
    } catch (err){
        return res.send({error: "Erro na consulta de serviços !"});
    }
})


router.post("/create", async (req,res)=>{

    const {telefone, area, qntAutonomos, qntDesbloqueada, tipo, data, detalhes, latitude, longitude} = req.body;

    if(!telefone || !area || !qntAutonomos || !qntDesbloqueada || !tipo ||!data || !detalhes || !latitude ||!longitude){
        console.log("algo de errado nos parametros do servico");
        return res.status(400).send({error: "Erro no cadastro do serviço ! Dados insuficientes !"});
    }

    try{
        const servico = await Servicos.create(req.body);
        console.log("Servico criado com sucesso")
        return res.send(servico);


    }catch(err){
        console.log("Erro ao criar servico")
        return res.status(400).send({error: "Erro ao cadastrar serviço !"});
    }
});


module.exports = router