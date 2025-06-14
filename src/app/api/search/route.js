import DBConnect from "../../../utils/config/db"
import MainCategoryModel from "../../../utils/models/data";
import { NextResponse } from "../../../../node_modules/next/server";export  async function GET(req){
  const url=new URL(req.url)
  const searchInput=url.searchParams.get('input');
  const filteredProducts = [];
  const lowerSearchInput = searchInput.toLowerCase();
  await DBConnect();
  try {
    const data= await MainCategoryModel.find({});
    const filterData=data.map((ele)=>ele.products.map((e)=>e.products.map((event)=>event.title)));
    const totalProductTitles=filterData.flat(Infinity);

    totalProductTitles.forEach((ele)=>{
      if(lowerSearchInput.split("").every(char => ele.toLowerCase().includes(char))){
        console.log(ele);
        filteredProducts.push(ele)
      }
    })

    return NextResponse.json({success:true ,filteredProducts},{status:200})
  } catch (error) {
    console.error("There are no products");
    return NextResponse.json({success:false},{status:404})
  }
}