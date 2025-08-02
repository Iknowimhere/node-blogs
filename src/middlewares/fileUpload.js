import dotenv from 'dotenv'
dotenv.config()
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET
})

let storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"node_blogs",
        allowed_formats:["jpeg","png","jpg"]
        // maxSize:"5mb"
    }
})

let upload=multer({storage:storage})

export default upload;