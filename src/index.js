const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');  // Importar el módulo 'path'

const cors = require ('cors');

// Usar el puerto asignado por el entorno (Render lo asigna)
const PORT = process.env.PORT || 4000;  // Usamos PORT del entorno, o 3001 como fallback

app.set('port', PORT);
app.set('json spaces', 2); 

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

app.use(cors());

// Servir el archivo index.html (Asegúrate de tener esta ruta correctamente configurada)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'aplicacion_web', 'index.html')); // Ruta correcta
});

app.get('/api', (req, res) => {
    res.json({
        "mensaje": "esta es mi primer api"
    });
});

app.post('/sumar', (req, res) => { 
    const { num1, num2 } = req.body;

    // Validar que se hayan enviado los dos números
    if (num1 === undefined || num2 === undefined || num1 ===  '' || num2 === '') {
        return res.status(400).send({ error: 'Faltan números para sumar' });
    }

    // Sumar los números
    const resultado = Number(num1) + Number(num2);

    // Enviar el resultado en formato HTML
    res.send(`<h1>Resultado: ${resultado}</h1><br><a href="/">Volver</a>`);
});

// Iniciando el servidor
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
