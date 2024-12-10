const employModel = require('./employ.model');

module.exports = { getAllFemales, addEmploy };

async function getAllFemales() {
    try {
        const result = await employModel.find({ gender: 'Female' }).sort({ day: -1 });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function addEmploy(data) {
    try {
        const newEmploy = new employModel(data);
        const result = await newEmploy.save();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
