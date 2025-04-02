const mongoose = require('mongoose')

const Schema = mongoose.Schema
const testimonialSchema = new Schema({
    testimony:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:false
    },
    publish:{
        type:Boolean,
        default:false
    },
    user_id:{
        type:String,
        require:true
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Testimonial',testimonialSchema)