const mongoose = require('mongoose');

const ministrosSchema = new mongoose.Schema({
    nombre: String, 
    edad: String,
    cedula: String,
    direccion: String,
    telefono: String,
    celular: String,
    oficio: String,
    estudio: String,
    barrio: String,
    correo: String,
    enfermos: String
});

module.exports = mongoose.model('Ministros', ministrosSchema);