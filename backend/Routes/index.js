
const express = require("express");

const router = express.Router();



router.get("/", async (req,res)=>{
  
    return res.send({message:"Tudo ok com o método get da raiz !"})
})

router.post("/", async (req,res)=>{
    return res.send({message:"Tudo ok com o método POST da raiz !"})
})

module.exports = router