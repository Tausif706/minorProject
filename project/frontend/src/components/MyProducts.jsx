import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";


function MyProducts() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = API_URL + '/my-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })
        setcproducts(filteredProducts)

    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');

        const url = API_URL + '/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.')
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })

    }


    const handleProduct = (id) => {
        navigate('/product/' + id)
    }


    const Description = ({ text, maxLength }) => {
        const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
      
        return (
          <div>
            <p>{truncatedText}</p>
            {text.length > maxLength && <span className="text-blue-500">  </span>}
          </div>
        );
      };

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3 ">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                {/* <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />

                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 text-danger"> {item.price} </h3>
                                <p className="m-2 text-success"> {item.pdesc} </p> */}
                                 <img
                                    src={API_URL + "/" + item.pimage}
                                    alt="no img found"
                                    className="aspect-[16/9] md:w-[350px] lg:w-[250px] rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                                />
                                <div className="p-4">
                                    <h1 className="inline-flex items-center text-lg font-semibold">Rs {item.price} /-</h1>
                                    <span className="block text-sm font-semibold">{item.pname}</span>
                                    <p className="mt-1 text-sm text-gray-600">
                                    <Description text={item.pdesc} maxLength={30} />
                                    </p>
                                    <div className="mt-2">
                                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                        # {item.category}
                                    </span>
                                    </div>
                                    <button
                                    onClick={() => handleProduct(item._id)}
                                    type="button"
                                    className="mt-2 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                    View
                                    </button>
                                </div>
                            </div>
                        )

                    })}
            </div>

            <h5> ALL RESULTS  </h5>

            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            <div key={item._id} className="card m-3 ">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                {/* <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />
                                <p className="m-2"> {item.pname}  | {item.category} </p>
                                <h3 className="m-2 text-danger"> {item.price} </h3>
                                <p className="m-2 text-success"> {item.pdesc} </p> */}
                                  <img
                                    src={API_URL + "/" + item.pimage}
                                    alt="no img found"
                                    className="aspect-[16/9] md:w-[350px] lg:w-[250px] rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                                />
                                <div className="p-4">
                                    <h1 className="inline-flex items-center text-lg font-semibold">Rs {item.price} /-</h1>
                                    <span className="block text-sm font-semibold">{item.pname}</span>
                                    <p className="mt-1 text-sm text-gray-600">
                                    <Description text={item.pdesc} maxLength={30} />
                                    </p>
                                    <div className="mt-2">
                                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                                        # {item.category}
                                    </span>
                                    </div>
                                    <button
                                    onClick={() => handleProduct(item._id)}
                                    type="button"
                                    className="mt-2 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                    View
                                    </button>
                                </div>
                            </div>
                        )

                    })}
            </div>



        </div>
    )
}

export default MyProducts;