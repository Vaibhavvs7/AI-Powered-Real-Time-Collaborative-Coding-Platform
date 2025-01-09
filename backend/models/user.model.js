import mongoose from "mongoose";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength:[6, 'Email must be at least 5 characters.'],
        maxLength: [50, 'Email must be at most 50 characters.'],
    },
    password: {
        type: String,
        select: false,
    },
});

userSchema.statics.hashPassword = async function(password) {
    return await bycrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function(password) {
    return await bycrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function() {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET);
};

const User = mongoose.model('user', userSchema);

export default User;
