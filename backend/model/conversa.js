const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversaSchema = new Schema({


    telefoneCliente: {type:String, required: true, lowercase:true},
    telefoneProfissional: {type:String, required: true, lowercase:true},

    area: {type:String, required: true, lowercase:true},
    qntAutonomos:  {type:Number, required: true},
    tipo: {type:String, required: true},
    data: {type:Date, required: true},
    detalhes: {type:String, required: true},
    created: {type: Date, default: Date.now},
    menssagens: [{enviou: {
        type: String,
        required: true
      },
      menssagem: {
        type: String,
        required: true
      }}]
});

ConversaSchema.index({ telefoneCliente: 1, telefoneProfissional: 1 }, { unique: true });

module.exports = mongoose.model("Conversa", ConversaSchema);

