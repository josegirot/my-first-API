// const http = require('http') //forma de cargar modulos en node js

// const app = http.createServer((request, response) => { // createServer siempre recibe como parametros una funcion
//     response.writeHead(200, { 'Content-Type': 'text/plain' }) // writeHead escribe la cabecera. 200 representa ok
//     response.end('hello world')
// })

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())     

let notes =[
    {
      "userId": 1, 
      "id": 1,
      "title": "Fruta",
      "body": "Manzana"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "fruta",
      "body": "Pera"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "Fruta",
      "body": "Fresa"
    }]

app.get('/',(request, response)=>{
     response.send('<h1>hello world</h1>')
})

app.get('/api/notes',(request, response)=>{
    response.json(notes)
})

app.get('/api/notes/:id',(request, response)=>{
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note){
        response.json(note)
        response.status(200).end()
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id',(request, response)=>{
    const id = Number(request.params.id)
    const note = notes.filter(note => note.id !== id)
    if (note){
        response.json(note)
        response.status(204).end()
    }
    else{
        response.status(404).end()
    }
})

app.post('/api/notes',(request, response)=>{
    const note = request.body
   console.log(note)

   if (!note || !note.body){
       response.status(400).end()
   }

   const ids = notes.map((note)=>note.id)
   const maxId= Math.max(...ids)

   const newNote =[{
    "userId": 1, 
    "id": maxId + 1,
    "title": "Fruta",
    "body": note.body
   }]

   notes = notes.concat(newNote)

   response.status(201).json(newNote)
})



const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
  })