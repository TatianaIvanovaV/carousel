'use strict'
import SliderCarousel from './SliderCarousel.js'
const opotions = {
  main: '.slider__wrapper',
  wrap: '.slider__list'
}
const carousel = new SliderCarousel(opotions);
  
carousel.init();