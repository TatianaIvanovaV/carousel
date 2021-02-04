'use strict'

import SliderCarousel from './SliderCarousel.js'

const opotions = {
  main: '.slider__wrapper',
  wrap: '.slider__list',
  infinity: true,
  dots: true,
  responsive: [
      {
        breakpoint: 600,
        slidesToShow: 2,
        //dots: true,
      },
      {
        breakpoint: 300,
        slidesToShow: 1,
        //dots: true,
      },
  ]    
}

const carousel = new SliderCarousel(opotions);
  
carousel.init();