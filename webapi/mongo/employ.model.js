const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    day: { type: Number, required: true }
});

module.exports = mongoose.models.Employ || mongoose.model('Employ', employSchema);
