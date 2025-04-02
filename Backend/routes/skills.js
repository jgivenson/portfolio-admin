const express = require('express')

const {
    getSkills,
    getSkill,
    createSkill,
    deleteSkill,
    updateSkill
} = require('../controllers/skillController')

const requireAuth = require('../middleware/requireAuth')
 

const router = express.Router()
router.use(requireAuth);

router.get('/',getSkills) 
router.get('/:id',getSkill)

router.post('/',createSkill)

//DELETE skill
router.delete('/:id',deleteSkill)

//UPDATE skills
router.patch('/:id',updateSkill)

module.exports = router