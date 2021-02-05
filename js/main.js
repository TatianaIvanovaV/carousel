'use strict'

import SliderCarousel from './SliderCarousel.js'

const opotions = {
  main: '.slider__wrapper',
  wrap: '.slider__list',
  arrows: true,
  dots: false,
  infinity: true,
  responsive: [
    {
      breakpoint: 1281,
      slidesToShow: 4,
      arrows: true,
      dots: false,
    },
      {
        breakpoint: 601,
        slidesToShow: 2,
        arrows: false,
        dots: true,
      },
      {
        breakpoint: 321,
        slidesToShow: 1,
        arrows: false,
        dots: true,
      },
  ]    
}

const carousel = new SliderCarousel(opotions);
  
carousel.init();