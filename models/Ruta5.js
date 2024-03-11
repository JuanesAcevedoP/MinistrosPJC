const mongoose = require('mongoose');

const Ruta5Schema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    ministra: String,
    sector: String
});

module.exports = mongoose.model('Ruta5', Ruta5Schema);