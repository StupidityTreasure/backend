import mongoose, {Schema} from "moongose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const username =new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:trim
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true,

    },
    coverImage:{
        type:String,
        required:true,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectID,
            
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"]

    },
    refreshTokens:{
        type:String
    },


},{
    timestamps:true
})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next;
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.username,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
            email:this.username,
            username:this.username,
            fullname:this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User =mongoose.model("User", userSchema)