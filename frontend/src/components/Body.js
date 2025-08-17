import { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useOnlineStatus from "/utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import mockData from "../../utils/mockData.json";
import Header from "./Header.js"
// Lazy imports (default exports only)

const RestaurantCard = lazy(() => import("./RestaurantCard.js"));
const Shimmer = lazy(() => import("./Shimmer.js"));
const Footer = lazy(() => import("./Footer.js"));

// Normal import for named export
import RestaurantCard, { vegNonVeg } from "./RestaurantCard.js";


const PAGE_SIZE = 10;

const Body = () => {
  const [currentPage, setCurrentpage] = useState(0);
  const [restaurantList, setrestaurantList] = useState([]);
  const [searchTxt, setSearch] = useState("");

  const RestaurnatCardOpened = vegNonVeg(RestaurantCard);
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePopState = () => window.location.reload();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  const fetchData = async () => {
    setrestaurantList(
      mockData.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
    );
  };

  const handleNextPageLoad = (n) => setCurrentpage(n);

  const noOfPages = Math.ceil(restaurantList.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = (currentPage + 1) * PAGE_SIZE;

  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserName } = useContext(UserContext);

  if (!onlineStatus)
    return <h1 className="text-center text-xl mt-20">Looks Like you're offline</h1>;

  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      {restaurantList.length === 0 ? (
        <Shimmer />
      ) : (
        <>
          {/* Main Body */}
          <Header />
          <div className="body mt-[88px] px-4 sm:px-6 md:px-10 min-h-screen bg-gradient-to-r from-yellow-200 via-red-200 to-red-300 bg-opacity-70 backdrop-blur-md rounded-none shadow-lg">
            
            {/* Filter Section */}
            <div className="filter flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              {/* Search Box */}
              <div className="flex flex-col sm:flex-row items-center mt-2 gap-2 w-full md:w-auto">
                <input
                  type="text"
                  className="p-2 border border-black focus:outline-none rounded-lg w-full sm:w-64 bg-white/50 backdrop-blur-sm"
                  placeholder="Search restaurant"
                  value={searchTxt}
                  onChange={(evt) => setSearch(evt.target.value)}
                />
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg w-full sm:w-auto hover:bg-gray-800 transition"
                  onClick={() => {
                    const filterRes = restaurantList.filter((res) =>
                      res.info.name.toLowerCase().includes(searchTxt.toLowerCase())
                    );
                    setrestaurantList(filterRes);
                  }}
                >
                  Search
                </button>
              </div>

              {/* Top Rated */}
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg w-full sm:w-auto hover:bg-gray-800 transition"
                  onClick={() => {
                    const filterList = restaurantList.filter((res) => res.info.avgRating > 4.2);
                    setrestaurantList(filterList);
                  }}
                >
                  Top Rated
                </button>
              </div>
            </div>

            {/* Restaurant List */}
            <div className="restaurant-container flex flex-wrap justify-center gap-4">
              {restaurantList.slice(start, end).map((restaurant) => (
                <Link
                  key={restaurant.info.id}
                  to={`/restaurant/${restaurant.info.id}`}
                  className="text-inherit no-underline"
                >
                  {restaurant.info.availability.opened ? (
                    <RestaurnatCardOpened resData={restaurant} />
                  ) : (
                    <RestaurantCard resData={restaurant} />
                  )}
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center flex-wrap gap-2 mt-6">
              {[...Array(noOfPages).keys()].map((n) => (
                <button
                  key={n}
                  className={`px-3 py-1 border border-orange-700 rounded bg-[#eeeeee] transition ${
                    currentPage === n ? "bg-orange-200 font-bold shadow-md" : "hover:bg-orange-100"
                  }`}
                  onClick={() => handleNextPageLoad(n)}
                >
                  {n + 1}
                </button>
              ))}
            </div>
          </div>

        </>
      )}
    </Suspense>
  );
};

export default Body;
