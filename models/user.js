
const  mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    isAdmin: Boolean,
    order: {
        type: [String],
        default: [],
    },
    contact: Number,
    picture: String,
});


module.exports = mongoose.model('user',userSchema);