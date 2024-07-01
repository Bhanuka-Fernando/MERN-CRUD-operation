const express = require('express')
const {
    createDetails,
    getAllDetails,
    getDetail,
    deleteDetail,
    updateDetail
} = require('../controllers/detailsController')

const router = express.Router()

//Get all details
router.get('/',getAllDetails)


//Get a singlw details
router.get('/:id',getDetail)

//post a new details
router.post('/', createDetails)

//delete a detail
router.delete('/:id',deleteDetail)

//update a details
router.patch('/:id',updateDetail)



module.exports = router