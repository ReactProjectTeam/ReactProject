import React, { Component } from 'react'
import img1 from '../../../img/product_details/1.jpg';
import img2 from '../../../img/product_details/2.jpg';
import img3 from '../../../img/product_details/3.jpg';
import img4 from '../../../img/product_details/4.jpg';
import img5 from '../../../img/product_details/5.jpg';
import img6 from '../../../img/product_details/6.jpg';



class Carousel extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }



    render() {
        return (
            <>

                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block" src={img1} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block" src={img2} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block" src={img3} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block" src={img4} alt="Third slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block" src={img5} alt="Third slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block" src={img6} alt="Third slide" />
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                        data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                        data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>

                    <div className="container carousel-indicators-footer">
                        <div className="row carousel-indicators">
                            <div className="item">
                                <img src={img1} alt={img1} className="img-fluid"
                                    data-target="#carouselExampleIndicators" data-slide-to="0" />
                            </div>
                            <div className="item">
                                <img src={img2} alt={img2} className="img-fluid"
                                    data-target="#carouselExampleIndicators" data-slide-to="1" />
                            </div>
                            <div className="item">
                                <img src={img3} alt={img3} className="img-fluid"
                                    data-target="#carouselExampleIndicators" data-slide-to="2" />
                            </div>
                            <div className="item">
                                <img src={img4} alt={img4} className="img-fluid"
                                    data-target="#carouselExampleIndicators" data-slide-to="3" />
                            </div>
                            <div className="item">
                                <img src={img5} alt={img5} className="img-fluid"
                                    data-target="#carouselExampleIndicators" data-slide-to="4" />
                            </div>
                            <div className="item">
                                <img src={img6} alt={img6} className="img-fluid"
                                    data-target="#carouselExampleIndicators" data-slide-to="5" />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Carousel
