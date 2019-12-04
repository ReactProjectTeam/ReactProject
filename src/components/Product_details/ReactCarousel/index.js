import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import img1 from "../../../img/031.jpg"
import img2 from "../../../img/032.jpg"
import img3 from "../../../img/033.jpg"
import img4 from "../../../img/034.jpg"
import img5 from "../../../img/035.jpg"
import img6 from "../../../img/036.jpg"

class DemoCarousel extends Component {
    render() {
        return (
            
            <Carousel infiniteLoop={true} showThumbs={true} transitionTime="1000">
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
                <div>
                    <img src={img5} />
                </div>
                <div>
                    <img src={img6} />
                </div>
            </Carousel>
        );
    }
};

export default DemoCarousel;