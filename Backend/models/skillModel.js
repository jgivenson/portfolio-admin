const mongoose = require('mongoose')

const Schema = mongoose.Schema
const skillSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    numberOfYears:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        require:true
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('Skill',skillSchema)