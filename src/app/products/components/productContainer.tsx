import ProductCard from '@/app/products/components/productcard';
import React, { useDebugValue, useEffect, useState } from 'react'
import ProductDetail from '../components/productDetail';

type ProductDetailHandle=(ele:string)=>void

const ProductContainer = ( {allProducts}:any) => {    
    const [showProductdetail, setShowProductDetail] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState("");
    
    const ProductDetailHandle=(ele:string)=>{
        if(ele){
        setShowProductDetail(true);
        setSelectedProductId(ele);
        }
        else{
            setShowProductDetail(false);
            setSelectedProductId("");
        } 
    }
    return (
            <div className='w-full h-full'>
                {showProductdetail && <ProductDetail handleShowDetails={()=>ProductDetailHandle("")} productId={selectedProductId} />}
                {allProducts.length > 0 ?
                    <div className="lg:w-full md:w-full sm:w-full min-h-screen flex flex-wrap justify-evenly items-center ">
                        {
                            allProducts.map((ele: any, i: number) => (
                                <ProductCard
                                    key={i}
                                    imageurl={ele.image}
                                    description={ele.description}
                                    price={ele.price}
                                    title={ele.title}
                                    productId={ele.productId}
                                    clickedProduct={ProductDetailHandle}
                                />
                            ))}
                    </div> : <div className="w-full flex items-center justify-center h-screen">
                        <div>  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                            <div>Loading...</div>
                        </div>

                    </div>

                }
            </div>
    )
}

export default ProductContainer