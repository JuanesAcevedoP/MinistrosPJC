const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

// Importación de rutas
const minisRoutes = require('./routes/minisRoutes');
const acompRoutes = require('./routes/acompRoutes');
const ruta1Routes = require('./routes/ruta1Routes');
const ruta2Routes = require('./routes/ruta2Routes');
const ruta3Routes = require('./routes/ruta3Routes');
const ruta4Routes = require('./routes/ruta4Routes');
const ruta5Routes = require('./routes/ruta5Routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/minisPJC') 
  .then(db => console.log('Database MongoDB - minisPJC connected ...'))
  .catch(err => console.log(err));

// Configuración para servir archivos estáticos desde la carpeta 'views'
app.use(express.static('views'));

// Rutas
app.use('/ministros', minisRoutes);
app.use('/acompanantes',acompRoutes)
app.use('/ruta1',ruta1Routes);
app.use('/ruta2',ruta2Routes);
app.use('/ruta3',ruta3Routes);
app.use('/ruta4',ruta4Routes);
app.use('/ruta5',ruta5Routes);

// Redirigir '/' a la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
