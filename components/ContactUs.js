const Contact = ()=>{
    
    
    return (
        <div className="contact">
            <h1>Contact Us</h1>
            <h2>Please Submit Your Query in the below Message Box</h2>

            <div>
                <label for="message">Message</label><br/>
                <textarea id="message" name="message" rows="10" cols="100"></textarea><br/>
                
            </div>
            <button>Submit</button>
        </div>
    )
}
export default Contact