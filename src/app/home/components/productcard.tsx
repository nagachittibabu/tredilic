import React from 'react'

interface ProductCardProps {
  imagePath: string;
  productCat: string;
  price: string;
  description: string;
  clickedCat: (productCat:string) => void | string;
}

const Productcard: React.FC<ProductCardProps> = ({ imagePath, productCat, price, description, clickedCat }) => {

  return (
    <div className='w-full bg-black h-40 '>
      <div className='w-3/4 h-3/4 '>
        <img src={imagePath || "https://picsum.photos/200/300"} alt="no image" className='w-full h-full' />
      </div>
      <h2>{productCat}</h2>
      <p>{description}</p>
      <h3>{price}</h3>
      <button className='w-1/2 rounded ' onClick={() => clickedCat(productCat)}>show products.....</button>
    </div>
  )
}

export default Productcard