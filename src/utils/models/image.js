import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

const ImageModel =mongoose.models.Image || mongoose.model('Image', imageSchema);
export default ImageModel