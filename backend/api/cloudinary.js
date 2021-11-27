const cloudinary = require("cloudinary").v2;
const multer=require('multer');
const {CloudinaryStorage} =require("multer-storage-cloudinary");
const dotenv=require('dotenv');
dotenv.config()


cloudinary.config(
    {
        cloud_name:'dcgsqextx',
        api_key:418881134161377,
        api_secret:'lSJTfgn2D30fdWNqvi9vBQKLBq0'


    }
)



const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"users",
        format:async()=>"png",
        public_id:(req,file)=>file.filename,
    }
});

const parser=multer({storage:storage});
module.exports=parser;