import { useEffect, useState } from "react";
import Header from "./Header";
import  Navbar  from "./Navbar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";
import { FooterFour } from "./Footer";
import toast from "react-hot-toast";


function Home() {

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);
    const [userFavorites, setUserFavorites] = useState([]);


    
  useEffect(() => {
    // Make a request to fetch user's liked products
    const fetchLikedProducts = async () => {
      try {
        let userId = localStorage.getItem('userId');
        const url = API_URL + '/liked-products';
        const response = await axios.post(url, { userId: userId });
        // console.log(response.data.products.map(product => product._id));
        setUserFavorites(response.data.products.map(product => product._id));
        // console.log("the users are "+userFavorites);
      } catch (error) {
        console.log('Error fetching liked products:', error);
      }
    };

    fetchLikedProducts();
  }, []); // Run this effect only once on component mount

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
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

        const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch((err) => {
                alert('Server Err.')
            })

        // let filteredProducts = products.filter((item) => {
        //     if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
        //         item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        //         item.category.toLowerCase().includes(search.toLowerCase())) {
        //         return item;
        //     }
        // })
        // setcproducts(filteredProducts)

    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please Login first.')
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    // alert('Liked.')
                    
                    // window.location.reload();
                    // Update userFavorites state
                    setUserFavorites(prevUserFavorites => {
                        if (prevUserFavorites.includes(productId)) {
                            // If already liked, remove from favorites
                            toast('Removed from Favorites', {
                                style: {
                                    border: '1px solid #713200',
                                    padding: '12px',
                                    color: '#713200',
                                  },
                                icon: '💔',
                              });
                            return prevUserFavorites.filter(id => id !== productId);
                        } else {
                            // If not liked, add to favorites
                            toast('Added to Favorites', {
                                icon: '❤️',
                              });
                            return [...prevUserFavorites, productId];
                        }
                    });
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



      const handleClearSearch = () => {
        setsearch(''); // Clear the search box data
        setissearch(false); // Reset the search state
      };

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} handleClear={handleClearSearch}/>
            {/* <Navbar/> */}
            <Categories handleCategory={handleCategory} />
            {issearch && cproducts &&
                <h5> SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
                </h5>}

            {issearch && cproducts && cproducts.length == 0 && <h5> No Results Found </h5>}
            {issearch && <div className="d-flex justify-items-stretch flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        const isFavorite = userFavorites.includes(item._id);
                        return (
                            <div key={item._id} className="card m-3 ">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className={`icons  ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}/>
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
            </div>}

            {!issearch && (
            <div className="d-flex justify-content-center flex-wrap mt-4">
                {products &&
                products.length > 0 &&
                products.map((item, index) => {
                    const isFavorite = userFavorites.includes(item._id);

                    return (
                    <div key={item._id} className="card m-2">
                        <div
                        onClick={(e) => handleLike(item._id, e)}
                        className={`icon-con `}
                        >
                        <FaHeart className={`icons  ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}/>
                        </div>
                        <div className="rounded-md border">
                        {/* ... rest of your code */}
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
                    </div>
                    );
                })}
            </div>
            )}

            <FooterFour />
        </div>
    )
}

export default Home;
