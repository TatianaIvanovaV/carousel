'use strict'
class SliderCarousel{
  constructor({ 
    main, 
    wrap, 
    next, 
    prev,
    margin = 20,
    infinity = false,
    position = 0, 
    slidesToShow = 4, 
  }){
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.items = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      margin,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.items.length - this.slidesToShow,
    }; 
  }
  init(){
    //console.log(this.items)
    this.addClass();
    this.addStyle();

    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
  }
  addClass() {
    this.main.classList.add('carousel-wrap');
    this.wrap.classList.add('carousel-list');
    for (const item of this.items) {
      item.classList.add('carousel-children');
    }
  }
  addStyle() {
    const style = document.createElement('style');
    style.id = 'carousel-style';
    style.textContent = `
      .carousel-children {
        flex: 0 0 ${this.options.widthSlide}%  !important;
        padding: 0 ${this.options.margin}px ;
      } 
    `
    document.head.appendChild(style);
  }
  controlSlider() {
    this.prev.addEventListener("click", this.prevSlider.bind(this));
    this.next.addEventListener("click", this.nextSlider.bind(this));
  }
  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;

      if (this.options.position < 0) {
        this.options.position = this.options.maxPosition;
      }

      /*console.log(this.options.position);
      if (this.dotArray) {
        this.currentDot(this.options.position);
      }*/

      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }
  nextSlider() {
    if (
      this.options.infinity ||
      this.options.position < this.options.maxPosition
    ) {
      ++this.options.position;

      if (this.options.position > this.options.maxPosition) {
        this.options.position = 0;
      }
      /*console.log(this.options.position);
      if (this.dotArray) {
        this.currentDot(this.options.position);
      }*/

      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }
  addArrow() {
    this.next = document.createElement('div');
    this.prev = document.createElement('div');

    this.next.className = 'carousel-button__next';
    this.prev.className = 'carousel-button__prev';

    this.main.appendChild(this.prev);
    this.main.appendChild(this.next);
  }
}
export default SliderCarousel;