'use strict'
class SliderCarousel{
  constructor({ 
    main, 
    wrap, 
    next, 
    prev,
    margin = 20,
    infinity = false,
    dots = false,
    position = 0, 
    slidesToShow = 4, 
    responsive = [],
  }){
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.items = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.dots = document.querySelector(dots);
    this.options = {
      position,
      infinity,
      margin,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.items.length - this.slidesToShow,
    }; 
    this.responsive = responsive;
  }
  init(){
    this.addClass();
    this.addStyle();
    
    if (this.prev && this.next) {
      
      this.controlSlider();
    } else {
      this.addDots();
      this.addArrow();
      this.controlSlider();
    }

    

    if ( this.responsive ) {
    this.responsiveInit()}
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
        
      }
      .carousel-children {
        flex: 0 0 ${this.options.widthSlide}% !important;
        /*mardin: 0 -${this.options.margin}px;*/
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

      console.log(this.options.position);
      if (this.dotArray) {
        this.currentDot(this.options.position);
      }

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
      console.log(this.options.position);
      if (this.dotArray) {
        this.currentDot(this.options.position);
      }

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
  addDots() {
    if (this.dots) {
      this.dots = document.createElement('div');
      this.dots.className = 'carousel-dots';
      this.main.appendChild(this.dots);
      this.dotArray = [];
      for (let i = 0; i < this.items.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("carousel-dot");
        this.dots.appendChild(dot);
        if (i == 0) {
          dot.className += " carousel-dot_active";
        }
        this.dotArray.push(dot);
      }

      this.dotArray.forEach((item, index) => {
        item.addEventListener("click", () => {
          this.options.position = index;
          console.log(index);
          this.currentSlide(this.options.position);
        });
      });
    }
    
  } 

  currentSlide(index) {
    this.wrap.style.transform = `translateX(-${
      index * this.options.widthSlide
    }%)`;
    this.currentDot(index);
  }

  currentDot(index) {
    for (let dot of this.dotArray) {
      dot.classList.remove("carousel-dot_active");
    }
    this.dotArray[index].classList.add("carousel-dot_active");
  }

  responsiveInit() {
    const slidesToShowDefault = this.slidesToShow; 
    const allResponse = this.responsive.map(item => item.breakpoint);
    const maxResponse = Math.max(...allResponse);

    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;

      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++) {
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
          } 
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyle();
      }
    };
    checkResponse();

    window.addEventListener('resize', checkResponse)
  }
}
export default SliderCarousel;