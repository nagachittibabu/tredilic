import ItemsModel from "@/utils/models/items";
import DBConnect from "@/utils/config/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    await DBConnect();
    try {
        const { searchParams } = new URL(req.url); // Extract query params
        const mainCat = searchParams.get("mainCat");
        const subCat = searchParams.get("subCat");      
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