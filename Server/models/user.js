const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: [true, 'email is ducplicated'],
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User