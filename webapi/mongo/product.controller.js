const productModel = require('./product.model');
const categoryModel = require('./category.model');
const { Error } = require('mongoose');

module.exports = { insert, getProduct, updatePro, deletePro, getByKey, getIdPro };

async function insert(body) {
    try {
        const { name, price, mota, image, category,HinhAnh } = body;

        const categoryFind = await categoryModel.findById(category);
        if (!categoryFind) {
            throw new Error('Không tìm thấy danh mục');
        }

        const proNew = new productModel({
            name, price, mota, image,HinhAnh,
            category: {
                categoryId: categoryFind._id,
                categoryName: categoryFind.name
            }
        });

        const result = await proNew.save();
        return result;
    } catch (error) {
        console.error('Error in insert:', error);
        throw error;
    }
}

async function getProduct() {
    try {
        const result1 = await productModel.find().sort({_id: 1});
        return result1;
    } catch (error) {
        console.error('Error in getProduct:', error);
        throw error;
    }
}

async function updatePro(id, body) {
    try {
        const pro = await productModel.findById(id);
        if (!pro) {
            throw new Error('Không tìm thấy sản phẩm');
        }

        const { name, price, mota, image, category,HinhAnh } = body;
        let categoryFind = null;

        if (category) {
            categoryFind = await categoryModel.findById(category);
            if (!categoryFind) {
                throw new Error('Không tìm thấy danh mục');
            }
        }

        const categoryUpdate = categoryFind ? {
            categoryId: categoryFind._id,
            categoryName: categoryFind.name
        } : pro.category;

        const result = await productModel.findByIdAndUpdate(id, {
            name, price, mota, image,HinhAnh,
            category: categoryUpdate
        }, { new: true });

        return result;
    } catch (error) {
        console.error('Error in updatePro:', error);
        throw error;
    }
}

async function deletePro(id) {
    try {
        const proDel = await productModel.findByIdAndDelete(id);
        if (!proDel) {
            throw new Error('Không tìm thấy sản phẩm');
        }
        return proDel;
    } catch (error) {
        console.error('Error in deletePro:', error);
        throw error;
    }
}

async function getByKey(key, value) {
    try {
        const result = await productModel.findOne({ [key]: value });
        return result;
    } catch (error) {
        console.error('Error in getByKey:', error);
        throw error;
    }
}

async function getIdPro(id) {
    try {
        const result = await productModel.findById(id);
        return result;
    } catch (error) {
        console.error('Error in getIdPro:', error);
        throw error;
    }
}
