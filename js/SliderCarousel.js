'use strict'
class SliderCarousel{
  constructor({ 
    main, 
    wrap, 
    arrows = true,
    infinity = false,
    dots = false,
    position = 0, 
    slidesToShow = 4, 
    responsive = [],
  }){
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.items = document.querySelector(wrap).children;
    this.slidesToShow = slidesToShow;
    this.options = {
      arrows,
      dots,
      position,
      infinity,
      widthSlide: Math.floor(100 / this.slidesToShow), 
      maxPosition: this.items.length - 1,
    }; 
    this.responsive = responsive;
  }
  init(){
    this.addClass();
    this.addStyle();
    
    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
    if ( this.responsive ) {
      this.responsiveInit();
    }
  }

/*----------------------------------swipe------------------------------------------*/


/*---------------------------------------------------------------------------------*/


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
      .slider__wrap {
        padding: 0 ${this.options.padding}px;
      }
      .carousel-children {
        flex: 0 0 ${this.options.widthSlide}% !important;
        
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
    if (this.options.arrows) {
      this.next = document.createElement('div');
      this.prev = document.createElement('div');

      this.next.className = 'carousel-button__next';
      this.prev.className = 'carousel-button__prev';

      this.main.appendChild(this.prev);
      this.main.appendChild(this.next);
      this.controlSlider();
    } else {
      this.next.remove(this.next);
      this.prev.remove(this.prev);
    }
  }
  addDots() {
    if (this.options.dots) {
      this.dots = document.createElement('div');
      this.dots.className = 'carousel__dots';
      this.main.appendChild(this.dots);
      this.dotsNav();
    } else {
      this.dots.remove(this.dots)
      //this.dots.parentElement.removeChild(this.dots)
    }
  }
  dotsNav() {
      this.dotArray = [];
      for (let i = 0; i < this.items.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("carousel__dot");
        this.dots.appendChild(dot);
        if (i == 0) {
          dot.className += " carousel__dot_active";
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

  currentSlide(index) {
    this.wrap.style.transform = `translateX(-${
      index * this.options.widthSlide
    }%)`;
    this.currentDot(index);
  }

  currentDot(index) {
    for (let dot of this.dotArray) {
      dot.classList.remove("carousel__dot_active");
    }
    this.dotArray[index].classList.add("carousel__dot_active");
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
            if (this.options.dots != this.responsive[i].dots) {
              this.options.dots = this.responsive[i].dots;
              this.addDots()
            }
            if (this.options.arrows != this.responsive[i].arrows) {
              this.options.arrows = this.responsive[i].arrows;
              this.addArrow();
            }
            
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
            
          } 
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        this.options.dots = false;
        this.options.arrows = false;
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyle();
      }
    };
    checkResponse();
    
    window.addEventListener('resize', checkResponse);
   
  }
}
export default SliderCarousel;