
const express = require("express");

const router = express.Router();

const Areas = require("../model/area");

router.post("/", async (req,res)=>{

    const {telefone} = req.body;
    
    if(!telefone)
    {
        return res.status(400).send({error: "Erro no leitura das áreas de atuação ! Não foi passado o número de telefone corretamente !"});
    }

    try {
        
        const areas = await Areas.findOne({telefone: telefone});
        return res.send(areas);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta das áreas de atuação !"});
    }
})

router.post("/setAreas", async (req,res)=>{

    const {telefone, novasAreas} = req.body;

    if(!telefone)
    {
        return res.status(400).send({error: "Erro no leitura das áreas de atuação ! Não foi passado o número de telefone corretamente !"});
    }

    try {

        await Areas.findOneAndUpdate({telefone: telefone},{ $set: { areas: novasAreas } });
        return res.send({msg: "Deu certo"})
    } catch (err){
        return res.status(400).send({error: "Erro na atualização das áreas de atuação !"});
    }
})


router.post("/create", async (req,res)=>{

    const {telefone} = req.body;

    if(!telefone)
    {
        return res.status(400).send({error: "Erro na criação das áreas de atuação ! Não foi passado o número de telefone corretamente !"});
    }

    try {
        
        Areas.create(req.body);
    } catch (err){
        return res.status(400).send({error: "Erro na criação das áreas de atuação !"});
    }
})


module.exports = router