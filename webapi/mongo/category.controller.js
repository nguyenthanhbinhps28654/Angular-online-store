const categoryModel = require('./category.model')
const { Error } = require('mongoose')

module.exports = { getAllCate, createCate, updateCate, deleteCate, getIdCate };

async function getAllCate() {
    try {
        const result = await categoryModel.find();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createCate(data) {
    try {
        const newCate = new categoryModel(data);
        const result = await newCate.save();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateCate(id, data) {
    try {
        const result = await categoryModel.findByIdAndUpdate(id, data, { new: true });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteCate(id) {
    try {
        const result = await categoryModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getIdCate(id) {
    try {
        const result = await categoryModel.findById(id);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
