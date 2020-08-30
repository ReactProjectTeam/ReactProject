import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const ProductCarousel =(props)=> {

        const {img} = props;
        return (
            <Carousel infiniteLoop={true} showThumbs={true} transitionTime={1000}>
                {img && img.map((item,index)=>{
                    return(
                        <div key={index}>
                            <img src={item} alt={item}/>
                        </div>
                    )
                })}


            </Carousel>
        );
};

export default ProductCarousel;