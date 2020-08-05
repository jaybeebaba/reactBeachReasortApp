import React, { Component } from 'react'
import defaultBcg from "../images/room-1.jpeg"
// import Hero from "../components/Hero"
import Banner from "../components/Banner"
import {Link} from "react-router-dom"
import {RoomContext} from "../context"
import StyledHero from "../components/StyledHero"



export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
          slug: this.props.match.params.slug,
          defaultBcg: defaultBcg
        };
      }
    static contextType = RoomContext
    render() {
        const {getRoom} = this.context
        const room = getRoom(this.state.slug)
        // console.log(room)
        
        if(!room){
            return (
            <div className="error">
                <h3>Room Does not exist</h3>
                <Link to="/rooms" className="btn-primary"> back to room </Link>
            </div>)
           
        }else{
            return (
                <>
                <StyledHero img={room.images[0]}>
                <Banner title={room.name + " room"  } >
                    <Link to="/rooms" className="btn-primary">
                        Back to rooms
                    </Link>
                </Banner>     
                </StyledHero>

                    <section className="single-room">
                          <div className="single-room-images">
                            {room.images.slice(1,).map((img, index)=>{
                                return <img key={index} src={img} alt="Poster"/>
                            })}
                          </div>

                          <div className="single-room-info">
                            <article className="desc">
                                <h3>details</h3>
                                <p>{room.description}</p>
                            </article>
                            <article className="info">
                                <h3>info</h3>
                                <h6>price: ${room.price}</h6>
                                <h6>size: {room.size} SQFT</h6>
                                <h6>
                                    max capacity: {
                                        room.capacity>1? room.capacity + " people" : room.capacity + " person"
                                    }
                                </h6>
                                 <h6>
                                    {
                                        room.pets? "pets are allowed" : "pets not allowed"
                                    }
                                </h6>

                                <h6>
                                    {
                                        room.breakfast? "breakfasts are free" : null
                                    }
                                </h6>

                            </article>
                          </div>
                    </section>  
                    <section className="room-extras">
                                <h6>extras</h6>
                                <ul className="extras">
                                    {room.extras.map((extra, index)=>{
                                        return(
                                            <li key={index}># {extra}</li>
                                        )
                                    })}
                                </ul>
                    </section>              
                </>
            )
        }
        
    }
}
