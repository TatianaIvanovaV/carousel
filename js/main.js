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
      breakpoint: 1201,
      options: {
        slidesToShow: 4,
        arrows: true,
        dots: false,
      }
    },
    {
      breakpoint: 993,
      options: {
        slidesToShow: 3,
        arrows: true,
        dots: false,
      }
    },
    {
      breakpoint: 769,
      options: {
        slidesToShow: 2,
        arrows: false,
        dots: true,
      }
    },
    {
      breakpoint: 480,
      options: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
      } 
    },
  ]    
}

const carousel = new SliderCarousel(opotions);
  
carousel.init();