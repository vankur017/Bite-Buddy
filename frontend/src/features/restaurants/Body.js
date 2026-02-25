import { API_URL } from "app/services/constants";
import {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { addStoreItem } from "app/features/store/storeCartSlice";
import useOnlineStatus from "app/hooks/useOnlineStatus";
import useFetchRes from "app/hooks/useFetchRes";
import withInStock from "app/hooks/withInStock";
import Notfound from "app/services/photo.png";
import { motion, AnimatePresence } from "framer-motion";
import { vegNonVeg } from "./RestaurantCard.js";
import { Search, SlidersHorizontal, Star, X, ShoppingCart, Info, LayoutGrid, List } from "lucide-react";
import Button from "app/components/common/Button";
import Skeleton from "app/components/common/Skeleton";

const PAGE_SIZE = 8;

const RestaurantCard = lazy(() =>
  import("app/features/restaurants/RestaurantCard.js")
);

const BodySkeleton = () => (
  <div className="flex flex-wrap justify-center gap-6">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div key={i} className="w-[300px] sm:w-[320px] h-[380px] rounded-3xl overflow-hidden bg-white dark:bg-dark-900 shadow-sm border border-gray-100 dark:border-dark-800 p-5">
        <Skeleton className="w-full aspect-[4/3] rounded-2xl mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-6" />
        <div className="flex justify-between items-center pt-4 border-t border-gray-50 dark:border-dark-800">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    ))}
  </div>
);

const RestaurantCardOpened = vegNonVeg(RestaurantCard);

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Body = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurantList, setRestaurantList] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);


  const [searchTxt, setSearchTxt] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");




  const searchRef = useRef(searchTxt);
  useEffect(() => { searchRef.current = searchTxt; }, [searchTxt]);

  const debounceTimer = useRef(null);

  const { reslist, loading } = useFetchRes();
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    if (reslist?.length > 0) {
      setAllRestaurants(reslist);
      setRestaurantList(reslist);
    }
  }, [reslist]);



  // async function, so we don't need it as a dependency — removing it

  const allRestaurantsRef = useRef(allRestaurants);
  useEffect(() => { allRestaurantsRef.current = allRestaurants; }, [allRestaurants]);


  const runSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setRestaurantList(allRestaurantsRef.current);
      setActiveFilter("all");
      setCurrentPage(0);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setActiveFilter("search");
    try {
      const res = await fetch(
        `${API_URL}/api/restaurants?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setRestaurantList(data.restaurants ?? []);
      setCurrentPage(0);
    } catch (err) {
      console.error("Search failed:", err);
      setRestaurantList([]);
    } finally {
      setIsSearching(false);
    }
  }, []);


  const handleInput = useCallback(
    (e) => {
      const val = e.target.value;
      setSearchTxt(val);

      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        runSearch(val);
      }, 500);
    },
    [runSearch]
  );


  const handleSearchSubmit = useCallback(() => {
    clearTimeout(debounceTimer.current);
    runSearch(searchTxt);
  }, [searchTxt, runSearch]);

  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Enter") handleSearchSubmit(); },
    [handleSearchSubmit]
  );

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchTxt("");
    clearTimeout(debounceTimer.current);
    setRestaurantList(allRestaurantsRef.current);
    setActiveFilter("all");
    setCurrentPage(0);
    setIsSearching(false);
  }, []);

  // Top-rated filter
  const handleTopRatedFilter = useCallback(() => {
    if (activeFilter === "topRated") {
      setRestaurantList(allRestaurantsRef.current);
      setActiveFilter("all");
    } else {
      const filtered = allRestaurantsRef.current.filter(
        (r) => r.info?.avgRating >= 4
      );
      setRestaurantList(filtered);
      setActiveFilter("topRated");
      setCurrentPage(0);
    }
  }, [activeFilter]);

  const handlePageLoad = useCallback((n) => setCurrentPage(n), []);

  // ── Derived state ───────────────────────────────────────────────
  const noOfPages = Math.ceil(restaurantList.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const paginated = useMemo(
    () => restaurantList.slice(startIndex, startIndex + PAGE_SIZE),
    [restaurantList, startIndex]
  );

  // ── Offline guard ───────────────────────────────────────────────
  if (!onlineStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-2xl font-bold text-gray-200">You're Offline</h1>
          <p className="text-gray-400 mt-2">Check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background dark:bg-dark-950 transition-colors duration-300">
      <Suspense fallback={<BodySkeleton />}>
        {loading ? (
          <BodySkeleton />
        ) : (
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
                Discover <span className="gradient-text">Top Restaurants</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                {restaurantList.length > 0
                  ? `Over ${restaurantList.length} choices near you`
                  : "Finding the best bites for you…"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 p-4 glass rounded-[2.5rem]"
            >
              <div className="relative w-full lg:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                  type="text"
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-dark-800/50 border-none rounded-2xl text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-orange-500/50 transition-all text-sm font-bold"
                  placeholder="What are you craving?"
                  value={searchTxt}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                />
                <AnimatePresence>
                  {searchTxt && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={handleClearSearch}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-full transition-colors text-gray-400"
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <Button
                  onClick={handleSearchSubmit}
                  isLoading={isSearching}
                  size="md"
                  className="w-full lg:w-auto"
                >
                  <Search size={18} className="mr-2" />
                  Search
                </Button>

                <div className="h-8 w-px bg-gray-200 dark:bg-dark-800 hidden lg:block mx-1" />

                <Button
                  variant={activeFilter === "topRated" ? "primary" : "secondary"}
                  onClick={handleTopRatedFilter}
                  size="md"
                  className="flex-1 lg:flex-none"
                >
                  <Star size={18} className={`mr-2 ${activeFilter === "topRated" ? "fill-white" : ""}`} />
                  Top Rated
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  className="p-3 lg:p-2.5"
                >
                  <SlidersHorizontal size={20} />
                </Button>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {paginated.length > 0 ? (
                <motion.div
                  key={`page-${currentPage}-${activeFilter}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {paginated.map((restaurant) => {
                    const info = restaurant.info || {};
                    return (
                      <motion.div key={info.id} variants={cardVariants} className="flex justify-center">
                        <Link
                          to={`/restaurant/${info.id}`}
                          className="flex justify-center w-full max-w-[320px]"
                        >
                          <Suspense fallback={<Skeleton className="w-[320px] h-[380px] rounded-3xl" />}>
                            <RestaurantCardOpened resData={restaurant} />
                          </Suspense>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 gap-6 glass rounded-3xl"
                >
                  <div className="w-20 h-20 bg-gray-100 dark:bg-dark-800 rounded-3xl flex items-center justify-center text-4xl shadow-inner">
                    🍽️
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">
                      No results found
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                      {activeFilter === "search"
                        ? `We couldn't find any matches for "${searchTxt}"`
                        : "Try changing your filters or search criteria."}
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleClearSearch}>
                    Reset All Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {noOfPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-2 mt-16"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageLoad(Math.max(currentPage - 1, 0))}
                  disabled={currentPage === 0}
                >
                  Prev
                </Button>

                <div className="flex items-center gap-1 mx-2">
                  {[...Array(noOfPages).keys()].map((n) => (
                    <button
                      key={n}
                      className={`h-9 min-w-[36px] px-2 rounded-xl text-xs font-black transition-all ${currentPage === n
                        ? "bg-orange-500 text-white shadow-lg active:scale-90"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800"
                        }`}
                      onClick={() => handlePageLoad(n)}
                    >
                      {n + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePageLoad(Math.min(currentPage + 1, noOfPages - 1))}
                  disabled={currentPage === noOfPages - 1}
                >
                  Next
                </Button>
              </motion.div>
            )}
          </div>
        )
        }
      </Suspense >
    </div >
  );
};

export default Body;
