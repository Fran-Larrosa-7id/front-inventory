import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http:HttpClient) { }

// Get categorries

  getCategories(){
    
    const endPoint = `${baseUrl}/categories`;

    return this.http.get(endPoint);

  }

  // POST CATEGORY
  saveCategory(body:any){
    const endPoint = `${baseUrl}/categories`;
    return this.http.post(endPoint,body);
  }


  // PUT category
  updateCategory(body:any,id:any){
    const endPoint = `${baseUrl}/categories/${id}`;
    return this.http.put(endPoint,body);
  }
  // delete category
  deleteCategory(id:any){
    const endPoint = `${baseUrl}/categories/${id}`;
    return this.http.delete(endPoint);
  }

  // search category
  getCategoryById(id:any){
    const endPoint = `${baseUrl}/categories/${id}`;
    return this.http.get(endPoint);
  }

  

}
