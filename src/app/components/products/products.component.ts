import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO } from 'src/app/models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total =  0;
  products: Product[] = [];
  showProductDetail = false;
  today = new Date();
  date = new Date(2022, 8, 29);
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: '',
  }


  constructor(
    private storeService: StoreService,
    private productService: ProductService
    ) { 
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.productService.getAllProducts()
      .subscribe(data=>{
        this.products = data;
      });
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productService.getProduct(id)
    .subscribe(data =>{
      this.toggleProductDetail();
      this.productChosen = data;
    });
      
  }

  createNewProduct(){
    const product: CreateProductDTO={
      title: 'nuevo producto',
      description: 'blabla',
      images: ['https://placeimg.com/640/480/any?random=$%7BMath.random()%7D'],
      price: 1000,
      categoryId: 2,
    }
    
    this.productService.create(product).subscribe(data =>{
      this.products.unshift(data);
    });
  }

}
