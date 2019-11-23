class Slide {
  constructor(element) {
    this.image = element.querySelector('.slide__image');
    this.text = element.querySelector('.slide__text');
  }

  show() {
    this.image.classList.add('visible');
    this.text.classList.add('visible');
  }

  hide() {
    this.image.classList.remove('visible');
    this.text.classList.remove('visible');
  }
}

class Slider {
  slides = [];
  currentSlide = -1;

  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.init();
  }

  init(slidesSelectors) {
    const sliderElements = this.container.querySelectorAll('.slide');
    for (const element of sliderElements) {
      this.addSlide(element);
    }

    this.playButton = this.container.querySelector('.controls .play');
    this.pauseButton = this.container.querySelector('.controls .pause');
    this.nextButton = this.container.querySelector('.controls .next');
    this.previousButton = this.container.querySelector('.controls .previous');

    this.playButton.addEventListener('click', () => {
      this.play();
    });

    this.pauseButton.addEventListener('click', () => {
      this.pause();
    });

    this.nextButton.addEventListener('click', () => {
      this.pause();
      this.next();
      this.play();
    });

    this.previousButton.addEventListener('click', () => {
      this.pause();
      this.previous();
      this.play();
    });
  }

  start() {
    this.next();
    this.play();
  }

  play() {
    this.timer = setInterval(() => {
      this.next();
    }, 3000);
  }

  pause() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  next() {
    if (this.currentSlide >= 0) {
      this.slides[this.currentSlide].hide();
    }

    let next;
    if (this.currentSlide === this.slides.length - 1) {
      next = 0;
    }
    else {
      next = this.currentSlide + 1;
    }

    this.slides[next].show();

    this.currentSlide = next;
  }

  previous() {
    if (this.currentSlide >= 0) {
      this.slides[this.currentSlide].hide();
    }

    let next;
    if (this.currentSlide <= 0) {
      next = this.slides.length - 1;
    }
    else {
      next = this.currentSlide - 1;
    }

    this.slides[next].show();

    this.currentSlide = next;
  }

  addSlide(element) {
    const slide = new Slide(element);
    this.slides.push(slide);
  }
}

const slider = new Slider('.slider');
slider.start();