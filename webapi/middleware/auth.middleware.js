module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // Kiểm tra token (có thể sử dụng jwt.verify nếu dùng JWT)
        // jwt.verify(token, 'secretKey');
        next(); // Cho phép tiếp tục nếu token hợp lệ
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};
