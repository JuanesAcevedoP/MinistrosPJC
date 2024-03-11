const mongoose = require('mongoose');

const Ruta4Schema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    ministra: String,
    sector: String
});

module.exports = mongoose.model('Ruta4', Ruta4Schema);