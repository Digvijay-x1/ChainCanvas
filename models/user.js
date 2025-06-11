
const  mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: {
        type: [String],
        default: [],
    },
    isAdmin: Boolean,
    order: {
        type: [String],
        default: [],
    },
    contact: Number,
    picture: String,
});


module.exports = mongoose.model('user',userSchema);