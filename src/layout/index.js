import React, {Component} from 'react';
import Header from "./Header";
import Footer from "./Footer";

const Layout =(props)=> {
        return (
            <>
                <Header rendering={props.rendering} getLoggedOut={props.getLoggedOut} />
                    {props.children}
                {/*<Footer product={props.product}/>*/}
            </>
        );

}

export default Layout;
