import React, { Component } from 'react'
import notFound404 from "../../img/NotFound/notFound.jpg"
import "./index.scss"
import Footer from "../../layout/Footer";

const NotFound =()=> {

        return (
            <>
            <div className="notFound404">
               <img src={notFound404} alt=""/>
            </div>
                <Footer notFound={"notFound"}/>
                </>
        )

}

export default NotFound
