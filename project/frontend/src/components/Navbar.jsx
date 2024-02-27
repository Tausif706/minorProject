import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    name: "location",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
];


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [loc, setLoc] = useState(null);

  const handlecall = ()=> console.log("search triggered");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  let locations = [
    {
        "latitude": 28.6139,
        "longitude": 77.2090,
        "placeName": "IGIT Sarang , Odisha"
    },
    {
        "latitude": 19.0760,
        "longitude": 72.8777,
        "placeName": "Outside Campus"
    },
  ]

  return (
    <div className="relative w-full bg-white shadow-md top-0">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link className='links' to="/">
          <img
            src="https://i.postimg.cc/zv2YbD1C/Screenshot-2023-12-18-185129-removebg-preview.png"
            alt="Campus Mart"
            width="180"
            height="50"
          />
          </Link>
          
        </div>
        <div className="hidden d-flex flex-row ml-6">
        <MapPin height={18}/>
        <select className="text-sm font-medium"  value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value)
                    setLoc(e.target.value)
                }} >
                    {
                        locations.map((item, index) => {
                            return (
                                <option value={`${item.latitude},${item.longitude}`} >
                                    {item.placeName} 
                                </option>
                            )
                        })
                    }
                </select>
          {/* <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                  <span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                </a>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="flex grow justify-end">
          <form action="">
          <input
            className="flex h-9 lg:mr-[95px] w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Serach for a product"
          ></input>
          {/* <button type="submit" onClick={handlecall} onSubmit={handlecall}>submit</button> */}
          </form>
        </div>
        <div className="ml-2 mt-2 hidden lg:block">
          <span className="relative inline-block">
            <img
              className="h-7 w-7 rounded-full ring-2 ring-black"
              src="https://i.postimg.cc/GpkMjWcZ/user.png"
              alt="user"
            />
            {/* <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span> */}
          </span>
        </div>
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <img
                      src="https://i.postimg.cc/zv2YbD1C/Screenshot-2023-12-18-185129-removebg-preview.png"
                      alt="Campus Mart"
                      width="180"
                      height="50"
                    />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        <span>
                          <ChevronRight className="ml-3 h-4 w-4" />
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="ml-3 mt-4 flex items-center space-x-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                    alt="Dan_Abromov"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      Dan Abromov
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      @dan_abromov
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
