import { NextResponse } from "../../../../node_modules/next/server";
import DBConnect from "../../../utils/config/db";
import MainCategoryModel from "../../../utils/models/data"

export async function GET(req){
    let totalProducts=[]
    await DBConnect();
    try {
        const products=await MainCategoryModel.find({});
        products.map((e)=>(
            totalProducts.push(e.products.map((ele)=>ele.products).flat())
        ))
        return NextResponse.json({success:true,totalProducts});
    } catch (error) {
        console.error("unable to get the products",error);
    }
}











