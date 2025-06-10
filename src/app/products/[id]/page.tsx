"use client"
import ProductCard from '@/app/products/components/productcard';
import React, { useDebugValue, useEffect, useState } from 'react'
import Link from '../../../../node_modules/next/link';
import { useRouter, useSearchParams } from '../../../../node_modules/next/navigation';
import ProductContainer from '../components/productContainer';
import ProductDetail from '../components/productDetail';


const Productspage = () => {
    
    const router=useRouter();
    const searchParams=useSearchParams()
    const categoryName=searchParams.get('name');
    const [showProductdetail,setShowProductDetail]=useState(false);
    const [allProducts,setAllProducts]=useState([])
    const [price, setPrice] = useState(50);
    const [filterProducts,setFilterProducts]=useState([])
    const [selectedProductId,setSelectedProductId]=useState("")
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategoryFilter, setSubcategoryFilter] = useState([])
    const [totalData, setTotalData] = useState([]);
    const [genderTypeFilter, setGenderTypeFilter] = useState([]);

    console.log(categoryName);
    
    const fetchdata = async () => {
        try {
            const products = await fetch(`http://localhost:3000/api/products`);
            const data = await products.json();
            if (data?.totalProducts) {
                let res = data.totalProducts.flat(Infinity);
                setTotalData(res)
            }
        } catch (error) {
            console.error("unable to fetch the data");
        }
    }

    useEffect(() => {
        fetchdata()
    }, [selectedCategory]);
    
    useEffect(()=>{
        
    totalData.map((e) => {
        const productsget = totalData.flatMap(e => e.products.map(ele => ele.products))
        setAllProducts(productsget.flat(Infinity))
      });    
   },[totalData])
   
    const SubCategoryHandle=()=>{
        totalData.map((ele: any) => {
            if(ele.category_name=="men's dresses")
            setSubcategoryFilter(ele.products.map((ele: any) => ele.category_name))
        });
    }
    useEffect(()=>{
    SubCategoryHandle();
   },[totalData]);


    const CategoryFilter = async(e) => {
        setSelectedCategory(e.target.value);
        try {
            const products = await fetch(`http://localhost:3000/api/products/category?name=${e.target.value}`);
            const data = await products.json();
            setFilterProducts(data.fetchedProducts);
            if (data.fetchedProducts.length > 0) {
                setSubcategoryFilter(data.fetchedProducts.flat())
            }
        } catch (error) {
            console.error("unable to fetch the data");
        }

        totalData.map((ele: any) => {
            if (ele.category_name == e.target.value) {
                setSubcategoryFilter(ele.products.map((ele: any) => ele.category_name))
            }
        })
    }

    const CategoryHandle=async()=>{        
    }
    
    const handlePriceChange = (event:any) => {
        setPrice(event.target.value);
    };

    const CancelFilters = () => {
        setPrice(50);
        setSelectedCategory("")
    }

    const ProductDetailHandle=(e)=>{  
        console.log(e);
    }
    return (
        <div className="w-full h-max-content flex bg-gray-100">
            <div className="w-1/4 h-[120vh] flex items-center justify-center border-r bg-white  shadow-md overflow-hidden">
                <div className="w-[90%] h-[90%] border p-4 rounded-lg shadow-sm bg-gray-50">

                    <div className="w-full h-[50px] text-gray-600 font-medium">
                        <Link href="/" className="hover:underline">Home</Link> /
                        <Link href="/products" className="hover:underline">Products</Link>/
                        <button className="hover:underline" >{selectedCategory}</button>
                    </div>

                    <div className="w-full h-[30px] flex items-center justify-between border-b mb-4">
                        <div className="font-bold text-lg">FILTERS</div>
                        <button
                            className="px-4 py-1 border rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600"
                            onClick={CancelFilters}
                        >
                            Cancel All
                        </button>
                    </div>

                    <h1 className="text-lg font-semibold mb-2">Type</h1>
                    <div className="space-y-2">
                        {["men's dresses", "Women's Dresses", "Kids' Dresses"].map((category,i) => (
                            <label key={i} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={category}
                                    onChange={CategoryFilter}
                                    checked={selectedCategory === category}
                                    className="accent-blue-500"
                                    onClick={CategoryHandle}
                                />
                                {category}
                            </label>
                        ))}
                    </div>

                    <h1 className="text-lg font-semibold mt-4 mb-2">Categories</h1>
                    <div className="space-y-2">
                        {subcategoryFilter.map((ele,i) => (
                            <div key={i} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    value={ele}
                                    checked={selectedCategory === ele}
                                    onChange={CategoryFilter}
                                    className="accent-blue-500"
                                />
                                <label>{ele}</label>
                            </div>
                        ))}
                    </div>

                    <h1 className="text-lg font-semibold mt-4 mb-2">Price Range</h1>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={price}
                            onChange={handlePriceChange}
                            className="w-full accent-blue-500"
                        />
                        <label  className="text-gray-600">
                            0/- - {price}/-
                        </label>
                    </div>

                    <h1 className="text-lg font-semibold mt-4 mb-2">Discount</h1>
                    <div className="space-y-2">
                        {["10%", "25%", "40%", "50%", "60%", "70%"].map((discount,i) => (
                            <label key={i} className="flex items-center gap-2">
                                <input type="radio" value={discount} onChange={CategoryFilter} className="accent-blue-500" />
                                {discount} and above
                            </label>
                        ))}
                    </div>

                </div>
            </div>
            <div className='lg:w-3/4 md:w-full sm:w-full min-h-screen flex flex-wrap lg:justify-start md:justify-evenly sm:justify-evenly items-center'>
                <ProductContainer allProducts={allProducts} />
                </div>
        </div>
    )
}

export default Productspage