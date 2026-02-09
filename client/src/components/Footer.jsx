// Footer.js
// import Image from "next/image";
import logo from "../assets/logo (2).png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 ">
      <h2 className="text-3xl font-semibold text-gray-900 mt-8 text-center">
        Explore the world with My Dream place
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex mt-8">
        <div className=" mb-10">
          <div className="">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <h1 className="text-2xl font-semibold text-gray-900">

            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Your next go-to companion for travel
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Advertising
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Australia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  New Zealand
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  United States America (USA)
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Greece
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Maldives
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Singapore
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-500 hover:underline">
                  See more
                </a>
              </li>
            </ul>
          </div>

          {/* Terms and Policies Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Terms and Policies
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Reward system policy
                </a>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Cancel your bookings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Use Coupon
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Refund Policies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  International Travel Documents
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
