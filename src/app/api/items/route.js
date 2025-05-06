import { NextResponse } from "next/server";
import DBConnect from "../../../utils/config/db";
import MainCategory from "../../../utils/models/data";
import ItemsModel from "@/utils/models/items";

export async function GET() {
    await DBConnect();
    try {
     

        const result =await ItemsModel.find({})
        let products=result;
        if (!products) {
            return NextResponse.json({ success: false }, { status: 404 }, { Response: "products not found" })
        }
        return NextResponse.json({ success: true, products }, { status: 201 }, { Response: "Fetch products succesfully" })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 }, { Response: "failed to get products" })
    }
}