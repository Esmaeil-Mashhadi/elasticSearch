const express = require('express')
const app = express()
require("dotenv").config()

const http = require('http')
const createHttpError = require('http-errors')
const { allRoutes } = require('./router/router')

const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(allRoutes)
app.use((req ,res , next)=>{
    throw createHttpError.NotFound('address is not defined')
})

app.use ((err , req ,res , next)=>{
    const error =  createHttpError.InternalServerError()
    const status = err.status || error.status
    const message = err.message || error.message

    return res.status(status).json({
        status , 
        message 
    })
})
server.listen(process.env.PORT , ()=>{
    console.log(`server ran on http://localhost:${process.env.PORT}`);
})

