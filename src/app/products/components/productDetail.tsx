import React, { useEffect, useState } from 'react'
import  toast  from "react-hot-toast";

import { useRouter } from '../../../../node_modules/next/navigation';
import BookingAction from "../../serverActions/bookingAction"
interface ProductDetailProps {
  handleShowDetails: () => void;
  productId: string;
}
type Product = {
  image: string;
  categoryName: string;
  title: string;
  description: string;
  price: number;
  selectedSize?: string;
  selectedQuantity?: string;
};
const ProductDetail = ({ handleShowDetails, productId }: ProductDetailProps) => {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [cartText, setCartText] = useState("ADD TO CART")

  const ProductHandler = async () => {
    const product = await fetch(`http://localhost:3000/api/products/category?name=""&productId=${productId}`);
    const productData = await product.json();
    setSelectedProduct(productData.filterProduct);
  }

  useEffect(() => {
    if (productId) {
      ProductHandler()
    }
  }, [productId]);

  const quantityHandler = (e: any) => {
    setSelectedQuantity(e.target.value)
  }
  const CartHandler = async () => {
    if (cartText === "GO TO CART") {
      router.push("/bag");
      return;
    }
  
    if (!selectedQuantity || !selectedSize) {
      toast("Please select Size and Quantity");
      return;
    }
    if(selectedQuantity && selectedSize && selectedProduct){
    const updatedProduct = [...selectedProduct];
    if (updatedProduct.length > 0) {
      updatedProduct[updatedProduct.length - 1].selectedQuantity = selectedQuantity;
      updatedProduct[updatedProduct.length - 1].selectedSize = selectedSize;
        setSelectedProduct(updatedProduct);
        const response = await BookingAction(updatedProduct);
      if (response?.success) {
        toast.success("Item Added to Cart");
        setCartText("GO TO CART");
      }
    }
  }
  };
  return (
    <div className='w-full h-screen absolute lg:top-10 md:top-8 sm:top-2 left-0 backdrop-filter backdrop-brightness-50 backdrop-blur-md flex items-center justify-center overflow-y-scroll overscroll-contain'>
      {selectedProduct.length > 0 && (
        <div
          className="lg:w-[60%] md:w-3/4 sm:w-[90%] h-[75%] bg-white rounded-lg shadow-lg flex p-6 overflow-hidden relative  "
        >
          <button className='absolute top-5 right-10 text-blue-400' onClick={handleShowDetails}>&#10006;</button>
          <div className="lg:w-1/2 md:w-1/2 sm:w-1/2  flex justify-center items-center border-r">
            <img
              src={selectedProduct?.[0]?.image}
              alt="Product Image"
              className="lg:w-3/4 md:w-3/4 sm:w-3/4 lg:h-[60%] md:h-[80%] sm:h-[60%] object-cover rounded-lg"
            />
          </div>

          <div className="w-1/2 flex flex-col justify-between px-4 ">
            <div className="space-y-2">
              <h1 className="lg:text-[20px] md:text-[16px] sm:text-[14px] font-semibold text-gray-900">
                {selectedProduct?.[0]?.title}
              </h1>
              <p className="lg:text-[15px] md:text-[12px] sm:text-[11px] text-gray-600 font-small">
                {selectedProduct?.[0]?.description}
              </p>
              <h2 className="lg:text-[20px] md:text-[16px] sm:text-[14px]  font-bold text-blue-500">
                ₹{selectedProduct?.[0]?.price}/-
              </h2>
            </div>

            <div className="">
              <label className="lg:text-[16px] md:text-[14px] sm:text-[12px] font-medium">Select Size:</label>
              <div className="flex gap-2 mt-2 ">
                {["S", "M", "L", "XL", "XXL"].map((size, i) => (
                  <div
                    key={i}
                    className={`w-12 lg:text-[16px] md:text-[14px] sm:text-[12px] text-center rounded border px-2 py-1 hover:text-blue-500 hover:border-blue-400 cursor-pointer transition ${selectedSize === size ? "bg-blue-400 text-white hover:text-white" : ""}
                `} onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <label className="lg:text-[16px] md:text-[14px] sm:text-[12px] font-medium">Enter Quantity:</label>
              <input
                type="number"
                className="w-full border rounded-md h-10 mt-2 px-2 outline-none focus:border-blue-400 transition "
                placeholder="Enter quantity"
                min={1}
                max={5}
                onChange={quantityHandler}
              />
            </div>

            <div className="w-full flex justify-between mt-6 lg:text-[16px] md:text-[16px] sm:text-[12px]">
              <button
                className={`w-[48%] p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
                  !selectedSize || !selectedQuantity ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={CartHandler} disabled={!selectedSize || !selectedQuantity}
                >
                {cartText}
              </button>
              <button
                className="w-[48%] p-2  bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductDetail












