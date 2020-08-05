import React, { Component } from 'react'
import Title from "./Title"
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa"

export default class Services extends Component {
    state={
        services:[
            {
                icon: <FaCocktail/>,
                title: "free cocktail",
                info: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"
            },
            {
                icon: <FaHiking/>,
                title: "endless hiking",
                info: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"
            },
            {
                icon: <FaShuttleVan/>,
                title: "free shuttle",
                info: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"
            },
            {
                icon: <FaBeer/>,
                title: "best fun moments",
                info: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah"
            }
        ]
    }
    render() {
       
        return (
            <section className="services">
               <Title title="services"/>
               <div className="services-center">
                {this.state.services.map((item, index)=>{
                    return(
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    )
                })}
               </div>
               
            </section>
        )
    }
}
