import React, {Component} from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Layout =(props)=> {
        return (
            <div>
                <Header user={props.user} rendering={props.rendering}/>
                    {props.children}
                <Footer/>
            </div>
        );

}

export default Layout;
