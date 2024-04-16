const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');

let conexion= mysql.createConnection({
    host: 'localhost',
    database:'formulario',
    user: 'root',
    password:'Thegoodwitches2004#',
    port: 3306,
})
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact'); 
});


app.get('/formulario', (req, res) => {
    res.render('formulario');
});

app.post("/validar", function(req, res){
    const datos = req.body;

    let nombre = datos.nombre;
    let email = datos.email;
    let password = datos.password;
    let confirmPassword = datos.confirmPassword;
    let telefono = datos.telefono;

    let registar = "INSERT INTO usuarios (nombre, email, password, telefono) VALUES('"+nombre+"','"+email+"','"+password+"','"+telefono+"')";

    conexion.query(registar, function(error) {
        if (error) {
            console.error('Error al insertar usuario:', error);
            res.status(500).send('Error al registrar usuario');
        } else {
            console.log("Datos almacenados correctamente");
            res.send('Registro exitoso');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});