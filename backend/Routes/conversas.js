
const express = require("express");

const router = express.Router();

const Conversas = require("../model/conversa");


router.post("/cliente", async (req,res)=>{

    const {telefone} = req.body;

    if(!telefone)
    {
        return res.status(400).send({error: "Erro no leitura das conversas! Não foi passado o número de telefone corretamente !"});
    }

    try {
        
        const conversas = await Conversas.find({telefoneCliente: telefone});
        return res.send(conversas);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta de conversas !"});
    }
})

router.post("/profissional", async (req,res)=>{

    const {telefone} = req.body;

    if(!telefone)
    {
        return res.status(400).send({error: "Erro no leitura das conversas! Não foi passado o número de telefone corretamente !"});
    }

    try {
        
        const conversas = await Conversas.find({telefoneProfissional: telefone});
        return res.send(conversas);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta de conversas !"});
    }
})

router.post("/chat", async (req,res)=>{

    const {id} = req.body;

    if(!id)
    {
        return res.status(400).send({error: "Erro no carregamento da conversa ! Não foi passado o id corretamente !"});
    }

    try {
        
        const conversa = await Conversas.findOne({_id: id});
        return res.send(conversa);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta da conversa !"});
    }
})

router.post("/create", async (req,res)=>{

    const {telefoneCliente, telefoneProfissional, area, qntAutonomos, tipo, data, detalhes} = req.body;

    if(!telefoneCliente || !telefoneProfissional || !area || !qntAutonomos || !tipo || !data || !detalhes){
 
        return res.status(400).send({error: "Erro no cadastro de conversa ! Dados insuficientes !"});
    }

    try{
        const conversas = await Conversas.create(req.body);
 
        return res.send(conversas);

    }catch(err){

        return res.status(400).send({error: "Erro ao cadastrar conversa !"});
    }
});

router.post("/delete/cliente", async (req,res)=>{

    const {id, telefone} = req.body;

    if(!id)
    {
        return res.status(400).send({error: "Erro na deleção ! Id inválido !"});
    }

    Conversas.deleteOne({ _id: id}, function(err, result) {
        if (err) {
            return res.status(400).send({error: "Erro na deleção da conversa !"});
          }
      });   

    try {
        
        const conversas = await Conversas.find({telefoneCliente: telefone});
        return res.send(conversas);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta das conversas !"});
    }
})

router.post("/delete/profissional", async (req,res)=>{

    const {id, telefone} = req.body;

    if(!id)
    {
        return res.status(400).send({error: "Erro na deleção ! Id inválido !"});
    }

    Conversas.deleteOne({ _id: id}, function(err, result) {
        if (err) {
            return res.status(400).send({error: "Erro na deleção da conversa !"});
          }
      });   

    try {
        
        const conversas = await Conversas.find({telefoneProfissional: telefone});
        return res.send(conversas);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta das conversas !"});
    }
})

router.post("/add", async (req,res)=>{

    const {id, enviou, menssagem} = req.body;

    if(!id || !enviou || !menssagem)
    {
        return res.status(400).send({error: "Erro ao adicionar menssagem ! Dados inválidos !"});
    }
  
    try {
        
        const conversas = await Conversas.findOneAndUpdate(
            {_id: id},
            { $push: { menssagens: { enviou: enviou, menssagem: menssagem } } }
            )
        
            const {io, app} = require("../app");
            
            io.emit(id, menssagem);
        return res.send(conversas);
    } catch (err){
        console.log(err)
        return res.status(400).send({error: "Erro ao enviar menssagem !"});
    }
})

module.exports = router

