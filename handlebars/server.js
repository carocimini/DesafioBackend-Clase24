const Contenedor = require("./contenedor")
const handlebars = require('express-handlebars')
const productsRandom = require("./productsRandom")

const express =require('express')

const productsMock = productsRandom() 
const reedMessages = new Contenedor('./ecommerce_chat/chat.json')
const saveMessages = new Contenedor('./ecommerce_chat/mensajes.json')

const {Server: HttpServer} = require ('http')
const {Server: IoServer} = require ('socket.io')

const app = express()
const httpServer = new HttpServer (app)
const io = new IoServer (httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))

io.on('connection', async (socket) => {
    let buzonChat = await reedMessages.getAll()
    console.log('usuario conectado')
    const text = {
        text: 'ok',
        buzonChat
    }
    socket.emit('mensaje-servidor', text)

    socket.on('mensaje-nuevo', async (msj, cb) => {
        buzonChat.push(msj)
        const text = {
            text: 'mensaje nuevo',
            buzonChat
        }

        io.sockets.emit('mensaje-servidor', text)
        cb(id)
        await saveMessages.save({
            author: msj.author,
            text: msj.text
        })
    })
})


app.engine(
    'hbs', 
    handlebars.engine({
        extname: '.hbs',  
        defaultLayout: '' ,          
        layoutsDir: __dirname + '',
        partialsDir: __dirname + '/views/partials'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views/layouts')

// productos

app.get('/', async (req, res) => {
    let respuesta = await productsMock
        res.render("index", {
            titulo: "Products Crud",
            list: respuesta,
            exist,
            catalogo: true
        })
})

app.get('/api/productos-test', async (req, res) => {
    let respuesta = await productsMock
        res.render("productos", {
            list: respuesta,
            exist,
            catalogo: true
        })
})

// mensajes

app.get('/api/mensajes/:id', async (req, res) => {
    const {id} = req.params
    const messageById = await mensaje.getById(id)
    messageById ? res.json(messageById) : res.json({ error: "Item no encontrado"})
})

app.put ('/api/mensajes/: id', async (req, res) => {
    const {id} = req.params
    const respuesta = await saveMessages.updateById(id, req.body)
    res.json(respuesta)
})

app.delete('api/mensajes/:id', async (req, res) => {
    const {id} = req.params
    res.json(await saveMessages.deleteById(id))
})


const PORT = 8080
const server = httpServer.listen(PORT, err =>{
    if (err) throw err
    console.log(`Escuchando en el puerto: ${server.address().port}`)
})

server.on('error', err => console.log(err))