import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.API_URL}/api/products/`;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string){
    return this.http.get<Product>(this.apiUrl+id);
  }

  getProductsByPage(pLimit: number, pOffset: number){  
    const limit = pLimit.toString();
    const offset = pOffset.toString();
    
    return this.http.get<Product[]>(this.apiUrl,{
      params: {limit,offset}
    })
    .pipe(
      retry(3)
    );
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto);  
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(this.apiUrl+id, dto);  
  }

  delete(id: string){
    return this.http.delete<boolean>(this.apiUrl+id);
  }

}
