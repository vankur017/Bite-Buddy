const storeProductDetail = async(id)=>{

    try{
        const data = await fetch(`https://dummyjson.com/products/${id}`)
        const json = await data.json();
        
        return json;
    }
    catch(err){
        return err
    }
        

}
export default storeProductDetail