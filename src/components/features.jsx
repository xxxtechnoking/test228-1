import React, { useCallback, useState, useEffect } from "react";
import "@brainhubeu/react-carousel/lib/style.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import useWinSize from "../util/useWinSize"

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper-bundle.css";
import { Pagination, EffectCoverflow, Autoplay, EffectCube } from "swiper";

export const Features = (props) => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  const items = [
    <img src="img/nftimages/1.png" alt="pic"></img>,
    <img src="img/nftimages/11.png" alt="pic"></img>,
    <img src="img/nftimages/12.png" alt="pic"></img>,
    <img src="img/nftimages/10.png" alt="pic"></img>,
    <img src="img/nftimages/13.png" alt="pic"></img>,
    <img src="img/nftimages/14.png" alt="pic"></img>,
    <img src="img/nftimages/15.png" alt="pic"></img>,
    <img src="img/nftimages/16.png" alt="pic"></img>,
    <img src="img/nftimages/17.png" alt="pic"></img>,
    <img src="img/nftimages/18.png" alt="pic"></img>,
    <img src="img/nftimages/19.png" alt="pic"></img>,
    <img src="img/nftimages/2.png" alt="pic"></img>,
    <img src="img/nftimages/20.png" alt="pic"></img>,
    <img src="img/nftimages/3.png" alt="pic"></img>,
    <img src="img/nftimages/4.png" alt="pic"></img>,
    <img src="img/nftimages/5.png" alt="pic"></img>,
    <img src="img/nftimages/6.png" alt="pic"></img>,
    <img src="img/nftimages/7.png" alt="pic"></img>,
    <img src="img/nftimages/8.png" alt="pic"></img>,
    <img src="img/nftimages/9.png" alt="pic"></img>,
  ];

  const size = useWinSize();
  return (
    <div id="features" className="text-center">
      {/* <div className="features_item">
        <AliceCarousel
          autoPlay
          autoPlayDirection="rtl"
          // autoPlayStrategy="none"
          autoPlayInterval={800}
          animationDuration={800}
          items={items}
          responsive={responsive}
          touchTracking={false}
          disableDotsControls
          disableButtonsControls
          infinite={true}
        />
      </div> */}

      {/* <div>
        <AliceCarousel
          autoPlay
          // autoPlayStrategy="none"
          autoPlayInterval={800}
          animationDuration={800}
          items={items}
          responsive={responsive}
          touchTracking={false}
          disableDotsControls
          disableButtonsControls
        />
      </div> */}

      <div>
        <div className="showcube">
          <Swiper
            effect={"cube"}
            cubeEffect={{
              shadow: true,
              slideShadows: true,
              shadowOffset: 20,
              shadowScale: 0.94,
            }}
            modules={[EffectCube, Pagination, Autoplay]}
            className="mySwiper_cube"
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/11.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/12.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/10.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/13.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/14.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/15.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/16.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/17.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/18.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_cube">
              <img
                src="img/nftimages/19.png"
                alt=""
                className="mySwiper_cube_img"
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="showcoverflow">
          <Swiper
            effect={"coverflow"}
            slidesPerView={5}
            spaceBetween={60}
            modules={[Pagination, EffectCoverflow, Autoplay]}
            className="mySwiper_coverflow"
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            }}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/11.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/12.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
             
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/10.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/13.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/14.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/15.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/16.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/17.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/18.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
            <SwiperSlide className="mySwiper_coverflow">
              <img
                src="img/nftimages/19.png"
                alt=""
                className="mySwiper_coverflow_img"
              ></img>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
