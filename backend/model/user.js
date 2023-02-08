
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    telefone: {type:String, required: true, lowercase:true},
    nome:  {type:String, required: true},
    tipo: {type:String, required: true},
    created: {type: Date, default: Date.now},
});

UserSchema.index({ telefone: 1, tipo: 1 }, { unique: true });


module.exports = mongoose.model("User", UserSchema);

