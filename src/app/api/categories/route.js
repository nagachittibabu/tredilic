import { NextResponse } from "next/server";
import ItemsModel from "@/utils/models/items";
import DBConnect from "@/utils/config/db";
import { Products } from "@/interfaces/products";

export async function GET(req) {
    await DBConnect();
   const url = new URL(req.url)
   const name=url.searchParams.get('name')
    try {
        const mainCategory = await ItemsModel.findOne({ "products.category_name": name });

        const fetchedProducts = []
        mainCategory.get("products").forEach(element => {
            if (element.category_name === name) fetchedProducts.push(element);
        })

        return NextResponse.json({ success: true, fetchedProducts }, { status: 200 });

    } catch (error) {
        console.error("Error fetching subcategory products:", error);
        return NextResponse.json({ success: false, message: "Failed to get subcategory products" }, { status: 500 });
    }
}