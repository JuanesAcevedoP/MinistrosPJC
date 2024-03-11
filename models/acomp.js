const mongoose = require('mongoose');

const acompSchema = new mongoose.Schema({
    nombre: String, 
    telefono: String
});

module.exports = mongoose.model('Acompanantes', acompSchema);