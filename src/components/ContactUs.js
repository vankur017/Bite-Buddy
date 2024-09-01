const Contact = ()=>{
    
    
    return (
        <div className="m-10 p-10">
            <h1 className="font-bold text-3xl p-4 m-4">Contact Us</h1>
            <p>Please Submit Your Query in the below Message Box</p>

            <form>
            <label htmlFor="inputId">Name</label>
                <div>
                    
                    <input className="border border-black rounded-xl p-2 w-[200px]" placeholder="name" type="text"></input><br/>
                </div>
                <label htmlFor="inputId">Message</label>
                <div>
            
                <input className="border border-black rounded-xl p-2 w-[600px] h-[400px]" placeholder="" type="text"></input><br/>
                
                </div>
                
           
            <button className='p-4 m-5 rounded-3xl border border-red bg-slate-200 color'>Submit</button>
        </form>
        </div>
    )
}
export default Contact