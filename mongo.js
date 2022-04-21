const mongoose = require('mongoose')
const password = require ('./password.js')

const connectionString = `mongodb+srv://josegirot:${password}@cluster0.of6xj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(connectionString)
.then (()=>{
    console.log('data base connected')
}).catch(err => {
    console.error(err)
})


// Note.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })

// const note = new Note ({
//     title: 'fruit',
//     body : 'apple'
// })

// note.save()
//   .then(result =>{
//       console.log(result)
//       mongoose.connection.close()
//   })
//   .catch(err =>{
//       console.error(err)
//   })

