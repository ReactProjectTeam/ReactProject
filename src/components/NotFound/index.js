import React, { Component } from 'react'
import notFound404 from "../../img/NotFound/notFound.jpg"
import "./index.scss"

class NotFound extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className="notFound404">
               <img src={notFound404} alt=""/>
            </div>
        )
    }
}

export default NotFound
