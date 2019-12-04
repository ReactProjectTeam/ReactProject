import React, { Component } from 'react'

import img1 from '../../img/product_details/1.jpg';
import img2 from '../../img/product_details/2.jpg';
import img3 from '../../img/product_details/3.jpg';
import img4 from '../../img/product_details/4.jpg';
import img5 from '../../img/product_details/5.jpg';
import img6 from '../../img/product_details/6.jpg';


import product_number_of_views from '../../img/product_details/product_number_of_views.png';
import product_update_date from '../../img/product_details/product_update_date.png';

import phone from '../../img/product_details/phone.png';
import editImg from '../../img/product_details/edit.svg';
import deleteImg from '../../img/product_details/delete.svg';


// import Carousel from '../Product_details/Carousel'

// import Swiper from './SwiperTest'

import DemoCarousel from "./ReactCarousel"


class Product_details extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        return (
            <>
               



                <section id="product_details">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="product_details_images">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* <!-- Carousel Start --> */}

                                                <DemoCarousel/>

                                            {/* <!-- Carousel End --> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product_details_info">
                                    <header>
                                        <h3>Ayaqqabi</h3>
                                        <button className="btn">Yeni</button>
                                    </header>
                                    <div className="lot_info">
                                        <div className="product_number_of_views">
                                            <img src={product_number_of_views} alt="" />
                                            <p>Baxışların sayı: <span>29</span></p>
                                        </div>
                                        <div className="product_update_date">
                                            <img src={product_update_date} alt="" />
                                            <p>Yeniləndi: <span>26 noyabr 2019</span></p>
                                        </div>
                                    </div>

                                    <div className="product_details_categories">
                                        <ul className="product_details_categories_left">
                                            <li>Şəhər</li>
                                            <li>Geyim tipi</li>
                                            <li>Geyim növü</li>
                                        </ul>
                                        <ul className="product_details_categories_right">
                                            <li>Bakı</li>
                                            <li>Kişi geyimləri</li>
                                            <li>Ayaqqabılar</li>
                                        </ul>
                                    </div>
                                    <div className="product_details_description">
                                        <p>Məşhur BATA firmasının botinkasıdır. Təzədir və ümumiyyətlə geyilməyib. Ölçüsü 44
                                və vaxtı ilə 199 Azn alınıb, istifadə olunmadığı üçün hədiyyə verirem imkanı olmuyan şəxslərə. Bunnan əlavə yenə başqa geyimlərdə var olarda hal-hazırda istifadə olunmur.</p>
                                    </div>
                                    <div className="product_details_author_and_change">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="product_details_author">
                                                    <div className="product_details_author_left">
                                                        <div className="product_details_author_phone_number">
                                                            <a href="tel:+994502782268">+994502782268</a>
                                                        </div>
                                                        <div className="product_details_author_name">
                                                            <p>Anar</p>
                                                        </div>
                                                    </div>
                                                    <div className="product_details_author_right">
                                                        <img src={phone} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="product_details_change">

                                                    <div className="product_details_change_edit">
                                                        <a href="/">
                                                            <img src={editImg} alt="" />
                                                            <p>Düzəliş et</p>
                                                        </a>
                                                    </div>
                                                    <div className="product_details_change_delete">
                                                        <a href="/">
                                                            <img src={deleteImg} alt="" />
                                                            <p>Elanı sil</p>
                                                        </a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>





                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Product_details;
