export default function Footer() {
    return (
        <footer className=" w-full">
            <div className=" mx-auto px-12 lg:px-0 w-[95%] bg-indigo-50 py-12">
                <div className="flex flex-wrap lg:justify-between lg:space-x-16 md:space-y-12 sm:space-y-0">
                    <div className="lg:w-2/5 space-y-6">
                        <h2 className="text-4xl font-bold">
                            <span className="text-red-300 border border-grey-300 px-4 py-2">Ecom</span> Plus
                        </h2>
                        <p className="text-gray-700">
                            Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.
                        </p>
                        <p className="flex items-center text-gray-700">
                            <i className="fa fa-map-marker-alt text-red-300 mr-3"></i>
                            123 Street, New York, USA
                        </p>
                        <p className="flex items-center text-gray-700">
                            <i className="fa fa-envelope text-red-300 mr-3"></i>
                            info@example.com
                        </p>
                        <p className="flex items-center text-gray-700">
                            <i className="fa fa-phone text-red-300 mr-3"></i>
                            +012 345 67890
                        </p>
                    </div>
                    <div className="lg:w-1/5 space-y-4">
                        <h1 className="text-lg font-semibold text-gray-900">Quick Links</h1>
                        <ul className="text-gray-700 space-y-2">
                            {["Home", "Our Shop", "Shopping Cart", "Contact Us"].map((link, index) => (
                                <li key={index} className="flex items-center">
                                    <i className="fa fa-angle-right mr-2"></i>
                                    <a href="#" className="hover:underline">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:w-1/5 space-y-4 hide">
                        <h1 className="text-lg font-semibold text-gray-900">Quick Links</h1>
                        <ul className="text-gray-700 space-y-2 ">
                            {["Home", "Our Shop", "Shopping Cart", "Contact Us"].map((link, index) => (
                                <li key={index} className="flex items-center">
                                    <i className="fa fa-angle-right mr-2"></i>
                                    <a href="#" className="hover:underline">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <hr className="my-6 border-gray-300" />
                <div className="flex flex-wrap justify-between items-center">
                    <p className="text-sm text-center text-gray-700 mb-5 lg:mb-0">
                        © <a href="#" className="hover:underline font-bold">Your Site Name</a>. All Rights Reserved. Designed by 
                        <a href="#" className="hover:underline font-bold"> Gooturu Naga Chittibabu </a> 
                    </p>
                    <img src="../img/payments.png" alt="Payment Methods" className="ml-auto mb-5 lg:mb-0" />
                </div>
            </div>
        </footer>
    );
}
