import mongoose from "mongoose";

const BookingSchema= new mongoose.Schema({
    productId:{type:String,required:true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
})

const BookingModel=mongoose.models.bookings || mongoose.model("bookings",BookingSchema);
export default BookingModel