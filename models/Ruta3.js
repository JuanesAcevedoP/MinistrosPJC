const mongoose = require('mongoose');

const Ruta3Schema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    ministra: String,
    sector: String
});

module.exports = mongoose.model('Ruta3', Ruta3Schema);