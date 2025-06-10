import React from 'react'
interface subCategoryCardProps {
    subCategoryName: String,
}
const SubCategoryCard = ({subCategoryName}:subCategoryCardProps) => {
    return (
        <div className="w-3/4 h-[80%] flex flex-col justify-center items-center bg-white borderRadius5 border border-purple-800">
            <div className="w-[90%] h-[90%] flex items-center justify-center cursor-pointer">
                <img src="/images/banner.png" alt="" className="w-3/4 h-[90%] borderRadius5" />
            </div>
            <div className="text-blue-800 font-medium">
                {subCategoryName}
            </div>
        </div>
    )
}

export default SubCategoryCard