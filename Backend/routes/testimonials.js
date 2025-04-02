const express = require('express')

const {
    getTestimonials,
    getTestimonial,
    createTestimonial,
    deleteTestimonial,
    updateTestimonial
} = require('../controllers/testimonialController')

const requireAuth = require('../middleware/requireAuth')
 

const router = express.Router()
router.use(requireAuth);

router.get('/',getTestimonials) 
router.get('/:id',getTestimonial)

router.post('/',createTestimonial)

//DELETE skill
router.delete('/:id',deleteTestimonial)

//UPDATE skills
router.patch('/:id',updateTestimonial)

module.exports = router