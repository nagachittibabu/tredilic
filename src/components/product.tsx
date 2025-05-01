import Link from "../../node_modules/next/link";


const ProductCard = ({
    imagepath,
    product_id,
    title,
    price,
    description,
    category,
}) => {

    return (
        <div className="lg:w-full md:w-full sm:w-full h-[600px]   flex justify-center items-center mb-6 " >
            <div className=" w-full h-full border-5 shadow-md lg:px-12 md:px-6 sm:px-12 border rounded-lg bg-white mx-4">
                 <Link href={{
                                pathname:`/details//${1} `,
                                query:{category,product_id}
                            }} >
                <div className=" w-full flex justify-center  py-8 h-[350px] ">
                    <img
                        src={imagepath}
                        alt="pic"
                        className="w-3/4 h-full duration-300 hover:scale-110 rounded-lg "
                    />
                </div>
                </Link>
                <div className="w-full h-[180px] text-center text-base font-semibold ">
                    <h1 className="p-3 border-b border-b-2 text-center">{title}</h1>
                    <h2 className="p-3 border-b border-b-2">
                        ${price}
                        <del className="pl-2 border-b border-b-2"></del>
                    </h2>
                    <div>
                    <p className="text-center text-sm ">{description}</p>
                    </div>
                </div>
              
                <div className="w-full h-[50px] flex justify-between xl:text-base lg:text-md md:text-sm">
                        <button
                            className="hover:text-red-300  rounded-lg border p-3"
                        >
                            <Link href={{
                                pathname:`/details//${1} `,
                                query:{category,product_id}
                            }} >
                                <i className="fa-solid fa-eye text-red-300"></i>View Details
                            </Link>
                        </button>
                        <button
                            className="hover:text-red-300 border p-3"
                        >
                            <i className="fa-solid fa-cart-shopping text-red-300"></i>
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default ProductCard;
