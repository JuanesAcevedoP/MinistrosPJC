const express = require('express');
const router = express.Router();
const Enfermo = require('../models/Ruta3');

// Crear un nuevo Enfermo
router.post('/', async (req, res) => {
    try {
        const { nombre, direccion, telefono, ministra, sector } = req.body;

        // Verifica si todos los campos necesarios están presentes en el cuerpo de la solicitud
        if (!nombre ||  !direccion || !telefono || !ministra || !sector ) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Busca si ya existe un Enfermo con el mismo nombre
        const existingEnfermo = await Enfermo.findOne({ nombre });
        if (existingEnfermo) {
            return res.status(400).json({ error: 'El nombre del enfermo ya está en uso' });
        }

        // Crea un nuevo objeto Enfermo con los datos recibidos y guárdalo en la base de datos
        const newEnfermo = new Enfermo({
            nombre,
            direccion,
            telefono,
            ministra,
            sector
        });

        const enfermoGuardado = await newEnfermo.save();
        res.redirect('/ruta3');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los enfermos 
router.get('/', async (req, res) => {
    try {
        const enfermos = await Enfermo.find();
        res.json(enfermos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

// Actualizar un ministro por su nombre
router.put('/', async (req, res) => {
    try {
        const { nombre, updates } = req.body;
        
        // Verificar si se proporcionó el nombre del ministro en el cuerpo
        if (!nombre) {
            return res.status(400).json({ error: 'Por favor, proporcione el nombre del enfermo.' });
        }

        // Buscar y actualizar el enfermo por su nombre
        const updatedEnfermo = await Enfermo.findOneAndUpdate({ nombre }, updates, { new: true });

        if (!updatedEnfermo) {
            // Si el enfermo no existe, devolver un error
            return res.status(404).json({ error: 'Enfermo no encontrado.' });
        }

        // Devolver el Enfermo actualizado
        res.json(updatedEnfermo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});


// Eliminar un enfermo por su nombre
router.delete('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        
        // Verificar si se proporcionó el nombre del enfermo en el cuerpo
        if (!nombre) {
            return res.status(400).json({ error: 'Por favor, proporcione el nombre del enfermo.' });
        }
        
        // Buscar y eliminar el enfermo por su nombre
        const deletedEnfermo = await Enfermo.findOneAndDelete({ nombre });

        if (!deletedEnfermo) {
            // Si el enfermo no existe, devolver un error
            return res.status(404).json({ error: 'Enfermo no encontrado.' });
        }

        // Devolver un mensaje de éxito
        res.json({ message: 'Enfermo eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;