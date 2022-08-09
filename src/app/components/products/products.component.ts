import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [    
    {
      id: '1',
      name: 'Producto1',
      image: './assets/images/casualwear.svg',
      price: 100
    },
    {
      id: '2',
      name: 'Producto2',
      image: './assets/images/casualcamisilla.svg',
      price: 100
    },
    {
      id: '3',
      name: 'Producto3',
      image: './assets/images/casualpolo.svg',
      price: 100
    },
    {
      id: '4',
      name: 'Producto4',
      image: './assets/images/casualbuso.svg',
      price: 100
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
