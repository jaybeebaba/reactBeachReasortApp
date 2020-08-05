import React from 'react'
import Hero from "../components/Hero"
import Banner from "../components/Banner"
import {Link} from "react-router-dom"

function Error() {
    return (
        <div>
            <Hero>
            <Banner title="404" subtitle="page not found">
                <Link to="/" className="btn-primary">go home</Link>
            </Banner>
            </Hero>
        </div>
    )
}

export default Error
 