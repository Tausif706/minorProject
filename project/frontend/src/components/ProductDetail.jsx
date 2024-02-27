import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

// function ProductDetail() {

//     const [product, setproduct] = useState()
//     const [user, setuser] = useState()
//     console.log(user, "userrrrr")
//     const p = useParams()

//     useEffect(() => {
//         const url = API_URL + '/get-product/' + p.productId;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.product) {
//                     setproduct(res.data.product)
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })
//     }, [])


//     const handleContact = (addedBy) => {
//         console.log('id', addedBy)
//         const url = API_URL + '/get-user/' + addedBy;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.user) {
//                     setuser(res.data.user)
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })
//     }

//     return (<>
//         <Header />
//         PRODUCT DETAILS :
//         <div >
//             {product && <div className="d-flex justify-content-between flex-wrap">
//                 <div>
//                     <img width="400px" height="200px" src={API_URL + '/' + product.pimage} alt="" />
//                     {product.pimage2 && <img width="400px" height="200px" src={API_URL + '/' + product.pimage2} alt="" />}
//                     <h6> Product Details : </h6>
//                     {product.pdesc}
//                 </div>
//                 <div>
//                     <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
//                     <p className="m-2"> {product.pname}  | {product.category} </p>
//                     <p className="m-2 text-success"> {product.pdesc} </p>

//                     {product.addedBy &&
//                         <button onClick={() => handleContact(product.addedBy)}>
//                             SHOW CONTACT DETAILS
//                         </button>}
//                     {user && user.username && <h4>{user.username}</h4>}
//                     {user && user.mobile && <h3>{user.mobile}</h3>}
//                     {user && user.email && <h6>{user.email}</h6>}

//                 </div>
//             </div>}
//         </div>
//     </>

//     )
// }

// export default ProductDetail;





import React from 'react'
import { ChevronLeft, ChevronRight, Heart, Share } from 'lucide-react'

function ProductDetail() {

    const [product, setproduct] = useState()
    const [user, setuser] = useState()
    console.log(user, "userrrrr")
    const p = useParams()

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    const handleContact = (addedBy) => {
        console.log('id', addedBy)
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }

  return (<>
    <Header />
    {product && <div className="sp mx-auto max-w-7xl px-2 py-10 lg:px-0">
      <div className="overflow-hidden">
        <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
          <div className="items-start justify-between lg:flex lg:space-x-8">
            <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
              <div className="w-full xl:flex xl:flex-row-reverse">
                <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[650px]">
                  <div className="relative flex items-center justify-center">
                    <img
                      alt="Product gallery 1"
                      src={API_URL + '/' + product.pimage}
                      width={650}
                      height={590}
                      className="rounded-lg object-cover md:h-[300px] md:w-full lg:h-full"
                    />
                  </div>
                  <div className="absolute top-2/4 z-10 flex w-full items-center justify-between">
                    <ChevronLeft className="text-white" />
                    <ChevronRight className="text-white" />
                  </div>
                </div>
                <div className="flex gap-2 xl:flex-col">
                  {[
                    `API_URL + '/' + product.pimage2`
                    ].map((image, index) => (
                    <div
                      key={image}
                      className="border-border-base flex cursor-pointer items-center justify-center overflow-hidden rounded border transition hover:opacity-75 "
                    >
                      <img
                        alt={`Product ${index}`}
                        src={image}
                        decoding="async"
                        loading="lazy"
                        className="h-20 w-20 object-cover md:h-24 md:w-24 lg:h-28 lg:w-28 xl:w-32"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">{product.pname}</h2>
                <p className="mt-4 font-semibold">{product.price}</p>
              </div>
              {/* <div className="mb-2 pt-0.5">
                <h4 className="text-15px mb-3 font-normal capitalize text-opacity-70">
                  available in:
                </h4>
                <ul className="flex flex-wrap space-x-2">
                  <li className="md:text-15px mb-2 flex h-9 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10">
                    8 UK
                  </li>
                  <li className="md:text-15px mb-2 flex h-9 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10">
                    9 UK
                  </li>
                  <li className="md:text-15px mb-2 flex h-9 cursor-pointer items-center justify-center rounded border p-1 px-3 text-sm font-medium transition duration-200 ease-in-out md:mb-3 md:h-10">
                    10 UK
                  </li>
                </ul>
              </div> */}
              <div className="pb-2" />
              <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
                <button
                  type="button"
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Contact Us
                </button>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Heart size={16} className="mr-3" />
                    <span className="block">Wishlist</span>
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <Share size={16} className="mr-3" />
                      <span className="block">Share</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6 xl:pt-8">
                <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
                  Product Details:
                </h3>
                <p className="text-sm">
                 {product.pdesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  )
}
export default ProductDetail;
