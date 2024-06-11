import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiresponse.js"


const registerUser=asyncHandler( async(req,res) => {
    //get user details
    //validation--not empty
    //checke if user already exist: username se aur email se
    //check for images
    //check for avtar
    //upkoad them to cloudinary
    //create user object -create entry in db
    //remove password and refresh token field from response
    //check user creation 
    //return response

    const {fullName,email,username,password}=req.body
    console.log("email",email);
    
    /*
    //hum ek ek krke sare field bhi check kr skkte ya to next walla use kr skte jo sabko ek baar me check krega
    if(fullname===""){
        throw new ApiError(400,"fullname is required")
    }*/


    if(
        [fullname,email,usernam,password].some((field) =>
        field?.trim()==="")
    ){
        throw new ApiError(400,"fullname is required")
    }

    const existUser=User.findOne({
        $or:[{username},{email}]
    })
    if (existUser){
        throw new ApiError(409,"userwith email or username already exist")
    }

    const avtarLocalPath=req.files?.avtar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path

    if(!avtarLocalPath){
        throw new ApiError(400,"avtar file is required")
    }

    const avtar=await uploadOnCloudinary(avtarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avtar){
        throw new ApiError(400,"avtar file is required")
    }

    username.create({
        fullName,
        avtar:avtar.url,
        coverImage:coverImage.url || "",
        email,
        password,
        username:username.toLowerCase()

    })
    const CreatedUser=await username.findById(user._id).select(
        "-password -refreshTpken"
    )
    if(!CreatedUser){
        throw new ApiError(400,"error")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"userRregistered successfully")
    )
})

export {registerUser}