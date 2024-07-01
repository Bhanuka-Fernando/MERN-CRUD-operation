const mongoose = require('mongoose')
const details = require('../models/detailsModel')


//Get all details
const getAllDetails = async(req, res) => {
    const detail = await details.find({}).sort({createdAt: -1})

    res.status(200).json(detail)
}

//Get a single details
const getDetail = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such detail' });
    }

    try {
        const detail = await details.findById(id);

        if (!detail) {
            return res.status(404).json({ error: 'No such details' });
        }

        return res.status(200).json(detail);
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
};




//post a new details
const createDetails =  async (req, res) => {
    const {firstName,lastName,email} = req.body
    try{
        const detail = await details.create({firstName,lastName,email})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//delete a detail
const deleteDetail = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such detail' });
    }

    const detail = await details.findByIdAndDelete({_id: id})

    if(!detail){
        return res.status(400).json({error: 'No such a detail'})
    }
    res.status(200).json(detail)
    
}


//update a details

const updateDetail = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such an Inventory item'})
    }

    const detail = await details.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!detail){
        return res.status(400).json({error: 'No such an Inventory Item'})
    }
    res.status(200).json(detail)
}


module.exports= {
    createDetails,
    getAllDetails,
    getDetail,
    deleteDetail,
    updateDetail
}