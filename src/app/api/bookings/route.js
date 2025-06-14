import BookingModel from "../../../utils/models/booking"
import DBConnect from "@/utils/config/db";
import { NextResponse } from "../../../../node_modules/next/server";

export async function GET(req){
    await DBConnect();
    try {
        const bookings=await BookingModel.find({});
        return NextResponse.json({success:true,bookings,message:"bookings fetched Successfully"})
    } catch (error) {
        console.error("error in the bookings fetch");
        return NextResponse.json({success:false,message:" error fetched details"})
    }
}

export async function DELETE(req){
    const url=new URL(req.url);
    const productId=url.searchParams.get("productId");
    if (!productId) return NextResponse.json({ success: false, message: "Missing productId" }, { status: 400 });
    
    await DBConnect();
    try {
        const removeItem=await BookingModel.deleteOne({productId:productId});
        
        if (removeItem.deletedCount === 0) {
            return Response.json({ success: false, message: "Item not found" }, { status: 404 });
          }
      
        return Response.json({ success: true, message: "Item deleted" }, { status: 200 });

    } catch (error) {
        console.error("unable to remove the item");
    }
}


export async function PATCH(req){
    const body=await req.json();
    const {productId,quantity,size}=body[0]

    if(!productId){
        return NextResponse.json({success:false ,message:"productId is missing"},{status:500})
    }
    await DBConnect();
    try {
        const updateFields = {};
      if (quantity) updateFields.quantity = quantity;
      if (size) updateFields.size = size;

        const updatedBooking = await BookingModel.findOneAndUpdate(
        { productId },
        { $set: updateFields },
        { new: true }
      );
        
      if (!updatedBooking) {
        return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, updatedBooking, message: "Booking updated successfully" });

    } catch (error) {
        console.error("unable to update the item");
        return NextResponse.json({success:false},{status:404})
    }
}