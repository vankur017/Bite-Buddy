import { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useOnlineStatus from "/utils/useOnlineStatus";
import useFetchRes from "/utils/useFetchRes";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import Header from "./Header.js";
import RestaurantCard, { vegNonVeg } from "./RestaurantCard.js";
import API_URL from "../../utils/constants"

// Constants
const PAGE_SIZE = 8;

const Body = () => {
  const RestaurantCard = lazy(() =>
    import("./RestaurantCard").then((module) => ({ default: module.default }))
  );

  const Shimmer = lazy(() =>
    import("./Shimmer").then((module) => ({ default: module.default }))
  );

  const [currentPage, setCurrentpage] = useState(0);
  const [restaurantList, setRestaurantList] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]); // keep original list
  const [searchTxt, setSearch] = useState("");
   const [debouncedSearch, setDebouncedSearch] = useState(""); 
  const { reslist, loading } = useFetchRes();
  const RestaurnatCardOpened = vegNonVeg(RestaurantCard);
  const dispatch = useDispatch();

  // ✅ Populate restaurant list once data is fetched
  useEffect(() => {
    if (reslist && reslist.length > 0) {
      setRestaurantList(reslist);
      setAllRestaurants(reslist);
    }
  }, [reslist]);

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

  // ✅ Search restaurants
  const handleSearch = async () => {
    if (!searchTxt.trim()) {
      console.log(allRestaurants);
      
      setRestaurantList(allRestaurants);
      return;
    }
    try {
      const res = await fetch(`https://api-vdwpsqghha-uc.a.run.app/api/restaurants?q=${encodeURIComponent(searchTxt)}`);
      const data = await res.json();
      setRestaurantList(data.restaurants);
      setCurrentpage(0);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTxt);
    }, 800); // wait 400ms after last keystroke
    return () => clearTimeout(handler);
  }, [searchTxt]);


  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setRestaurantList(allRestaurants);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`https://api-vdwpsqghha-uc.a.run.app/api/restaurants?q=${encodeURIComponent(debouncedSearch)}`);
        const data = await res.json();
        setRestaurantList(data.restaurants);
        setCurrentpage(0);

        if(!res){
          return <>No res found</>
        }
      } catch (err) {
        console.error("Search failed", err);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  const handleNextPageLoad = (n) => setCurrentpage(n);

  const noOfPages = Math.ceil(restaurantList.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = (currentPage + 1) * PAGE_SIZE;

  const handleInput = (e)=> setSearch(e.target.value)

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus)
    return (
      <h1 className="text-center text-xl mt-20">
        Looks Like you're offline
      </h1>
    );

  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      {loading ? (
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
                  className="p-2 border text-black border-black focus:outline-none rounded-lg w-full sm:w-64 bg-white/50 backdrop-blur-sm"
                  placeholder="Search Restaurant"
                  value={searchTxt}
                  onChange={handleInput}

      
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-black text-white rounded-lg w-full sm:w-auto hover:bg-gray-800 transition"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>

              {/* Top Rated */}
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg w-full sm:w-auto hover:bg-gray-800 transition"
                  onClick={() => {
                    const filterList = allRestaurants.filter(
                      (res) => res.info.avgRating > 4.2
                    );
                    setRestaurantList(filterList);
                    setCurrentpage(0);
                  }}
                >
                  Top Rated
                </button>
              </div>
            </div>

            {/* Restaurant List */}
            <div className="restaurant-container flex flex-wrap justify-center gap-4">
              {restaurantList.slice(start, end).map((restaurant) => {
                const info = restaurant.info || {};
                return (
                  <Link
                    key={info.id}
                    to={`/restaurant/${info.id}`}
                    className="text-inherit no-underline"
                  >
                  
                      <RestaurnatCardOpened resData={restaurant} />
                   
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex z-30 justify-center flex-wrap gap-2 mt-6">
              {[...Array(noOfPages).keys()].map((n) => (
                <button
                  key={n}
                  className={`px-3 py-1 border border-orange-700 rounded bg-[#eeeeee] transition ${
                    currentPage === n
                      ? "bg-orange-200 font-bold shadow-md"
                      : "hover:bg-orange-100"
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
