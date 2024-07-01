require("dotenv").config()

const express = require('express');
const crudRoute = require('./routes/CRUD_routes')
const mongoose = require('mongoose')

//express app
const app = express()

//Middleware
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/details',crudRoute)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
         
        app.listen(process.env.PORT, () => {
        console.log('connected to db and  listinig on port ',process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })


