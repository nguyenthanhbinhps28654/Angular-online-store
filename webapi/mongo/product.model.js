const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    mota: { type: String, required: true },
    image: { type: String, required: false },
    HinhAnh: { type: String, required: true },
    category: {
        type: {
            categoryId: { type: ObjectId, required: true },
            categoryName: { type: String, required: true },
        },
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
