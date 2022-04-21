// const http = require('http') //forma de cargar modulos en node js

// const app = http.createServer((request, response) => { // createServer siempre recibe como parametros una funcion
//     response.writeHead(200, { 'Content-Type': 'text/plain' }) // writeHead escribe la cabecera. 200 representa ok
//     response.end('hello world')
// })
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/Note')
const { request } = require('express')
const { response } = require('express')
const notFound = require('./notFound')
const handleErrors = require('./handleErrors')

app.use(cors())
app.use(express.json())     

app.get('/',(request, response)=>{
     response.send('<h1>hello world</h1>')
})

app.get('/api/notes',(request, response)=>{
    Note.find({}).then(notes =>{
        response.json(notes)
    })
 })

app.get('/api/notes/:id',(request, response, next)=>{
    const {id} = request.params
    Note.findById(id).then(note => {
        if (note){
            response.json(note)
            response.status(200).end()
        }
        else{
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.put('/api/notes/:id',(request, response,next)=>{
    const {id} = request.params
    const note = request.body

    const newNoteInfo = {
        title: "fruit",
        body: note.body
    }

    Note.findByIdAndUpdate(id, newNoteInfo, {new:true})
        .then(result =>{
        response.json(result)
    }).catch(error => next(error))
})


app.delete('/api/notes/:id',(request, response,next)=>{
    const {id} = request.params
    Note.findByIdAndDelete(id).then( () =>{
        response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/notes',(request, response)=>{
    const note = request.body
   console.log(note)

   if (!note || !note.body){
       response.status(400).end()
   }

   const newNote = new Note({
    title: "fruit",
    body: note.body
})

    newNote.save().then(savedNote =>{
   response.json(savedNote)
})
})

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
  })