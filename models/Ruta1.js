const mongoose = require('mongoose');

const Ruta1Schema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    ministra: String,
    sector: String
});

module.exports = mongoose.model('Ruta1', Ruta1Schema);