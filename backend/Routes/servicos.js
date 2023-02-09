
const express = require("express");

const router = express.Router();

const Servicos = require("../model/servico");

router.post("/", async (req,res)=>{

    const {telefone} = req.body;

    if(!telefone)
    {
        return res.status(400).send({error: "Erro no leitura dos serviços! Não foi passado o número de telefone corretamente !"});
    }

    //Deletar serviços antigos e que ja foram desbloqueados pelo numero maximo de autonomos
    const thresholdDate = new Date()
    Servicos.deleteMany({telefone:telefone, data: {$lt: thresholdDate}}, function(err, result) {
        if (err) {
            return res.status(400).send({error: "Erro na deleção dos serviços antigos !"});
          } else {
            console.log("Deleted Documents");
            console.log(result);
          }
      });   

    try {
        
        const servicos = await Servicos.find({telefone: telefone});
        return res.send(servicos);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta de serviços !"});
    }
})



router.post("/a2", async (req,res)=>{

    const {telefone} = req.body;

    if(!telefone)
    {
        return res.status(400).send({error: "Erro no leitura dos serviços! Não foi passado o número de telefone corretamente !"});
    }

    //Deletar serviços antigos e que ja foram desbloqueados pelo numero maximo de autonomos
    const thresholdDate = new Date()
    Servicos.deleteMany({telefone:telefone, $expr: { $lte: [ "$qntAutonomos", "$qntDesbloqueada" ]}}, function(err, result) {
        if (err) {
            console.log(err)
            return res.status(400).send({error: "Erro na deleção dos serviços desbloqueados !"});
          } else {
            return res.send({error: "Sem erro !"});

          }
      }); 
})


router.post("/create", async (req,res)=>{

    const {telefone, area, qntAutonomos, qntDesbloqueada, tipo, data, detalhes, latitude, longitude} = req.body;

    if(!telefone || !area || !qntAutonomos || !qntDesbloqueada || !tipo ||!data || !detalhes || !latitude ||!longitude){
 
        return res.status(400).send({error: "Erro no cadastro do serviço ! Dados insuficientes !"});
    }

    try{
        const servico = await Servicos.create(req.body);
 
        return res.send(servico);


    }catch(err){

        return res.status(400).send({error: "Erro ao cadastrar serviço !"});
    }
});

router.post("/delete", async (req,res)=>{

    const {id, telefone} = req.body;

    if(!id)
    {
        return res.status(400).send({error: "Erro na deleção ! Id inválido !"});
    }

    Servicos.deleteOne({ _id: id}, function(err, result) {
        if (err) {
            return res.status(400).send({error: "Erro na deleção do serviço !"});
          }
      });   

    try {
        
        const servicos = await Servicos.find({telefone: telefone});
        return res.send(servicos);
    } catch (err){
        return res.status(400).send({error: "Erro na consulta de serviços !"});
    }
})



module.exports = router