const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const productSchema = new Schema({
    
    name: {type: String, required: false},
    price: {type: Number, required: false},
    mota: {type: String, required: false},
    hinhanh: {type: String, required: false},
    image: {type: String, required: false},
    category:{
        type:{
            categoryId: {type: ObjectId, required: true},
            categoryName: {type: String, required: true},
        },
        required: true
    }
})

module.exports = mongoose.models.product || mongoose.model('product',productSchema)