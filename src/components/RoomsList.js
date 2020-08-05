import React from 'react'
import Room from "./Room"

function RoomsList({rooms}) {
    if(rooms.length===0){
        return(
            <div className="empty-search"> 
            <h3>Unfortunately no rooms match your search paramaters</h3>
            </div>
        )
    }
    return (
        <section className="roomslist">
        <div className="roomslist-center">
        {rooms.map(room=>{
               return <Room key={room.id} room={room}/>
           })}
        </div>
           
        </section>
    )
}

export default RoomsList
