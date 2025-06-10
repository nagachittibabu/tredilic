import Link from "../../node_modules/next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-blue-100 flex items-center justify-center">
            <div className=" pt-12 flex flex-col ">
                <div className="flex lg:justify-between md:justify-between sm:justify-center h-[200px] lg:px-10 md:px-8 lg:space-x-0 md:space-x-0 sm:space-x-2 gap0 padding-x footercss">
                    <div className="lg:w-1/2 md:w-1/2 sm:w-1/3 lg:text-[14px] md:text-[12px] sm:text-[10px] space-y-2 h-full width40">
                        <h2 className="lg:text-4xl md:text-2xl sm:text-2xl font-bold">
                            <span className="text-blue-700 text19px">Tredilic</span> 
                        </h2>
                        <p className="w-full text-left tracking-wider text-gray-700 pr-4 text10px">
                        At Tredilic, we are committed to providing high-quality products with a seamless shopping experience.We ensure secure payments, fast delivery, and exceptional customer support.
                        </p>
                        <p className="flex items-center text-gray-700 text10px">
                            A-1 Street, Hyderabad, India
                        </p>
                        <p className="flex items-center text-gray-700 text10px">
                            www.tredilic.com
                        </p>
                        <p className="flex items-center text-gray-700 text10px">
                            +01144 2345 67890
                        </p>
                    </div>
                    <div className="lg:w-1/5 lg:h-full md:w-1/6 md:h-full sm:w-1/4 sm:h-full width20">
                        <div className="w-full h-full space-y-2">
                        <h1 className="lg:text-[18px] md:text-[14px] sm:text-[15px] font-semibold text-gray-900 ">Quick Links</h1>
                        <ul className="text-gray-700 space-y-2 list-square lg:text-[14px] md:text-[13px] sm:text-[12px]">
                            <li className="flex items-center hover:underline text10px"><Link href={"/"}>Home</Link></li>
                            <li className="flex items-center hover:underline text10px"><Link href={"/products"}>Products
                            </Link></li>
                            <li className="flex items-center hover:underline text10px"> <Link href={"/bag"}>Bag</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className="lg:w-[30%] lg:h-full md:w-1/4 md:h-full sm:w-1/4 sm:h-full width40">
                        <div className="w-full h-full px-4 space-y-2">
                            <h1 className="font-semibold  text-gray-900 lg:text-[18px] md:text-[15px] sm:text-[15px] text14px">Payment Methods</h1>
                            <img src="https://t3.ftcdn.net/jpg/04/86/77/04/240_F_486770467_9nd0TjY0owEdwkoUCvi85VfIJQTvQFKi.jpg" alt="Payment Methods" className="lg:w-3/4 lg:h-3/4 md:w-full md:h-3/4 sm:w-full sm:h-[60%] fullwidth fullheight" />
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-300 h-[2px] bg-blue-900" />
                <div className="flex justify-center items-center text-center">
                    <p className="lg:text-[15px] md:text-[13px] sm:text-[12px] text-center text-gray-700 mb-5 text10px">
                        © <a href="#" className="hover:underline font-bold">Tredilic</a>. All Rights Reserved. Designed by 
                        <a href="#" className="hover:underline font-bold"> Gooturu Naga Chittibabu </a> 
                    </p>
                </div>
            </div>
        </footer>
    );
}
