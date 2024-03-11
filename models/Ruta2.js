const mongoose = require('mongoose');

const Ruta2Schema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    telefono: String,
    ministra: String,
    sector: String
});

module.exports = mongoose.model('Ruta2', Ruta2Schema);