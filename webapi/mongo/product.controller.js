const productModel = require('./product.model')
const categoryModel = require('./category.model')
const { Error } = require('mongoose')

module.exports = {insert, getProduct, updatePro, deletePro, getByKey, getIdPro, getProductsByCategory, getProductByName}

async function insert(body) {
    try {
        const {name, price, mota, hinhanh, image, category} = body

        const categoryFind = await categoryModel.findById(category)
        if(!categoryFind){
            throw new Error('Không tìm thấy danh mục')
        }
        const proNew = new productModel({
            name, price, mota, image, hinhanh,  
            category:{
                categoryId: categoryFind._id,
                categoryName: categoryFind.name
            }
        })
        const result = await proNew.save()
        return result
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getProduct() {
    try {
        const result1 = await productModel.find().sort({_id: 1})
        // select name, price where price > 2000
        const result2 = await productModel.find({
            price: {$gt:2000}
        },{name:1, price:1})
        //select * where price > 2000 and quanlity < 50
        const result3 = await productModel.find({
            $and: [
                {price: {$gt:2000}},
                // {quanlity: {$gt:2000}}
            ]
            
        },{name:1, price:1})
        //
        const result4 = await productModel.find({
            name: {
                $regex: 'o'+'.*',
                // $option: 'i'
                // i không phân biệt hoa thường
            }
            
        })
        return result1
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function updatePro(id, body) {
    try {
        const pro = await productModel.findById(id)
        if(!pro){
            throw new Error('Đếch thấy sản phẩm')
        }
        const {name, price, mota, image, category, hinhanh} = body
        let categoryFind = null
        if(categoryFind){
            categoryFind = await categoryModel.findById(category)
            if(!categoryFind){
                throw new Error('Đếch thấy danh mục')
            }
        }
        const categoryUpdate = categoryFind? {
            categoryId: categoryFind._id,
            categoryName: categoryFind.name
        }: pro.category
        const result = await productModel.findByIdAndUpdate(id,
            {name, price, mota, image, hinhanh, category, category: categoryUpdate},
            {new: true}
        )
        return result
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function deletePro(id) {
    try {
        const proDel = await productModel.findByIdAndDelete(id)
        if(!proDel){
            throw new Error('Không tìm thấy sản phẩm')
        }
        return proDel
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function getByKey(key, value) {
    try {
        const result = await productModel.findOne({[key]: value})
        return result
    } catch (error) {
        console.log(error);
        throw error   
    }
}

async function getProductsByCategory(categoryId) {
    try {
        const products = await productModel.find({ 'category.categoryId': categoryId });
        return products;
    } catch (error) {
        console.error('Error fetching products by categoryId:', error);
        throw error;
    }
}
async function getProductByName(keyword) {
    try {
        const products = await productModel.find({ 
            name: { 
                $regex: keyword, 
                $options: 'i'
            } 
        });
        if (products.length === 0) {
            return { status: false, mess: 'Không tìm thấy sản phẩm.' };
        }
        return products;
    } catch (error) {
        console.error('Lỗi khi tìm sản phẩm theo tên:', error);
        throw error;
    }
}



async function getIdPro(id) {
    try {
        const result = await productModel.findById(id)
        return result
    } catch (error) {
        console.log(error);
        throw error   
    }
}