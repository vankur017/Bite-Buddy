import ItemList from "./ItemList";

const RestaurantCategory = ({data, showItems, setShowIndex})=>{

    const handleClick = () => {
        setShowIndex() 
    }

    return (
        <div>
      
          
            <div className="w-6/12 m-auto my-2 bg-gray-100 shadow-lg p-5  ">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-md">{data.title} ({data.itemCards.length})</span>
                    <span className="" >🔽</span>
                </div>
                {showItems && <ItemList items={data.itemCards}/>}
            </div>
        
         
        </div>
    )
}

export default RestaurantCategory