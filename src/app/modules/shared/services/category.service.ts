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

    return this.http.get(endPoint)

  }
}
