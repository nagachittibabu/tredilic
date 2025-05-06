import mongoose from "mongoose"


const DBConnect = async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.info("DB successfullt connected");
    } catch (error) {
        console.error(error);
    }
}
export default DBConnect