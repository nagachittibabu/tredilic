import { NextResponse } from "next/server";
import DBConnect from "@/utils/config/db";
import MainCategoryModel from "../../../utils/models/data";

export async function GET(req) {
    await DBConnect();
    try {
        const categories = await MainCategoryModel.find().lean();
        const formattedCategories = categories.map(mainCategory =>({
            categoryName :mainCategory.category_name,
            imageurl:mainCategory.imageurl
        }));    
        console.log(formattedCategories);
        return NextResponse.json({ success: true, categories: formattedCategories }, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ success: false, message: "Failed to get Categories" }, { status: 500 });
    }
}