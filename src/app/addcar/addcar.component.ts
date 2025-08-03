import { Component, input } from '@angular/core';
import { Car } from '../share/car';
import { HttpService } from '../share/http.service';

@Component({
  selector: 'app-addcar',
  standalone: false,
  templateUrl: './addcar.component.html',
  styleUrl: './addcar.component.css'
})
export class AddcarComponent {
  constructor(private service:HttpService){
    
  }
  public carId!:number;
  public addCar:Car=new Car();
  public editt='Edit Car';
  public idCar:any = [] 
  // input(){
    
  //   if(!this.addCar){
  //     this.isVisable=true
  //   }
  //   else{
  //     this.isVisable=false
  //   }
  // }
  hasInput(): boolean {
  return Object.values(this.addCar).some(value => value && value.toString().trim() !== '');
}

  save(){
    this.service.addCar(this.addCar).subscribe(data => console.log(data))
    this.addCar =new Car();
  }
    isVisible = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    if(this.isVisible){
      this.editt='Add Car';
    }
    else{
      this.editt='Edit Car';
    }
  }
  edit(){
    this.service.editCar(this.carId,this.addCar).subscribe(data => console.log(data))
    this.addCar=new Car();
  }
  visable = false;
  
  getCarId(){
    this.visable = !this.visable
    this.service.getCarById(this.carId).subscribe((data:any) =>{
       this.idCar = data
       this.addCar = data
        })
    
  }
  public deleted = false
  delete(){
    this.visable=false
    this.service.deleteCar(this.carId).subscribe((data:any) => {console.log(data)
      this.deleted = true
    } )
    
  }
}


