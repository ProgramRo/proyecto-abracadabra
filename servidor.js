// Se importa el módulo
const express = require("express")

// Se crea el servidor con Express
const app = express()

// Se ejecuta en el puerto 3000
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000")
})

// Definición carpeta 'assets' como carpeta pública
app.use(express.static('assets'))

// Ruta que devuelve la aplicación
app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const usuarios = {
    usuarios: [
        "Juan",
        "Jocelyn",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Brian"
    ]
}

app.get('/abracadabra/usuarios', (_req, res) => {
    res.send(usuarios)
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const nombreUsuario = req.params.usuario
    const usuariosJSON = usuarios.usuarios
    const nombreEncontrado = usuariosJSON.find((e) => e === nombreUsuario)
    if(nombreEncontrado) {
        next()
    } else {
        res.redirect('/who.jpeg')
    }
})

app.get('/abracadabra/juego/:usuario', (req, res, next) => {
    res.redirect('/')
})

// Ruta que evalúa número al azar
app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = Math.floor(Math.random() * (5 - 1) + 1)
    const numero = parseInt(req.params.n)

    numero === n
    ? res.redirect('/conejito.jpg')
    : res.redirect('/voldemort.jpg')
})

// Ruta inexistente, responde con mensaje
app.get("*", (req, res) => {
    res.send("<center><h1>Esta página no existe...</h1> </center>")
})