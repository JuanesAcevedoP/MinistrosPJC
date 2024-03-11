const express = require('express');
const router = express.Router();
const Acompanantes = require('../models/acomp');

// Crear un nuevo acompañante
router.post('/', async (req, res) => {
    try {
        const { nombre, telefono } = req.body;

        // Verifica si todos los campos necesarios están presentes en el cuerpo de la solicitud
        if (!nombre  || !telefono ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Busca si ya existe un acompañante con el mismo nombre
        const existingAcompanantes = await Acompanantes.findOne({ nombre });
        if (existingAcompanantes) {
            return res.status(400).json({ error: 'El nombre del acompañante ya está en uso' });
        }

        // Crea un nuevo objeto Acompañante con los datos recibidos y guárdalo en la base de datos
        const newAcompanantes = new Acompanantes({
            nombre,
            telefono
        });

        const acompanantesGuardado = await newAcompanantes.save();
        res.redirect('/acompanantes');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los acompañantes
router.get('/', async (req, res) => {
    try {
        const acompanantes = await Acompanantes.find();
        res.json(acompanantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Actualizar un acompañante por su nombre
router.put('/', async (req, res) => {
    try {
        const { nombre, updates } = req.body;
        
        // Verificar si se proporcionó el nombre del acompañante en el cuerpo
        if (!nombre) {
            return res.status(400).json({ error: 'Por favor, proporcione el nombre del acompañante.' });
        }

        // Buscar y actualizar el acompañante por su nombre
        const updatedAcompanantes = await Acompanantes.findOneAndUpdate({ nombre }, updates, { new: true });

        if (!updatedAcompanantes) { 
            // Si el acompañante no existe, devolver un error
            return res.status(404).json({ error: 'Acompañante no encontrado.' });
        }

        // Devolver el acompañante actualizado
        res.json(updatedAcompanantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});


// Eliminar un acompañante por su nombre
router.delete('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        
        // Verificar si se proporcionó el nombre del acompañante en el cuerpo
        if (!nombre) {
            return res.status(400).json({ error: 'Por favor, proporcione el nombre del acompañante.' });
        }
        
        // Buscar y eliminar el acompañante por su nombre
        const deletedAcompanantes = await Acompanantes.findOneAndDelete({ nombre });

        if (!deletedAcompanantes) {
            // Si el acompañante no existe, devolver un error
            return res.status(404).json({ error: 'Acompañante no encontrado.' });
        }

        // Devolver un mensaje de éxito
        res.json({ message: 'Acompañante eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;