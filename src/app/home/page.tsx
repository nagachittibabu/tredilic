"use client"
import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { useRouter } from "../../../node_modules/next/navigation";
import Banner from "./components/banner";
import Categorycard from "./components/categorycard";
import SubCategoryCard from "./components/subCategoryCard";
// https://tredilic-gooturu-naga-chittibabus-projects.vercel.app
const HomePage = () => {
  const [val, setval] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [mainCat, setmainCat] = useState('');
  const [categoryClick, setCategoryClick] = useState(false)
  const [subCategoryClick, setSubCategoryClick] = useState("");
  const router = useRouter();
  const SubCategoryClick = async (element: String) => {
    try {
      const products = await fetch(`http://localhost:3000/api/categories/category?name=${subCategoryClick}&categorytype=${element}`);
      const data = await products.json();
      router.push(`/products?categoryName=${subCategoryClick}&subCategory=${element}`);
    }
    catch (error) {
      console.error("Error fetching subcategories:");
    }
  }
  const CategoryFind = async (subCategory: string) => {
    setCategoryClick(true)
    setSubCategoryClick(subCategory);
    try {
      const products = await fetch(`http://localhost:3000/api/categories/category?name=${subCategory}&categorytype=`);
      const data = await products.json();
      setsubCategories(data.fetchedProducts);
      console.log(data);
    }
    catch (error) {
      console.error("Error fetching subcategories:");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const products = await fetch(`https://tredilic-gooturu-naga-chittibabus-projects.vercel.app/api/categories?name=${subCat}`);
        const products = await fetch(`http://localhost:3000/api/categories`)
        const items = await products.json();
        setval(items.categories);
      } catch (error: any) {
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full px-4 ">
      <div className="w-full lg:h-[480px] md:h-[400px] sm:h-[380px]">
        <Banner />
      </div>
      <div className="w-full h-[80px] flex items-center justify-center bg-blue-200  rounded-t-lg">
          <h1 className="text-center font-bold lg:text-[28px] md:text-[26px] sm:text-[24px] tracking-[6px] text22px">CATEGORIES</h1>
        </div>
      <div className="w-full h-max h-[400px] md:h-max sm:h-max rounded-b-lg shadow-lg bg-blue-200  flex flex-nowrap justify-evenly items-center py-0 md:py-10  sm:py-10 overflow-x-auto  scroll-smooth snap-x whitespace-nowrap lg:space-x-0 md:space-x-8 sm:space-x-6 lg:px-0 md:px-10 sm:px-0 categoryContainerCss">
        {val?.map((ele: any, i: number) => (
          <div key={i} className="min-w-[250px] lg:w-1/5 md:w-[250px] sm:w-[150px] lg:h-[350px] md:h-[320px] sm:h-[280px] categoryCardCss snap-start whitespace-nowrap lg:px-0 md:px-3 sm:px-4" onClick={() => CategoryFind(ele.categoryName)}>
            <Categorycard imageurl={ele.imageurl} categoryName={ele.categoryName} />
          </div>
        ))}
      </div>
      <div className="w-full h-full">
        {categoryClick && (
          <div className="w-full h-full border flex flex-nowrap overflow-x-scroll scroll-smooth snap-x whitespace-nowrap subCatScroll">
            {subCategories.map((ele: any, i: number) => (
              <div className="min-w-[220px] lg:w-1/4 md:w-1/3 sm:w-[200px]  h-[200px] bg-slate-200 text-white flex items-center justify-center border snap-start whitespace-nowrap " onClick={() => SubCategoryClick(ele)} key={i}>
                <SubCategoryCard subCategoryName={ele} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 