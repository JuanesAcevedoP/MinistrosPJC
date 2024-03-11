const express = require('express');
const router = express.Router();
const Ministro = require('../models/ministros');

// Crear un nuevo ministro
router.post('/', async (req, res) => {
    try {
        const { nombre, edad, cedula, direccion, telefono, celular, oficio, estudio, barrio, correo, enfermos } = req.body;

        // Verifica si todos los campos necesarios están presentes en el cuerpo de la solicitud
        if (!nombre || !edad || !cedula || !direccion || !telefono || !celular || !oficio || !estudio || !barrio || !correo || !enfermos) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Busca si ya existe un ministro con el mismo nombre
        const existingMinistro = await Ministro.findOne({ nombre });
        if (existingMinistro) {
            return res.status(400).json({ error: 'El nombre del ministro ya está en uso' });
        }

        // Crea un nuevo objeto Ministro con los datos recibidos y guárdalo en la base de datos
        const newMinistro = new Ministro({
            nombre,
            edad,
            cedula,
            direccion,
            telefono,
            celular,
            oficio,
            estudio,
            barrio,
            correo,
            enfermos
        });

        const ministroGuardado = await newMinistro.save();
        res.redirect('/ministro');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todos los ministros
router.get('/', async (req, res) => {
    try {
        const ministros = await Ministro.find();
        res.json(ministros);
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
            return res.status(400).json({ error: 'Por favor, proporcione el nombre del ministro.' });
        }

        // Buscar y actualizar el ministro por su nombre
        const updatedMinistro = await Ministro.findOneAndUpdate({ nombre }, updates, { new: true });

        if (!updatedMinistro) {
            // Si el ministro no existe, devolver un error
            return res.status(404).json({ error: 'Ministro no encontrado.' });
        }

        // Devolver el ministro actualizado
        res.json(updatedMinistro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});


// Eliminar un ministro por su nombre
router.delete('/', async (req, res) => {
    try {
        const { nombre } = req.body;
        
        // Verificar si se proporcionó el nombre del ministro en el cuerpo
        if (!nombre) {
            return res.status(400).json({ error: 'Por favor, proporcione el nombre del ministro.' });
        }
        

        // Buscar y eliminar el ministro por su nombre
        const deletedMinistro = await Ministro.findOneAndDelete({ nombre });

        if (!deletedMinistro) {
            // Si el ministro no existe, devolver un error
            return res.status(404).json({ error: 'Ministro no encontrado.' });
        }

        // Devolver un mensaje de éxito
        res.json({ message: 'Ministro eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

module.exports = router;
