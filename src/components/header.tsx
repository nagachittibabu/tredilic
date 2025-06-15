    "use client";

    import React, { useEffect, useState } from "react";
    import Link from "../../node_modules/next/link";
    import { useRouter } from "../../node_modules/next/navigation";

    export default function Header() {
        const router =useRouter();
        const [mainCategory,setmainCategory]=useState([]);
        const [selectedCategory,setSelectedCategory]=useState(null)
        const [categories, setcategories] = useState([]);
        const [searchProducts,setSearchProducts]=useState([]);
        const [SearchIn,setSearchInput]=useState("")

        const SearchInput=async()=>{
            const searchProducts=await fetch(`https://tredilic-gooturu-naga-chittibabus-projects.vercel.app//api/search?input=${SearchIn}`);
            const searchedValues=await searchProducts.json();
            setSearchProducts(searchedValues.filteredProducts);
        }
       
        useEffect(()=>{
            if(SearchIn.length >1){
                SearchInput()
            }
        },[SearchIn]);

        const CategoryHover = async (e:any) => {
            setSelectedCategory(e.target.value)
            const products = await fetch(`https://tredilic-gooturu-naga-chittibabus-projects.vercel.app//api/categories/category?name=${e.target.value}&categorytype=`);
            const data = await products.json();
            setcategories(data.fetchedProducts);
        };
        useEffect(()=>{
            const categoryfetch=async()=>{
                const categoriesget=await fetch("https://tredilic-gooturu-naga-chittibabus-projects.vercel.app//api/categories");
                const data=await categoriesget.json();
                setmainCategory(data.categories);
            }
            categoryfetch()
        },[])
        const ProductClick=(ele:string)=>{
            router.push(`/products?categoryName=${selectedCategory}&subCategory=${ele}`);
        }        
        const selectedProduct=(ele:string)=>{

        }
        return (
            <div className="w-full lg:h-16 md:h-14 sm:h-12 bg-white border-b sticky top-0 right-0 z-50 text-black flex justify-center height45" onMouseLeave={()=>setcategories([])} >
                <div className="w-full flex lg:justify-between lg:items-center md:justify-between md:items-center sm:justify-between sm:items-center lg:px-12 md:px-6 sm:px-8 headercss">
                    <div className="flex items-center">
                        <Link href="/">
                            <h1 className="font-bold lg:text-3xl md:text-2xl sm:text-xl lg:font-bold md:font-bold sm:font-bold text-blue-500">
                                    Tredilic
                            </h1>
                        </Link>
                    </div>
                    <div>
                        <ul className="lg:text-[15px] md:text-[14px] sm:text-[10px] flex lg:space-x-12 md:space-x-5 items-center justify-center relative display-none font-medium">
                            <li>
                                <button className="hover:text-blue-300 " onMouseOver={CategoryHover} value="men's dresses">
                                    Men
                                </button>
                            </li>
                            <li>
                                <button className="hover:text-blue-300 " onMouseOver={CategoryHover} value="Women's Dresses">
                                    Women
                                </button>
                            </li>
                            <li>
                                <button className="hover:text-blue-300" onMouseOver={CategoryHover} value="Kids' Dresses">
                                    Kids
                                </button>
                            </li>
                            <li>
                                <button className="hover:text-blue-300" onMouseOver={CategoryHover} value="Accessories">
                                    Accessories
                                </button>
                            </li>
                        </ul>
                        {categories.length > 0 && (
                            <div className="absolute top-35 left-100 bg-white border rounded shadow-md mt-2 w-[25%]" onMouseLeave={()=>setcategories([])}>
                                <ul className="py-2">
                                    {categories.map((subcategory, index) => (
                                        <li key={index} className="px-4 py-2 hover:bg-blue-100 cursor-pointer " onClick={()=>ProductClick(subcategory)}>
                                            {subcategory}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center lg:w-1/3 md:w-1/3 sm:w-[60%] h-[30px] rounded-lg shadow-md relative width75 bg-blue-100" >
                        <input
                            type="text"
                            className="w-full border h-full px-2 bg-blue-50"
                            placeholder="Search..."
                            onChange={(e)=>setSearchInput(e.target.value)}
                        />
                        {searchProducts.length > 0 && (
                        <div
                            className="absolute top-[25px] left-0 border rounded shadow-md mt-2 w-full z-50 h-[300px] overflow-hidden overflow-y-scroll"
                            onMouseLeave={()=>setSearchProducts([])}
                        >
                            <ul className="py-2 px-4">
                                {searchProducts.map((title, index) => (
                                    <li
                                        key={index}
                                        onClick={()=>selectedProduct(title)}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                    >
                                        {title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    </div>
                    <div className="flex items-center">
                        <div className="w-1/4 lg:text-[14px] md:text-[14px] sm:text-[12px]">
                            <ul className="flex  lg:space-x-12 md:space-x-5 sm:space-x-6 font-medium">
                                <li>
                                    <Link href="/Login" className="hover:text-blue-300 hidecontent">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/Register" className="hover:text-blue-300 hidecontent">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bag" className="hover:text-blue-300">
                                        Bag
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }