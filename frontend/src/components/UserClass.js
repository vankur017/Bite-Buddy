import React from "react";
import { json } from "react-router-dom";

class UserClass extends React.Component{

    constructor(props) {
        super(props);
        // console.log(props);
        
        this.state = {
            userInfo: {
                name:"Dummy",
                location:"Default",
            }
        }
        console.log( this.props.name+" Constructor");
    }
     
    async componentDidMount() {
        console.log(this.props.name+" mounted");
        //Api CAll
        const data = await fetch('https://api.github.com/users/vankur017');
        const json = await data.json();
        // console.log(json);
        
        this.setState({
            userInfo: json
        })
    }

    componentDidUpdate(prevProps, prevState){
        
        
    
        console.log(this.props.name+"updated");
        
    }

    

    render(){
        console.log(this.props.name+"render");
        
        const {name, location, avatar_url} = this.state.userInfo;
        const {count} = this.state

        return (
        <div className = "user-card_class">
           <img src={avatar_url}/>
            {/* <h2>{this.props.name}</h2>
            <h3>{this.props.Location}</h3>
            <h3>{this.props.Contact}</h3> */}

            <h2>{name}</h2>
            <h3>{location}</h3>
            
        </div>
        )  
    }
}

export default UserClass;