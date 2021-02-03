'use strict'

import SliderCarousel from './SliderCarousel.js'

const opotions = {
  main: '.slider__wrapper',
  wrap: '.slider__list',
  
  infinity: true,
  /**responsive: [
     {
       breakpoint: 600,
       settings: {
         slidesToShow: 3
       } */
}

const carousel = new SliderCarousel(opotions);
  
carousel.init();