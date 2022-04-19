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

const notes =[
    {
      "userId": 1, 
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
      "userId": 1,
      "id": 3,
      "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
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
    "body": note.body
   }]

   response.status(201).json(newNote)
})



const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`)
  })