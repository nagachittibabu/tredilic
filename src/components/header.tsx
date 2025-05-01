"use client"
import Link from "../../node_modules/next/link";

export default function Header() {
    return (
        <div className="w-full bg-white border-b sticky top-0 right-0 z-50   widthfull ">
                <div className="w-full flex   lg:justify-between lg:items-center md:justify-between md:items-center sm:justify-between sm:items-center  lg:px-12 md:px-12 sm:px-16  between ">
                    <div className="flex items-center  pt-2">
                        <Link href="/">
                            <h1 className="lg:text-2xl md:text-3xl sm:text-xl lg:font-bold md:font-semibold sm:font-semibold ">
                                <span className="text-red-300 font-bold border border-grey-300 px-4 py-2 lg:text-3xl md:text-3xl sm:text-x">Tredilic</span>
                            </h1>
                        </Link>
                    </div>
                    <div className="flex items-center lg:w-5/12 md:w-1/3 sm:w-1/2 border relative">
                        <input
                            type="text"
                            className="pl-1 pr-4 py-2 w-full"
                            placeholder="Search for products"
                        />
                        <i className="fa-solid fa-magnifying-glass py-3 px-3 text-red-300"></i>
                    </div>
                    <div className="flex items-center lg:order-2">
                        <div className="lg:text-2xl lg:semibold hide"></div>
                        <Link href="/Components/Wishlist">
                            <div className="border border-grey-300 m-2 lg:block hide">
                                <i className="fa-solid fa-heart text-red-300 p-3"></i><span className="pr-2">0</span>
                            </div>
                        </Link>
                        <Link href="/Cart">
                            <div className="border border-grey-300 m-2 lg:block ">
                                <i className="fa-solid fa-cart-shopping text-red-300 p-3"></i><span className="pr-2"></span>
                            </div>
                        </Link>
                    </div>
                </div>
        </div>
    );
}
