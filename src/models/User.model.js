import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';  

const USerSchema = new mongoose.Schema({
    usernmae: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avtar: {
        type: String,//cloudinary url
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url
    },
    WhatchHistory: [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password: {
        type : String,
        required :[ true, " password is required"]
    },
    refreshToken: {
        type: String
    }

},{timestamps : true})

USerSchema.pre("save", async function(next){
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordcorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function() {
    jwt.sign(
        {
            _id: this._id 
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    );
}
UserSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {
            _id: this._id 
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY 
        }
    );
}

export const User = mongoose.model('User', USerSchema);