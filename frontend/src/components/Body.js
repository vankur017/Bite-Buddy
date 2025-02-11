import RestaurantCard, { vegNonVeg } from "./RestaurantCard"
import {useState, useEffect, createContext, useContext} from "react"
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom"; 
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../utils/firebase";
import useOnlineStatus from "/utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from '../../utils/userSlice';
import mockData from "../../utils/mockData.json"  
import axios from "axios";

const PAGE_SIZE = 8

const Body = ()=>{

    const [currentPage, setCurrentpage] = useState(0)

    const [restaurantList, setrestaurantList] =useState([]);
  
    const [searchTxt, setSearch] = useState("");
   
    const RestaurnatCardOpened = vegNonVeg(RestaurantCard)

    const dispatch = useDispatch()

    useEffect(()=>{

       fetchData(); 
       
    }, [])
 
    

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
           
            const {uid, email, displayName} = user;
            
            dispatch(addUser({uid:uid, email:email, displayName: displayName}))
            
            // ...
          } else {
            // User is signed out
            // ...
            dispatch(removeUser());
        
          }
        });
      
      }, [])
        const fetchData =async ()=>{
       
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.87560&lng=80.91150&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        )
      
        const json = await data.json()
        console.log();
        
        // console.log(mockData.data);
        // console.log(data.data.record)
        
         setrestaurantList(json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants|| [])
        //  console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants )
        
     
        
    }
    
    const handleNextPageLoad = (n)=>{
      setCurrentpage(n)
    }

    const noOfPages = Math.ceil(restaurantList.length/PAGE_SIZE)
    const start = currentPage*PAGE_SIZE
    const end = (currentPage+1) *PAGE_SIZE
    console.log(noOfPages);
    

    console.log(restaurantList);
    

    const onlineStatus = useOnlineStatus();
    const {loggedInUser,setUserName} = useContext(UserContext)
    if(onlineStatus === false)
        return (  <h1>Looks Like u are offline</h1>)

    return restaurantList.length===0? <Shimmer/> :
     (
        <div className="body mt-4 pl-4 sm:pl-6 md:pl-8 lg:pl-11 bg-gradient-to-r from-yellow-200 via-red-250 to-red-300">
        <div className="filter flex flex-col md:flex-row items-center">
          <div className="search m-2 p-2">
            <input 
              type="text" 
              className="p-2 border border-black focus:outline-none focus:border-black hover:border-black rounded-lg h-10 w-full sm:w-auto"
              placeholder="Search restaurant"
              value={searchTxt} 
              onChange={(evt) => setSearch(evt.target.value)}
            />
            <button 
              className="px-4 py-2 bg-black m-4 text-white rounded-lg w-full sm:w-auto"
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
          <div className="m-2 p-2 flex flex-col md:flex-row items-center">
            <button 
              className="px-4 py-2 bg-black text-gray-200 m-4 rounded-lg w-full sm:w-auto"
              onClick={() => {
                const filterList = restaurantList.filter((res) => res.info.avgRating > 4.2);
                setrestaurantList(filterList);
              }}
            >
              Top Rated
            </button>
            <div className="flex flex-col sm:flex-row items-center">
              {/* <label className="sm:mr-2">User Name</label>
              <input 
                placeholder="Enter User Name" 
                className="p-2 border border-black focus:outline-none focus:border-black hover:border-black rounded-lg h-10 w-full sm:w-auto"
                value={loggedInUser}
                onChange={(e) => setUserName(e.target.value)}
              /> */}
            </div>
          </div>
        </div>
        <div className="restaurant-container flex flex-wrap justify-center">
          {restaurantList.slice(start, end).map((restaurant) => (
            <Link key={restaurant.info.id} to={`/restaurant/${restaurant.info.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {restaurant.info.availability.opened ? (
                <RestaurnatCardOpened resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
        <div className="justify-center px-[50%] ">
          {[...Array(noOfPages).keys().map((n)=>(
            <span 
              key={n}
              className="mx-1 px-3 border border-orange-700 rounded bg-[#eeeeee]"
              onClick={()=> handleNextPageLoad(n)}

            >
              {n}
            </span>
          ))]}
        </div>
      </div>
      
    )
}

export default Body;

