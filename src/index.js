const express = require('express')
require('./db/mongoose')
const router = require('./routes/user')
const userRouter= require('./routes/user')
const TaskRouter= require('./routes/task')

const app = express()
const port= process.env.port||PORT
app.use(express.json())
app.use(userRouter)
app.use(TaskRouter)




app.listen(port, () =>{
  console.log('application started at port:'+ port)
})