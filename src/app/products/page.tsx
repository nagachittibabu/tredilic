"use client"
import React, { useEffect, useState } from 'react'
import Link from '../../../node_modules/next/link';
import { useSearchParams } from '../../../node_modules/next/navigation';
import { useRouter } from '../../../node_modules/next/navigation';
import ProductContainer from './components/productContainer';


const Productspage = () => {

    const router = useRouter();
    const searchParams = useSearchParams()
    const categoryName = searchParams.get('categoryName');
    const subCategoryName = searchParams.get('subCategory')
    const [allProducts, setAllProducts] = useState([])
    const [price, setPrice] = useState("50");
    const [filterProducts, setFilterProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(categoryName);
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [subcategoryFilter, setSubcategoryFilter] = useState([]);
    const [filterHandler,setFilterHandler]=useState(false)


    const fetchdata = async () => {
        if (!categoryName?.length) {
            try {
                const products = await fetch(`http://localhost:3000/api/products`);
                const data = await products.json();
                if (data?.totalProducts) {
                    let res = data.totalProducts.flat(Infinity);
                    for (let i = res.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [res[i], res[j]] = [res[j], res[i]];
                    }

                    setAllProducts(res)
                }
            } catch (error) {
                console.error("unable to fetch the data");
            }
        }
        if (categoryName) {
            try {
                const products = await fetch(`http://localhost:3000/api/products/category?name=${categoryName}`);
                const data = await products.json();
                if (data?.fetchedProducts) {
                    setAllProducts(data.fetchedProducts.map((ele:any) => ele.products).flat())
                    setSubcategoryFilter(data.fetchedProducts.map((e: any) => e.category_name));
                }
            } catch (error) {
                console.error("unable to fetch the data");
            }
        }
        if (categoryName && subCategoryName) {
            try {
                const products = await fetch(`http://localhost:3000/api/products/category?name=${categoryName}&subCategory=${subCategoryName}`);
                const data = await products.json();
                if (data?.fetchedProducts) {
                    setAllProducts(data.fetchedProducts.map((ele:any) => ele).flat())
                }
            } catch (error) {
                console.error("unable to fetch the data");
            }
        }
    }

    useEffect(() => {
        fetchdata();
    }, [searchParams]);

    console.log(allProducts);


    const CategoryFilter = async (e:React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCategory(e.target.value)
        router.push(`/products?categoryName=${e.target.value}`)
        try {
            const categories = await fetch(`http://localhost:3000/api/products/category?name=${e.target.value}`)
            const categoryBasedFilter = await categories.json();
            setSubcategoryFilter(categoryBasedFilter.fetchedProducts.map((e: any) => e.category_name));
        }
        catch (error) {
            console.error("unable to get the products");

        }
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };

    const subCategorySelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSubCategory(e.target.value);
        router.push(`/products?categoryName=${selectedCategory}&subCategory=${e.target.value}`)
    }
    const CancelFilters = () => {
        setPrice("50");
        setSubcategoryFilter([]);
        setSelectedCategory("");
        setFilterProducts([]);
        router.push("/products")
    }

    const ProductsHandle = () => {
        CancelFilters();
    }


    return (
        <div className="w-full h-full flex bg-gray-100 display-flex-col">
            <div className={`lg:w-1/4 md:w-[40%] h-screen  flex  justify-center border-r bg-white  shadow-md overflow-y-scroll  overscroll-none p-4 pb-14 display-none filterProducts?display-show :""`}>
                <div className="w-[90%] h-fit border p-4  rounded-lg shadow-sm bg-gray-50">

                    <div className="w-full h-[50px] text-gray-600 font-medium">
                        <Link href="/" className="hover:underline text-[12px]">Home/</Link>
                        <Link href="/products" className="hover:underline text-[12px]" onClick={ProductsHandle}>Products/</Link>
                        <button className="hover:underline text-[12px]" >{categoryName}</button>

                    </div>

                    <div className="w-full h-[30px] flex items-center justify-between border-b mb-4">
                        <div className="font-bold text-lg">FILTERS</div>
                        <button
                            className="lg:px-4 lg:py-1 md:px-3 md:py-0 lg:text-[15px] md:text-[14px] sm:text-[10px] border rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-600"
                            onClick={CancelFilters}
                        >
                            Cancel All
                        </button>
                    </div>

                    <h1 className="text-lg font-semibold mb-2">Type</h1>
                    <div className="space-y-2">
                        {["men's dresses", "Women's Dresses", "Kids' Dresses", "Accessories"].map((category, i) => (
                            <label key={i} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={category}
                                    onChange={CategoryFilter}
                                    checked={selectedCategory === category}
                                    className="accent-blue-500"
                                />
                                {category}
                            </label>
                        ))}
                    </div>

                    <h1 className="text-lg font-semibold mt-4 mb-2">Categories</h1>
                    <div className="space-y-2">
                        {subcategoryFilter.map((ele, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    value={ele}
                                    checked={subCategoryName === ele}
                                    onChange={subCategorySelection}
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
                        <label className="text-gray-600">
                            0/- - {price}/-
                        </label>
                    </div>

                    <h1 className="text-lg font-semibold mt-4 mb-2">Discount</h1>
                    <div className="space-y-2">
                        {["10%", "25%", "40%", "50%", "60%", "70%"].map((discount, i) => (
                            <label key={i} className="flex items-center gap-2">
                                <input type="radio" value={discount} onChange={CategoryFilter} className="accent-blue-500" />
                                {discount} and above
                            </label>
                        ))}
                    </div>

                </div>
            </div>
            <div className='none w-full h-[50px] bg-gray-200 display-show display-flex-row justify-between items-center space-x-6'>
                <div className='w-[100px] h-1/2 border' onClick={()=>setFilterHandler(!filterHandler)}>
                    Filter
                </div>
                <div className='w-[100px] h-1/2 border'>
                    Sort By
                </div> 
            </div>
            <div className='lg:w-3/4 h-screen md:w-full sm:w-full min-h-screen flex flex-wrap lg:justify-start md:justify-evenly sm:justify-evenly items-center overflow-y-auto transition'>
                <ProductContainer allProducts={filterProducts.length ? filterProducts : allProducts} />
            </div>  
        </div>
    )
}

export default Productspage