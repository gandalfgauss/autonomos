const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServicoSchema = new Schema({
    telefone: {type:String, required: true, lowercase:true},
    area: {type:String, required: true, lowercase:true},
    qntAutonomos:  {type:Number, required: true},
    qntDesbloqueada: {type:Number, required: true},
    tipo: {type:String, required: true},
    data: {type:Date, required: true},
    detalhes: {type:String, required: true},
    latitude: {type:String, required: true},
    longitude: {type:String, required: true},
    created: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Servico", ServicoSchema);

