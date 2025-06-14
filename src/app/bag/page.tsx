"use client";
import React, { useEffect, useState } from 'react';

interface Product {
  productId: string;
  description:string;
  title: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
}


const Bag = () => {
  const [data, setData] = useState<Product[]>([]);
  const [productId,setProductId]=useState("");
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemcount, setItemcount] = useState(0);
  
  const RemoveItem=async(productId:string)=>{
    try {
      const bookingsFetch=await fetch(`http://localhost:3000/api/bookings?productId=${productId}` ,{method:"DELETE"});
      const bookingDetails=await bookingsFetch.json();
      if(bookingDetails){
        setData((prev)=>prev.filter((item)=>item.productId !== productId))
      }
    } catch (error) {
      console.error("unable to fetch the products");
    } 
  }
  const bookingsFetch=async()=>{
    try {
    const bookingsFetch=await fetch("http://localhost:3000/api/bookings" ,{method:"GET"});
    const bookingDetails=await bookingsFetch.json();
    setData(bookingDetails.bookings)
    setQuantity(bookingDetails.bookings.length)
  } catch (error) {
    console.error("unable to fetch the products");
  }
  }
  const updateBooking=async()=>{
    const updateData=[{productId,quantity,size}]
    try {
    const updateBookingItems =await fetch("http://localhost:3000/api/bookings" ,{method:"PATCH",body:JSON.stringify(updateData)});
    const productsAfterFetch=await updateBookingItems.json();
    console.log(productsAfterFetch);
    } catch (error) {
      console.error("eroor in updateBooking");
    }
  }

  useEffect(()=>{
    updateBooking();  
  },[size,quantity])

  useEffect(()=>{
    bookingsFetch();
  },[]);
 
  return (
    <>
      <div className='w-full min-h-screen flex flex-col px-4 py-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'>
        <div className='max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-3/4 w-full flex flex-col bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>Shopping Bag</h2>
            {data?.map((ele: any, index: number) => {
              return (
                  <div className='flex items-center justify-between w-full h-auto mb-6 border p-6 rounded-lg shadow-sm' key={ele.id} onClick={()=>setProductId(ele.productId)}>
                    <div className='w-1/2 flex flex-col gap-4'>
                      <img src={ele.image} alt="" className='w-3/4 h-[150px] rounded-lg shadow-md' />
                      <div className='flex justify-center items-center gap-2'>
                      </div>
                    </div>
                    <div className='flex lg:flex-row justify-between w-full items-center lg:ml-6 gap-4'>
                      <div className='w-full'>
                        <h1 className='text-xl font-semibold mb-2 text-gray-900'>{ele.title}</h1>
                        <p className='text-md text-gray-600' >{ele.price}/-</p>
                        <div className='flex space-x-2'>
                        <div className=' flex justiyf-between space-x-2 text-[14px] border w-[80px]'>
                        <label htmlFor="">size</label>
                        <select onChange={(e)=>setSize(e.target.value)}>
                          <option>{ele.size}</option>
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                          </select>
                          </div>
                          <div className=' flex justiyf-between space-x-2 text-[14px] border w-[80px]'>
                        <label htmlFor="">Quantity</label>
                        <select className='border ' onChange={(e)=>setQuantity(e.target.value)}>
                          <option>{ele.quantity}</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          </select>
                          </div>
                          </div>
                      </div>
                      <div>
                        <button className='text-red-600 hover:text-red-800' onClick={()=>RemoveItem(ele.productId)}>
                        &#10006;
                        </button>
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>
          <div className='lg:w-1/4 w-full h-[400px] bg-white p-8 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>Price Details</h1>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between text-lg'>
                <span>Price ({itemcount} item)</span>
                <span>{price}/-</span>
              </div>
              <div className='flex justify-between text-lg'>
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className='flex justify-between text-lg border-b pb-4'>
                <span>Discount</span>
                <span>{discount}/-</span>
              </div>
              <div className='flex justify-between text-lg font-bold'>
                <span>Grand Total</span>
                <span>{total}/-</span>
              </div>
            </div>
            <button className='mt-6 w-full bg-blue-400 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600'>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bag;
