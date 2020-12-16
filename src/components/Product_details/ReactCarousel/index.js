import React, { Component,useEffect,useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductCarousel = (props) => {
  const { img } = props;
    const [images, setImages] = useState([]);

    useEffect(() => {
        const imagesArr = [];
        img && img.map(item=>(
            imagesArr.push(
                {
                    original: item,
                    thumbnail: item,
                }
            )
        ))
        setImages(imagesArr)
    }, []);


  return (
    <>
      {/*<Carousel infiniteLoop={true} showThumbs={true}  transitionTime={1000}>*/}
      {/*    {img && img.map((item,index)=>{*/}
      {/*        return(*/}
      {/*            <div key={index} className="aaaaaaaaaaaaaa">*/}
      {/*                <img src={item} alt={item}/>*/}
      {/*            </div>*/}
      {/*        )*/}
      {/*    })}*/}
      {/*</Carousel>*/}
        <ImageGallery items={images} />
    </>
  );
};

export default ProductCarousel;
