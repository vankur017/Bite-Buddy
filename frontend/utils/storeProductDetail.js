const storeProductDetail = async(id)=>{

    try{
        const data = await fetch(`https://dummyjson.com/products/${id}`)
        const json = await data.json();
        console.log("Fetching:", `https://dummyjson.com/products/${id}`);

        return json;
    }
    catch(err){
        return err
    }
        

}
export default storeProductDetail