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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import useOnlineStatus from "/utils/useOnlineStatus";
import useFetchRes from "/utils/useFetchRes";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import { vegNonVeg } from "./RestaurantCard.js";

const PAGE_SIZE = 8;

// Lazy load components
const RestaurantCard = lazy(() =>
  import("./RestaurantCard").then((m) => ({ default: m.default }))
);
const Shimmer = lazy(() =>
  import("./Shimmer").then((m) => ({ default: m.default }))
);

// HOC applied once at module level — not inside render
const RestaurantCardOpened = vegNonVeg(RestaurantCard);

// Stagger animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const Body = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [restaurantList, setRestaurantList] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  // Single source of truth for search text
  const [searchTxt, setSearchTxt] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // active filter: "all" | "topRated" | "search"
  const [activeFilter, setActiveFilter] = useState("all");

  // Use a ref so the debounce timeout can access the latest search value
  // without creating stale-closure issues
  const searchRef = useRef(searchTxt);
  useEffect(() => { searchRef.current = searchTxt; }, [searchTxt]);

  const debounceTimer = useRef(null);

  const { reslist, loading } = useFetchRes();
  const dispatch = useDispatch();
  const onlineStatus = useOnlineStatus();

  // ── Sync initial data ───────────────────────────────────────────
  useEffect(() => {
    if (reslist?.length > 0) {
      setAllRestaurants(reslist);
      setRestaurantList(reslist);
    }
  }, [reslist]);

  // ── Auth listener ───────────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });
    return () => unsub();
  }, [dispatch]);

  // ── Debounced search ────────────────────────────────────────────
  // Key fix: allRestaurants is accessed via a stable ref inside the
  // async function, so we don't need it as a dependency — removing it
  // prevents search from re-firing every time the initial list loads.
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
        `https://api-vdwpsqghha-uc.a.run.app/api/restaurants?q=${encodeURIComponent(query)}`
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

  // Debounce: fires 500ms after the user stops typing
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

  // Immediate search on button click or Enter key
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

  const showShimmer = loading;

  return (
    <Suspense fallback={<Shimmer />}>
      {showShimmer ? (
        <Shimmer />
      ) : (
        <div className="min-h-screen mt-[88px] px-4 sm:px-6 md:px-10 pb-16"
          style={{
            background:
              "linear-gradient(135deg, #fff7ed 0%, #fed7aa 30%, #fecaca 65%, #f9a8d4 100%)",
          }}
        >
          {/* ── Hero / Page Title ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-8 pb-4 text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
              🍽️ Discover Restaurants
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              {restaurantList.length > 0
                ? `${restaurantList.length} restaurants near you`
                : "Finding great food near you…"}
            </p>
          </motion.div>

          {/* ── Filter Bar ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 mt-2"
          >
            {/* Search input */}
            <div className="relative flex items-center w-full sm:w-auto">
              <span className="absolute left-3 text-gray-400 pointer-events-none text-lg">🔍</span>
              <input
                type="text"
                className="pl-10 pr-10 py-2.5 w-full sm:w-72 rounded-2xl border border-orange-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm transition-all duration-200"
                placeholder="Search restaurants…"
                value={searchTxt}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
              />
              {/* Clear button */}
              <AnimatePresence>
                {searchTxt && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    onClick={handleClearSearch}
                    className="absolute right-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
                    aria-label="Clear search"
                  >
                    ×
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSearchSubmit}
                disabled={isSearching}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-2xl shadow transition-colors"
              >
                {isSearching ? "Searching…" : "Search"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleTopRatedFilter}
                className={`px-5 py-2.5 font-bold rounded-2xl shadow transition-all ${activeFilter === "topRated"
                    ? "bg-yellow-400 text-gray-900 ring-2 ring-yellow-500"
                    : "bg-white/80 text-gray-700 border border-gray-300 hover:border-orange-400 hover:text-orange-500"
                  }`}
              >
                ⭐ Top Rated {activeFilter === "topRated" && "✓"}
              </motion.button>

              {activeFilter !== "all" && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleClearSearch}
                  className="px-4 py-2.5 bg-white/80 text-gray-500 border border-gray-300 hover:border-red-300 hover:text-red-500 font-semibold rounded-2xl shadow text-sm transition-all"
                >
                  Clear Filter
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* ── Restaurant Grid ──────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {paginated.length > 0 ? (
              <motion.div
                key={`page-${currentPage}-${activeFilter}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-2"
              >
                {paginated.map((restaurant) => {
                  const info = restaurant.info || {};
                  return (
                    <motion.div key={info.id} variants={cardVariants}>
                      <Link
                        to={`/restaurant/${info.id}`}
                        className="text-inherit no-underline"
                      >
                        <Suspense
                          fallback={
                            <div className="m-4 w-[350px] h-[360px] rounded-2xl bg-white/40 animate-pulse" />
                          }
                        >
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
                className="flex flex-col items-center justify-center py-24 gap-4"
              >
                <div className="text-7xl">🍽️</div>
                <h2 className="text-2xl font-bold text-gray-700">
                  No restaurants found
                </h2>
                <p className="text-gray-500 text-center max-w-xs">
                  {activeFilter === "search"
                    ? `No results for "${searchTxt}". Try a different name.`
                    : "Try adjusting your filters."}
                </p>
                <button
                  onClick={handleClearSearch}
                  className="mt-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow transition-colors"
                >
                  Show All Restaurants
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Pagination ───────────────────────────────────────── */}
          {noOfPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center flex-wrap gap-2 mt-10"
            >
              <button
                className="px-3 py-1.5 rounded-xl bg-white/80 border border-gray-300 hover:bg-orange-50 text-gray-600 text-sm font-semibold shadow-sm disabled:opacity-40 transition-colors"
                onClick={() => handlePageLoad(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
              >
                ← Prev
              </button>

              {[...Array(noOfPages).keys()].map((n) => (
                <motion.button
                  key={n}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-bold border shadow-sm transition-all ${currentPage === n
                      ? "bg-orange-500 text-white border-orange-500 shadow-orange-200"
                      : "bg-white/80 text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-orange-400"
                    }`}
                  onClick={() => handlePageLoad(n)}
                >
                  {n + 1}
                </motion.button>
              ))}

              <button
                className="px-3 py-1.5 rounded-xl bg-white/80 border border-gray-300 hover:bg-orange-50 text-gray-600 text-sm font-semibold shadow-sm disabled:opacity-40 transition-colors"
                onClick={() =>
                  handlePageLoad(Math.min(currentPage + 1, noOfPages - 1))
                }
                disabled={currentPage === noOfPages - 1}
              >
                Next →
              </button>
            </motion.div>
          )}

          {/* ── Results summary ──────────────────────────────────── */}
          {restaurantList.length > 0 && noOfPages > 1 && (
            <p className="text-center text-gray-400 text-xs mt-4">
              Page {currentPage + 1} of {noOfPages} ·{" "}
              {restaurantList.length} restaurants
            </p>
          )}
        </div>
      )}
    </Suspense>
  );
};

export default Body;