import React from 'react'
interface categoryCardProps {
    imageurl: string,
    categoryName: String
}
const Categorycard = ({ imageurl, categoryName }: categoryCardProps) => {
    return (
        <div className="w-full h-full rounded-lg bg-white shadow-lg  borderRadius5 border border-blue-800" >
            <div className="lg:w-full md:w-full sm:w-full h-3/4 flex justify-center items-center cursor-pointer borderRadius">
              <img src={imageurl} alt="CategoyCard" className="w-3/4 h-3/4 border border-blue-800" />
            </div>
            <div className="w-full h-1/4  text-blue-800  text-center font-semibold lg:text-[16px] md:text-[13px] text14px">{categoryName.toUpperCase()}</div>
        </div>)
}

export default Categorycard