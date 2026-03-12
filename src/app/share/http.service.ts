import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getYearsByBrand(selectedBrand: string) {
    throw new Error('Method not implemented.');
  }
  // private baseUrl = 'https://localhost:7145/api/Cars';
  private baseUrl = 'https://car-backend-ejn7.onrender.com/api/Cars';
  
  constructor(private http : HttpClient) { }

  addCar(Car:any):Observable<any>{
 
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    return this.http.post(`${this.baseUrl}/addCar`,Car,{headers, responseType:'text'})
}
  getAllCars(){
    return this.http.get(`${this.baseUrl}/cars`)
  }
  editCar(id:any,car:any){
    const headers= new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    return this.http.put(`${this.baseUrl}/updateCar/${id}`,car, {headers,responseType:'text'})
  }
  deleteCar(index:any){
    return this.http.delete(`${this.baseUrl}/deleteCar/${index}`)
  }
  getCarById(id:any){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  brendSearch(event:any): Observable<any>{
    return this.http.get(`${this.baseUrl}/brand?brand=${event}`)
  }
  yearSearch(year:any){
    return this.http.get(`${this.baseUrl}/year?year=${year}`)
  }
}