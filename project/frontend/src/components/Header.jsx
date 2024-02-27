import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";

function Header(props) {
  const [loc, setLoc] = useState(null);
  const [showOver, setshowOver] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  let locations = [
    {
      latitude: 28.6139,
      longitude: 77.209,
      placeName: "IGIT Sarang , Odisha",
    },
    {
      latitude: 19.076,
      longitude: 72.8777,
      placeName: "Outside Campus",
    },
  ];

  return (
    <div className="header-container d-flex justify-content-between top-10">
      <div className="header d-flex justify-end flex-row">
        <Link className="links" to="/">
          <img
            src="https://i.postimg.cc/zv2YbD1C/Screenshot-2023-12-18-185129-removebg-preview.png"
            className="mt-1.5 mr-4"
            alt="Campus Mart"
            width="180"
            height="50"
          />
        </Link>
      </div>
      <div className="d-flex flex-auto">
        <FaLocationDot className="mt-[14px]" height={18} />
        <select
          value={loc}
          onChange={(e) => {
            localStorage.setItem("userLoc", e.target.value);
            setLoc(e.target.value);
          }}
        >
          {locations.map((item, index) => {
            return (
              <option value={`${item.latitude},${item.longitude}`}>
                {item.placeName}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <form>
          <input
            className="search"
            type="text"
            placeholder="Search a product"
            value={props && props.search}
            onChange={(e) =>
              props.handlesearch && props.handlesearch(e.target.value)
            }
          />

          <button
            className="search-btn"
            onClick={() => props.handleClick && props.handleClick()}
            style={{ height: "45px" }}
          >
            <FaSearch />
          </button>
        </form>
      </div>
      {/* <button className="clear-btn" onClick={props.handleClear}>
        CLEAR
      </button> */}

      <div>
        <div
          className="ml-10"
          onClick={() => {
            setshowOver(!showOver);
          }}
          style={{
            display: "flex",
            cursor:"pointer",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "50%",
          }}
        >
          <img
            className=" mt-1 inline-block h-8 w-8 rounded-full bg-white ring-2 ring-black"
            src="https://i.postimg.cc/GpkMjWcZ/user.png"
            alt="Dan_Abromov"
          />
        </div>

        {showOver && (
          <div
            style={{
              minHeight: "30px",
              width: "200px",
              background: "#eee",
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: 1,
              marginTop: "50px",
              marginRight: "50px",
              color: "red",
              fontSize: "14px",
              background: "#002f34",
              borderRadius: "7px",
            }}
          >
            {!localStorage.getItem("token") ? (
              <Link to="/login" className="login-btn ">
                {" "}
                LOGIN{" "}
              </Link>
            ) : (
              // User is logged in
              <div>
                <div>
                  {!!localStorage.getItem("token") && (
                    <Link to="/add-product">
                      <button className="logout-btn">ADD PRODUCT </button>
                    </Link>
                  )}
                </div>
                <div>
                  {!!localStorage.getItem("token") && (
                    <Link to="/liked-products">
                      <button className="logout-btn"> FAVOURITES </button>
                    </Link>
                  )}
                </div>
                <div>
                  {!!localStorage.getItem("token") && (
                    <Link to="/my-products">
                      <button className="logout-btn">MY ADS </button>
                    </Link>
                  )}
                </div>
                <div>
                  {!!localStorage.getItem("token") && (
                    <button className="logout-btn" onClick={handleLogout}>
                      {" "}
                      LOGOUT{" "}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
