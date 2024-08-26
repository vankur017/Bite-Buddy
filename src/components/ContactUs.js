const Contact = ()=>{
    
    
    return (
        <div className="contact">
            <h1>Contact Us</h1>
            <h2>Please Submit Your Query in the below Message Box</h2>

            <div>
                <label for="message">Message</label><br/>
                <input id="message"></input><br/>
                
            </div>
            <button colorScheme='Blue'>Submit</button>
        </div>
    )
}
export default Contact