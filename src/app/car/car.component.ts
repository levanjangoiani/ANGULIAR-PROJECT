import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../share/http.service';

@Component({
  selector: 'app-car',
  standalone: false,
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {
  public car!:any
  public sendCar:any[]=[]
  public number:number=555207240
  constructor(private route: ActivatedRoute, private service: HttpService) {
    this.getCaR()
  }
  getCaR(){
    this.car=this.route.snapshot.paramMap.get('id')
    this.service.getCarById(this.car).subscribe(data => this.sendCar.push(data))
    console.log(this.sendCar)
  }
}
