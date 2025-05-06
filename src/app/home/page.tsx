"use client"
import React, { useEffect, useState } from "react";
import Banner from "./components/banner";
import Productcard from "./components/productcard";

const HomePage = () => {
  const [val, setval] = useState([]);
  const [subCat, setsubCat] = useState('');
  const [mainCat, setmainCat] = useState('');
  const CategoryFind=(category:string)=>{
    setmainCat(category)
  }
  const handleCategoryClick = (subCategory:string) => {
    setsubCat(subCategory);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetch(`https://tredilic-gooturu-naga-chittibabus-projects.vercel.app/api/categories?name=${subCat}`);
        const items = await products.json();
        setval(items.products);
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
    <div className="w-full bg-gray-100 min-h-screen px-4 py-8">
      <div className="mb-6">
        <Banner imgSrc={""} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg bg-black border border-2 my-8">
        {val.map((e:any) => (
          <div key={e.category_name} className="mb-8 m-8" onClick={()=>CategoryFind(e.category_name)}>
            <h1 className="text-2xl font-bold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
              {e.category_name}
            </h1>
            <div className="flex justify-between overflow hidden items-left">
              {e.products.map((value:any) => (
                <div
                  key={value.category_name}
                  className=""
                >
                  <Productcard
                    imagePath={""}
                    productCat={value?.category_name ?? ''}
                    clickedCat={handleCategoryClick}
                    description= {value?.description ?? ""}
                    price={value?.price ?? ""}
                  />
                </div>
              ))}
            </div>
          </div>  
        ))}
      </div>
    </div>
  );
};

export default HomePage;