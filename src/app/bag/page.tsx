"use client";
import React, { useEffect, useState } from 'react';

const Bag = () => {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [productCount, setProductCount] = useState(1);
  const [itemcount, setItemcount] = useState(0);
  
  const RemoveItem=async(e:string)=>{
    try {
      const bookingsFetch=await fetch(`https://tredilic-gooturu-naga-chittibabus-projects.vercel.app/api/bookings?productId=${e}` ,{method:"DELETE"});
      const bookingDetails=await bookingsFetch.json();
      if(bookingDetails){
        window.location.reload();
      }
    } catch (error) {
      console.error("unable to fetch the products");
    } 
  }
  const bookingsFetch=async()=>{
    try {
    const bookingsFetch=await fetch("https://tredilic-gooturu-naga-chittibabus-projects.vercel.app/api/bookings" ,{method:"GET"});
    const bookingDetails=await bookingsFetch.json();
    setData(bookingDetails.bookings)
  } catch (error) {
    console.error("unable to fetch the products");
  }
  }
   
  
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
                // element?.map((ele: any) => (
                  <div className='flex items-center justify-between w-full h-auto mb-6 border p-6 rounded-lg shadow-sm' key={ele.id}>
                    <div className='w-1/2 flex flex-col gap-4'>
                      <img src={ele.image} alt="" className='w-full h-[200px] rounded-lg shadow-md' />
                      <div className='flex justify-center items-center gap-2'>
                        <button className="bg-red-400 text-white px-3 py-1 rounded-md hover:bg-red-500" >
                          <i className="fa fa-minus"></i>
                        </button>
                        <input type="text" value={ele.quantity} readOnly className="w-12 h-9 text-center bg-gray-200 rounded-md focus:outline-none" />
                        <button className="bg-green-400 text-white px-3 py-1 rounded-md hover:bg-green-500" >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className='flex lg:flex-row justify-between w-full items-center lg:ml-6 gap-4'>
                      <div className='w-full'>
                        <h1 className='text-xl font-semibold mb-2 text-gray-900'>{ele.title}</h1>
                        <p className='text-lg font-semibold text-gray-700'>${ele.price}</p>
                        <p className='text-md text-gray-600'>{ele.color}, {ele.size}</p>
                      </div>
                      <div>
                        <button className='text-red-600 hover:text-red-800' onClick={()=>RemoveItem(ele.productId)}>
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                // ))
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
                <span>{productCount}</span>
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
