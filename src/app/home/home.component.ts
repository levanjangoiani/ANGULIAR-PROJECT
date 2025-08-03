import { Component } from '@angular/core';
import { HttpService } from '../share/http.service';
import {  Router } from '@angular/router';
import { cars } from '../info/info';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    host: {
    "(window:resize)":"onWindowResize($event)"
  }
})
export class HomeComponent {

   public selectedCars:any[]=[];
  public currentIndex = 1;
  public allCar:any=[]
  public brand!:any
  public cars:any[]=[]
  public perCar!:number;
  public pages!:number
    
   constructor(
    private service:HttpService,
     private Router: Router  ){

   this.service.getAllCars().subscribe((data:any) => {
    
        this.cars=data
        for(let i=this.cars.length-1; i >= this.cars.length-20; i--){
          this.selectedCars.push(this.cars[i])
        }
      this.currentIndex = 0;
      this.allCar=data.brand
      console.log(this.selectedCars)
    });
    this.onWindowResize()
}

 onWindowResize(){
    if(window.innerWidth <= 718){
      this.perCar = 1
       
    }
    else if(window.innerWidth <= 1435 && window.innerWidth >= 1081){
      this.perCar = 3;
      
    }
    else if(window.innerWidth <= 1080 && window.innerWidth >= 720){
      this.perCar = 2;
      
    }
    else{
      this.perCar = 4;
      
    }
  };

next() {
    if (this.currentIndex + this.perCar < this.selectedCars.length) {
      this.currentIndex += this.perCar;
    }
    
  }

  prev() {
    if (this.currentIndex - this.perCar >= 0) {
      this.currentIndex -= this.perCar;
      
    }
    else{
      this.currentIndex = 0
    }
    console.log(this.currentIndex - this.perCar)
  }

  get visibleCars() {
    return this.selectedCars.slice(this.currentIndex, this.currentIndex + this.perCar);
  }
  public brands!:any
    brandChange(event:any){
     this.brands = event.target.value
  }
  carBrandFill (){
  this.service.getAllCars().subscribe((data:any)=>{
    this.brand= data.filter((car:any) => car.brand === this.brand);
  });
}

 }