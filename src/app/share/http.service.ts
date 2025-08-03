import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http : HttpClient) { }

  addCar(Car:any):Observable<any>{
 
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    return this.http.post('https://upbeat-ganguly.185-229-111-17.plesk.page/api/Cars/addCar',Car,{headers, responseType:'text'})
}
  getAllCars(){
    return this.http.get('https://upbeat-ganguly.185-229-111-17.plesk.page/api/Cars/cars')
  }
  editCar(id:any,car:any){
    const headers= new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    return this.http.put(`https://upbeat-ganguly.185-229-111-17.plesk.page/api/Cars/updateCar/${id}`,car, {headers,responseType:'text'})
  }
  deleteCar(index:any){
    return this.http.delete(`https://upbeat-ganguly.185-229-111-17.plesk.page/api/Cars/deleteCar/${index}`)
  }
  getCarById(id:any){
    return this.http.get(`https://upbeat-ganguly.185-229-111-17.plesk.page/api/Cars/${id}`)
  }
  brendSearch(event:any): Observable<any>{
    return this.http.get(`https://upbeat-ganguly.185-229-111-17.plesk.page/api/Cars/brand?brand=${event}`)
  }
  yearSearch(year:any){
    return this.http.get(`https://upbeat-ganguly.185-229-111-17.plesk.page/api/Cars/year?year=${year}`)
  }
}