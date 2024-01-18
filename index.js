// import dotenv package


require('dotenv').config()


// import connection file node mongo db connection

require('./DB-Connection/connection')







// import express

const express=require('express')


// import router

const router=require('./Routes/router')


// import cors

const cors=require('cors')


// create server using express

const emsServer=express()


// use cors in server 


emsServer.use(cors())



// parse json data in server 

emsServer.use(express.json())

// user router in server

emsServer.use(router)

emsServer.use('/uploads',express.static("./uploads"))




// customize port

const PORT=4000||process.env.PORT




// run server app



emsServer.listen(PORT,()=>{
    console.log(`ems server started at port:${PORT}`);
})


// emsServer.post('/',(req,res)=>{
//     res.send(`<h1>ems server started at port 4000</h1>`)
// })









