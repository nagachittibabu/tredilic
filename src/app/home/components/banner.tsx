import Image from 'next/image'
import React from 'react'

const Banner = ({imgSrc}:{imgSrc:string}) => {
  return (
      <div className='flex p-4 border-slate-200 border-2 rounded-lg m-4'>
              <img src={imgSrc || "https://picsum.photos/200/300"}  alt= ' ' className='w-full h-64 rounded-md'/>

</div>  )
}

export default Banner