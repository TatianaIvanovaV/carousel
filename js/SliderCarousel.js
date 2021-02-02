'use strict'
class SliderCarousel{
  constructor({ main, wrap, position = 0 }){
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.items = document.querySelector(wrap).children;
    this.options = {
      position
    };
  }
  init(){
    //console.log(this.items)
    this.addClass();
    this.addStyle();
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
      .carousel-wrap {
        overflow: hidden !important;
      }
      .carousel-list {
        display: flex !important;
        transition: transform .5ms !important;
        will-change: transform !important;
      }
      .carousel-children {
        flex: 0 0 25% !important;
        margin: 0 auto !important;
      }
    `
    document.head.appendChild(style);
  }
}
export default SliderCarousel;