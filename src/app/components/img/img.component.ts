import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges,AfterViewInit, OnDestroy {
  img: string = '';

  @Input('img') 
  set changeImg(newImg: string){
    this.img = newImg;
  }

  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/hunt.svg'

  constructor() { }

  ngOnChanges() {
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
  }  

  ngOnDestroy(): void {
    
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    console.log("loaded hijo");
    this.loaded.emit(this.img);
    
  }

}
