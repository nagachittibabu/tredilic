import { NextResponse } from "next/server";
import DBConnect from "@/utils/config/db";
import MainCategoryModel from "@/utils/models/data";

export async function GET(req) {
    await DBConnect();
    const url = new URL(req.url)
    const name = url.searchParams.get('name');
    const categorytype = url.searchParams.get('categorytype');
    if (!name) {
        return NextResponse.json({ success: false }, { message: "subcategory name is undefined" }, { status: 500 })
    }   
    if (categorytype&&name) { 
        try {
            const mainCategory = await MainCategoryModel.findOne({ category_name: name });
            if (!mainCategory) {
                return NextResponse.json({ success: false, message: "Main category not found" }, { status: 404 });
            }
            const fetchedProducts = mainCategory.products.filter(element => element.category_name==categorytype)
                                                  .map(element => element.products);
            if(fetchedProducts.length ==0){
                return NextResponse.json({success:false,message:"No products under this Selected Category"})
            }
            return NextResponse.json({ success: true, fetchedProducts }, { status: 200 });
    
        } catch (error) {
            console.error("Error fetching subcategory products:", error);
            return NextResponse.json({ success: false, message: "Failed to get subcategory products" }, { status: 500 });
        }
    } else {
        try {
            const mainCategory = await MainCategoryModel.findOne({ category_name: name });
            if (!mainCategory) {
                return NextResponse.json({ success: false, message: "Main category not found" }, { status: 404 });
            }
            
            const fetchedProducts = mainCategory.products.map(element => element.category_name);
    
            return NextResponse.json({ success: true, fetchedProducts }, { status: 200 });
    
        } catch (error) {
            console.error("Error fetching subcategory products:", error);
            return NextResponse.json({ success: false, message: "Failed to get subcategory products" }, { status: 500 });
        }
    }
}