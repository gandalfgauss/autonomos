const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = new Schema({

    telefone: {type:String, required: true, lowercase:true, unique: true},
    areas: [{type:String, required: true, lowercase:true}],
    filtros: [{type:String, required: true, lowercase:true}],
    
});



module.exports = mongoose.model("Area", AreaSchema);

