//connect collection categories
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const userSchema = new schema({
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    pass: {type: String, required: true},
    hinhanh: {type: String, require: false},
    diachi: {type: String, require: true},
    ngaysinh: {type: String, require: true},
    gioitinh: {type: String, require: true, default: "Khong gioi tinh"},
    numberphone: {type: String, require: true},
    role: {type: Number, required: false, default: 0}
})

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
