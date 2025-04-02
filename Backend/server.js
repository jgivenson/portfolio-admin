require('dotenv').config()


const express  = require('express')

const mongoose = require('mongoose');

const skillRoutes = require('./routes/skills')
const testimonialRoutes = require('./routes/testimonials')

const userRoutes = require('./routes/user')

//Express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})


//routes/api end points
app.use('/api/skills', skillRoutes)
app.use('/api/user', userRoutes)
app.use('/api/testimonials',testimonialRoutes)

//connect to the MONGO DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT,()=>{
            console.log('Connected to the Db and Listening on port ',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })


