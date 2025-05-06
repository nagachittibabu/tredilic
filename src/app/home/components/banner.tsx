import Image from 'next/image'
import React from 'react'

const Banner = ({imgSrc}:{imgSrc:string}) => {
  return (
      <div className='w-full p-4 border-slate-200 border-2 rounded-lg h-28 flex justify-center itesm-center'>
              <img src={imgSrc || "https://picsum.photos/1400/300"}  alt= 'no image ' className='' />

</div>  )
}

export default Banner