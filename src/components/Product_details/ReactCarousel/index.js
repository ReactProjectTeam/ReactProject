import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'


class ProductCarousel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {img} = this.props
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
    }
};

export default ProductCarousel;