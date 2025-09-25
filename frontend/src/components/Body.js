import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useOnlineStatus from "/utils/useOnlineStatus";
import useFetchRes from "/utils/useFetchRes";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import Header from "./Header.js";
import { vegNonVeg } from "./RestaurantCard.js";

const PAGE_SIZE = 8;

// Lazy load components for performance
const RestaurantCard = lazy(() =>
  import("./RestaurantCard").then((module) => ({ default: module.default }))
);
const Shimmer = lazy(() =>
  import("./Shimmer").then((module) => ({ default: module.default }))
);

const Body = () => {
  // === State Variables ===
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurantList, setRestaurantList] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // === Hooks ===
  const { reslist, loading } = useFetchRes();
  const RestaurantCardOpened = vegNonVeg(RestaurantCard);
  const dispatch = useDispatch();
  const onlineStatus = useOnlineStatus();

  // === Effects ===

  // Sync initial data from the custom hook
  useEffect(() => {
    if (reslist?.length > 0) {
      setRestaurantList(reslist);
      setAllRestaurants(reslist);
      setIsLoading(false);
    }
  }, [reslist]);

  // Listen for user authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });
    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  // Debounce search text input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTxt);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTxt]);

  // Handle API search based on debounced input
  useEffect(() => {
    const fetchSearchResults = async () => {
      // Don't search if input is empty, just reset to all restaurants
      if (!debouncedSearch) {
        setRestaurantList(allRestaurants);
        setCurrentPage(0);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api-vdwpsqghha-uc.a.run.app/api/restaurants?q=${encodeURIComponent(
            debouncedSearch
          )}`
        );
        const data = await res.json();
        setRestaurantList(data.restaurants);
        setCurrentPage(0);
      } catch (err) {
        console.error("Search failed", err);
        setRestaurantList([]); // Clear list on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearch, allRestaurants]);

  // === Event Handlers (memoized) ===

  const handleInput = useCallback((e) => {
    setSearchTxt(e.target.value);
  }, []);

  const handleTopRatedFilter = useCallback(() => {
    const filterList = allRestaurants.filter((res) => res.info.avgRating > 4);
    setRestaurantList(filterList);
    setCurrentPage(0);
  }, [allRestaurants]);

  const handlePageLoad = useCallback((n) => {
    setCurrentPage(n);
  }, []);

  // === Derived State ===
  const noOfPages = Math.ceil(restaurantList.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // === Conditional Rendering ===
  if (!onlineStatus) {
    return <h1 className="text-center text-xl mt-20">Looks like you're offline</h1>;
  }

  const showShimmer = loading || isLoading;

  return (
    <Suspense fallback={<Shimmer />}>
      {showShimmer ? (
        <Shimmer />
      ) : (
        <>
          <Header />
          <div className="body mt-[88px] px-4 sm:px-6 md:px-10 min-h-screen bg-gradient-to-r from-yellow-200 via-red-200 to-red-300 bg-opacity-70 backdrop-blur-md shadow-lg">
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
                  className="px-4 py-2 bg-black text-white rounded-lg w-full sm:w-auto hover:bg-gray-800"
                  onClick={() => setDebouncedSearch(searchTxt)}
                >
                  Search
                </button>
              </div>

              {/* Top Rated Button */}
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg w-full sm:w-auto hover:bg-gray-800"
                  onClick={handleTopRatedFilter}
                >
                  Top Rated
                </button>
              </div>
            </div>

            {/* Restaurant List */}
            <div className="restaurant-container flex flex-wrap justify-center gap-4">
              {restaurantList.length > 0 ? (
                restaurantList.slice(startIndex, endIndex).map((restaurant) => {
                  const info = restaurant.info || {};
                  return (
                    <Link
                      key={info.id}
                      to={`/restaurant/${info.id}`}
                      className="text-inherit no-underline"
                    >
                      <RestaurantCardOpened resData={restaurant} />
                    </Link>
                  );
                })
              ) : (
                <h1 className="mt-8 text-2xl font-semibold">No restaurants found.</h1>
              )}
            </div>

            {/* Pagination */}
            <div className="flex z-30 justify-center flex-wrap gap-2 mt-6">
              {[...Array(noOfPages).keys()].map((n) => (
                <button
                  key={n}
                  className={`px-3 py-1 border border-orange-700 rounded bg-[#eeeeee] ${
                    currentPage === n
                      ? "bg-orange-200 font-bold shadow-md"
                      : "hover:bg-orange-100"
                  }`}
                  onClick={() => handlePageLoad(n)}
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