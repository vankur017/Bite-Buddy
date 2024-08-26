import RestaurantCard, { withOpenedLabel } from "./RestaurantCard"
import {useState, useEffect, createContext, useContext} from "react"
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom"; 
import useOnlineStatus from "/utils/useOnlineStatus";
import UserContext from "../../utils/UserContext";
const Body = ()=>{

  

    const [restaurantList, setrestaurantList] =useState([]);
  
    const [searchTxt, setSearch] = useState("");
   
    const RestaurnatCardOpened = withOpenedLabel(RestaurantCard)

    useEffect(()=>{

       fetchData(); 
       
    }, [])
    
        const fetchData =async ()=>{
       
        const data = await fetch(
            "https://corsproxy-la3g.onrender.com/full/?url=https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.87560&lng=80.91150&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        )
      
        const json = await data.json()
        console.log(json.data);
        
        setrestaurantList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
        
        console.log(restaurantList);
        
    }

    const onlineStatus = useOnlineStatus();
    const {loggedInUser,setUserName} = useContext(UserContext)
    if(onlineStatus === false)
        return (  <h1>Looks Like u are offline</h1>)

    return  restaurantList.length===0? <Shimmer/>:
    (
        <div className="body">
        <div className="filter flex items-center">
            <div className="search m-2 p-2">
                <input 
                type="text" 
                className="p-2 border border-black focus:outline-none focus:border-black hover:border-black rounded-lg h-10" 
                placeholder="Search restaurant"
                value= {searchTxt} 
                onChange={(evt)=>
                     setSearch(evt.target.value)
                    }
                />
             
                <button 
                className="px-4 py-2  bg-lime-300 m-4 rounded-lg"
                onClick={()=>{
                    
                    const filterRes= restaurantList.filter((res)=>
                    res.info.name.toLowerCase().includes(searchTxt.toLowerCase()))
                    setrestaurantList(filterRes)
                }}>
                    Search
                </button>
            </div>

            <div className="m-2 p-2">
                <button className="px-4 py-2  bg-gray-100 m-4 rounded-lg" onClick={()=>{
                    const filterList = restaurantList.filter((res)=> res.info.avgRating>4.2 )
                    setrestaurantList(filterList)
                }}
                >
                    Top Rated
                </button>
                <label>User Name</label>
                <input placeholder="Enter User Name" className="p-2 border border-black focus:outline-none focus:border-black hover:border-black rounded-lg h-10"
                    value={loggedInUser}
                    onChange={(e)=>setUserName(e.target.value)}
                />

            </div>
        </div>
        <div className="restaurant-container flex flex-wrap ">
          
           { restaurantList.map(
                    (restaurant) =>    
                    <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}  style={{ textDecoration: 'none', color: 'inherit' }}>
                        {
                           restaurant.info.availability.opened? (
                            <RestaurnatCardOpened resData={restaurant}/>
                        ):
                        ( <RestaurantCard  resData={restaurant} />)
                        }
                        
                    </Link>)
           }
                  { /* //NOTE:- NEVER USE INDEX AS KEY!!! Used Index Here because we have duplicated the data in api which will return in lot of warnings, */}
        </div>

    </div>
    )
}

export default Body;
