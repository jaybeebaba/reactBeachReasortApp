import React, { Component } from 'react'
import {RoomContext} from "../context"
import Title from "./Title"
import Loading from "./Loading"
import Room from "./Room"


export default class FeaturedRooms extends Component {
    static contextType = RoomContext
        render() {
            let {loading, featuredRooms:rooms} = this.context
           const featuredrooms = rooms.map(room => {
                return(
                    <Room key={room.id} room={room}>
                        
                    </Room>
                )
            })
        return (
            
            <section className="featured-rooms">
                <Title title="featured rooms"/>
                <div className="featured-rooms-center">
                 {loading? <Loading/> : featuredrooms }
                </div>
                {/* <Loading/> */}
            </section>
        )
    }
}
