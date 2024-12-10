const User = require('./user.model'); // Mô hình người dùng
const Product = require('./product.model'); // Mô hình sản phẩm
const { Error } = require('mongoose');
const bcrypt = require('bcrypt');
const bcryptjs = require('bcrypt');

module.exports = {
    insert,
    getUser,
    updateUser,
    deletePro,
    getByKey,
    getIdPro,
    login
};

// Hàm thêm sản phẩm
async function insert(body) {
    try {
        const { name, email, password} = body;

        // Kiểm tra người dùng có tồn tại hay không
        const userFind = await User.findOne({email: email});
        if (userFind) {
            throw new Error('Không tìm email');
        }

        var salt = bcryptjs.genSaltSync(10); // tạo vòng lặp 10 lần
        var hash = bcryptjs.hashSync(password, salt);

        // Tạo đối tượng mới từ mô hình sản phẩm
        const userNew = new User({
            name,
            email,
            password: hash
           
        });

        const result = await userNew.save();
        return result;
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error.message);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
}

async function login(body) {
    try {
        const { email, password} = body;

        // Kiểm tra người dùng có tồn tại hay không
        const userFind = await User.findOne({email: email});
        if (!userFind) {
            throw new Error('Sai email');
        }

        const isPasswordMatch = await bcrypt.compare(password, userFind.password);
        
        if (!isPasswordMatch) {
            throw new Error('Sai pass');
        }

        if (userFind || isPasswordMatch) {
            return {status: true, message: 'Dang nhap thanh cong', userFind};
        }

    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error.message);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
    }
}

// Hàm lấy danh sách người dùng
async function getUser() {
    try {
        const result1 = await User.find().limit(5).sort({ _id: 1 });
        const result2 = await User.find({ price: { $gt: 2000 } }, { name: 1, price: 1 });
        const result3 = await User.find({ $and: [{ price: { $gt: 2000 } }] }, { name: 1, price: 1 });
        const result4 = await User.find({ name: { $regex: 'o' + '.*' } });
        return result1;
    } catch (error) {
        console.error('Lỗi khi lấy người dùng:', error.message);
        throw error;
    }
}

// Hàm cập nhật thông tin người dùng
async function updateUser(id, body) {
    try {
        const pro = await User.findById(id);
        if (!pro) {
            throw new Error('Không tìm thấy người dùng');
        }

        const { name, email, password, user } = body;
        let userFind = null;
        
        if (user) {
            userFind = await User.findById(user);
            if (!userFind) {
                throw new Error('Không tìm thấy người dùng');
            }
        }

        const userUpdate = userFind ? {
            userId: userFind._id,
            userName: userFind.name
        } : pro.user;

        const result = await User.findByIdAndUpdate(id, 
            { name, email, password, user: userUpdate },
            { new: true }
        );

        return result;
    } catch (error) {
        console.error('Lỗi khi cập nhật người dùng:', error.message);
        throw error;
    }
}

// Hàm xóa người dùng
async function deletePro(id) {
    try {
        const proDel = await User.findByIdAndDelete(id);
        if (!proDel) {
            throw new Error('Không tìm thấy người dùng');
        }
        return proDel;
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error.message);
        throw error;
    }
}

// Hàm lấy người dùng theo key
async function getByKey(key, value) {
    try {
        const result = await User.findOne({ [key]: value });
        return result;
    } catch (error) {
        console.error('Lỗi khi tìm người dùng:', error.message);
        throw error;   
    }
}

// Hàm lấy người dùng theo ID
async function getIdPro(id) {
    try {
        const result = await User.findById(id);
        return result;
    } catch (error) {
        console.error('Lỗi khi tìm người dùng theo ID:', error.message);
        throw error;   
    }
}
