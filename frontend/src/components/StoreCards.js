import React from "react";
const StoreCards = ({data=[], setData})=>{

    console.log(data);
    
    return (
        <div className="bg-[#eeeeee] flex flex-wrap justify-center m-2">

            {
                data.map((product)=>{

                   return <div key={product.id} className="border m-2 rounded-lg border-black p-4 h-[30%] w-[20%] ">
                        <img className="" src={product.images} alt="Not rendered"/>
                        <div>
                            <h3>{product.title}</h3>
                        </div>
                    </div>
                })
            }
           
        </div>
    )
}
export default StoreCards