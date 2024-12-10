const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const categorySchema = new schema({
    name: { type: String, required: true },
    description: { type: String, required: false }
});

module.exports = mongoose.models.category || mongoose.model('category', categorySchema);
