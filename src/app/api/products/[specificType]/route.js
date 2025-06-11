import { NextResponse } from "next/server";
import DBConnect from "../../../../utils/config/db"
import MainCategoryModel from "@/utils/models/data";

export async function GET(req) {
    await DBConnect();
    const url = new URL(req.url)
    const categoryName = url.searchParams.get('name');
    const categoryType = url.searchParams.get('subCategory');
    const productId = url.searchParams.get('productId');
    if (!categoryName) {
        return NextResponse.json({ success: false, message: "category is not valid" }, { status: 500 })
    }
    if (productId) {
        try {
            const mainCategory = await MainCategoryModel.find({});
            if (!mainCategory) {
                return NextResponse.json({ success: false, message: "Main category not found" }, { status: 404 });
            }
            const filterProduct=mainCategory.flatMap(category =>
                category.products.flatMap(subcategory =>
                    subcategory.products.filter(e =>e.productId==productId)
                )
            );
            return NextResponse.json({ success: true, filterProduct }, { status: 200 })
        }
        catch (error) {
            console.error("Error fetching subcategory products:", error);
            return NextResponse.json({ success: false, message: "Failed to get subcategory products" }, { status: 500 });
        }
    }
    if (categoryName) {
        if (!productId) {
            if (categoryType && categoryType.length > 2) {
                try {
                    const mainCategory = await MainCategoryModel.findOne({ category_name: categoryName });
                    if (!mainCategory) {
                        return NextResponse.json({ success: false, message: "Main category not found" }, { status: 404 });
                    }
                    const fetchedProducts = mainCategory.products.filter(element => element.category_name == categoryType)
                        .map(element => element.products);
                    if (fetchedProducts.length == 0) {
                        return NextResponse.json({ success: false, message: "No products under this Selected Category" })
                    }
                    return NextResponse.json({ success: true, fetchedProducts }, { status: 200 });

                } catch (error) {
                    console.error("Error fetching data");
                }
            }
            if (categoryName) {
                try {
                    const mainCategory = await MainCategoryModel.findOne({ category_name: categoryName });
                    if (!mainCategory) {
                        return NextResponse.json({ success: false, message: "Main category not found" }, { status: 404 });
                    }
                    const fetchedProducts = mainCategory.products.map(element => element);

                    return NextResponse.json({ success: true, fetchedProducts }, { status: 200 });
                }
                catch (error) {
                    console.error("Error fetching subcategory products:", error);
                    return NextResponse.json({ success: false, message: "Failed to get subcategory products" }, { status: 500 });
                }
            }
        }
    }

}