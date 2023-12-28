import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  activeSlideIndex: number = 0;

  // Array of image paths for the carousel
  carouselImages = [
    {src:'https://images2.bovpg.net/fw/media/1/5/1/7/7/517759.jpg',alt:"1"},
    {src:'https://cf.bstatic.com/xdata/images/hotel/max1024x768/239379297.jpg?k=c48239733b29c9a5ec4d8c7ada4a809beb6d299997b532abec5571ba6dc8e66b&o=&hp=1',alt:"2"},
    {src:'https://cf.bstatic.com/xdata/images/hotel/max1280x900/86030516.jpg?k=21361ee9f3988c1c628c1a0914aa056ab56e2e848cf8a331fa283b101b876538&o=&hp=1',alt:"3"},
    {src:'https://cf.bstatic.com/xdata/images/hotel/max1280x900/86058515.jpg?k=1087022a69ecae46ab9adfd475bb1f16c6fe4e92e1721d8c840fea90f2a50be9&o=&hp=1',alt:"4"},
    {src:'https://cf.bstatic.com/xdata/images/hotel/max1280x900/86041252.jpg?k=134770d8dc3712a01e870d08e7e9789de7e37003fc5e302ff650aef5c2a4c2d4&o=&hp=1',alt:"5"},
  ];

  // Function to navigate to the previous slide
  prevSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  // Function to navigate to the next slide
  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.carouselImages.length;
  }
}
