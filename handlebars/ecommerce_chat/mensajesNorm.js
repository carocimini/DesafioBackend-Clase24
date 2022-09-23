const { normalize, denormalize, schema } = require('normalizr')
const fs = require("fs")
const mensajes = require('./mensajes.json')

const msj = mensajes

const authorSchema = new schema.Entity('author', {}, {idAttribute: 'id'})
const commentSchema = new schema.Entity('text')
const messageSchema = [
    {
        author: authorSchema,
        text: commentSchema
    }
]

const msjNormalized = normalize(msj, messageSchema)

fs.writeFileSync('./chat.json', JSON.stringify(msjNormalized.result))