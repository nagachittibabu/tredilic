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