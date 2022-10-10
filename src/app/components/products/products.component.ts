import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';

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
  limit = 10
  offset = 0


  constructor(
    private storeService: StoreService,
    private productService: ProductService
    ) { 
    this.myShoppingCart = this.storeService.getShoppingCart()
  }

  ngOnInit(): void {
    this.loadMore();
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

  updateProduct(){
    const changes: UpdateProductDTO ={
      title: 'cambio de titulo'
    }

    const id = this.productChosen.id;

    this.productService.update(id,changes).subscribe(data=>{
      const productIndex = this.products.findIndex(item=> item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productService.delete(id).subscribe(()=>{
      const productIndex = this.products.findIndex(item=> item.id === this.productChosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    });
  }

  loadMore(){
    this.productService.getProductsByPage(this.limit, this.offset).subscribe(data=>{
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
