const Testimonial = require('../models/testimonialModel')

const mongoose = require('mongoose')


//get all the skills
const getTestimonials = async (req,res)=>{
   
    const user_id = req.user._id;


    const testimonials = await Testimonial.find({user_id}).sort({createdAt: -1});
    
    res.status(200).json(testimonials)
}

const getTestimonial = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No Such skill"})
    }

    const testimonial = await Testimonial.findById(id)
    if (!testimonial)
    {
        return res.status(404).json({error:"No Such testimonial"})
    }
    res.status(200).json(testimonial)
}

// Create new skill
const createTestimonial = async (req,res)=>{
    const {testimony,companyName,publish}=req.body

    let emptyFields =[]

    //check for empty fields
    if(!testimony)
    {
        emptyFields.push('testimony')
    }

    if(emptyFields.length>0)
    {
        return res.status(400).json({error:"Please fill in the missing fields",emptyFields})
    }


    // we are adding the doucment to the db
    try {
        const user_id = req.user._id;

        const testimonial = await Testimonial.create({testimony,companyName,publish,user_id});
        res.status(200).json(testimonial)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

//delete a skill
const deleteTestimonial =async (req,res)=>{
    const { id } = req.params
    //check if this is a valid id
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No Such Testimonial"})
    }
    //delete the skill with the id soecified
    const testimonial = await Testimonial.findByIdAndDelete({_id:id})
    if(!testimonial)
    {
        return res.status(404).json({error:"No Such skill"})
    }

    res.status(200).json(testimonial)

}

//update skill
const updateTestimonial = async (req,res)=>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:"No such testimonial"})
    }
    const testimonial = await Testimonial.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    if(!testimonial)
    {
        return res.status(404).json({error:"No Such testimonial"})
    }
    
        res.status(200).json(testimonial)

}

module.exports={
    updateTestimonial,
    deleteTestimonial,
    createTestimonial,
    getTestimonials,
    getTestimonial
}