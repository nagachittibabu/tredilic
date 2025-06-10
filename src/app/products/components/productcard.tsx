    import React, { useState } from 'react'

    interface ProductCardProps {
        imageurl: string;
        title: string;
        description: string;
        price: number;
        productId:string;
        clickedProduct: (productId:string) => void;
    }

    const ProductCard: React.FC<ProductCardProps> = ({ imageurl, title, description, price,productId,clickedProduct }) => {
        const[addItem,setAddItem] =useState(true);
        const [quantity,setquantity] =useState(1);
        const increment=()=>{
            setquantity(quantity+1)
        }
        const decrement=()=>{
            if(quantity >0){
            setquantity(quantity-1)
            }
        }
        
        return (
            <div className='lg:w-1/4 h-[400px] md:w-1/3  sm:w-1/2 flex justify-center items-center sm:border rounded-ld shadow-md width50 '>
                <div className='lg:w-[90%] h-[90%] md:w-[90%]  sm:w-[80%]  flex flex-col  justify-evenly items-center bg-gray-200 shadow-lg  width85 '>
                    <div className='lg:w-[85%] md:w-[75%] sm:w-[80%] h-1/2 flex items-center justify-center width75'>
                        <img src={imageurl} alt="image" className='w-full h-full border' />
                    </div>
                    <div className='lg:w-[85%] md:w-[80%] sm:w-[80%]  lg:text-[16px] md:text-[14px] sm:text-[14px] width85'>
                        <h1 className='font-semibold text12px'>{title}</h1>
                        <p className='text-[12px] w-fll h-10px truncate text10px'>{description}</p>
                        <h2 className='font-bold text12px'>{price}/-</h2>
                    </div>
                    <div className='lg:w-[85%] md:w-[85%] sm:w-[80%] flex justify-between width85 text12px'>
                        <button className='lg:w-[90px] md:w-[80px] sm:w-5/12 h-[45px] rounded shadow-md lg:text-[14px] md:text-[12px] sm:text-[13px] width40 border p-1' onClick={()=>clickedProduct(productId)}>View Details</button>

                        <button className='lg:w-[90px] md:w-[80px] sm:w-5/12 h-[45px] rounded shadow-md lg:text-[14px] md:text-[12px] sm:text-[13px] width40  border  p-1' onClick={()=>setAddItem(false)}>{addItem ? "Add to Bag":"GO TO CART"}</button>

                    </div>

                </div>
            </div>
        )
    }

    export default ProductCard