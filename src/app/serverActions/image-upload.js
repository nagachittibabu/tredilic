"use server"
import path from "path";
import DBConnect from "../../utils/config/db"
import ImageModel from "../../utils/models/image"
const ImageUpload=async()=>{
    await DBConnect();
    try {
        const imaeUploading= new ImageModel.create({
            name:"",
            img:{
                data:path.dirname("../../api/images/menswear.png"),
                contentType:"png"
            }
        })
        return NextResponse({success:true,imaeUploading})
    } catch (error) {
        console.error("image not uploaded");
    }
}

export default ImageUpload;