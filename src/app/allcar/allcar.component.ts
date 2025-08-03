import { Component, IterableDiffers } from '@angular/core';
import { HttpService } from '../share/http.service';

@Component({
  selector: 'app-allcar',
  standalone: false,
  templateUrl: './allcar.component.html',
  styleUrl: './allcar.component.css'
})
export class AllcarComponent {
  public allCars:any[]=[]
  public brand!:any[]
   public year!:any
   public years!:any
  public rowYear:any[]=[]
  public filterYear:any[]=[]
  public filtermodel:any[]=[]
  public brands!:any
  public allbrand:any=[]
  public pagedCars!:any[]
  public currentPage:number =(1);
  public itemsPerPage:number=20;
  public model:any[]=[]
  public fillBrand:any[]=[]
  public result:number=0

  constructor(private service:HttpService){
   console.log(window.innerWidth)
    this.seeAll()
    
  }

  seeAll(){
    
     this.service.getAllCars().subscribe((data:any)=>{
      this.allCars=data
      this.setPagedCars()
      this.brand = [...new Set(data.map((car:any) => car.brand))];
      // this.model= [...new Set(data.map((car:any) => car.model))];
      this.year = [... new Set (data.map((car:any) => car.year)) ];
      this.rowYear = [...this.year].sort((a: any, b: any) => b - a);
     
     }
     
   )
   }

    brandChange(event:any){
     this.brands = event.target.value
    }
  yearChange(event:any){
    this.years = event.target.value
  }
isVisible = false
search(){
  console.log(`${this.years}`)
    this.isVisible=true
  if(this.brands == this.brands && this.year == 'Years'){
    this.service.brendSearch(this.brands).subscribe((data : any) =>{
      this.isVisible=true
      this.allCars = data;
      this.currentPage=1
      this.setPagedCars()
    })
  }
  else if(this.years == this.years && this.brands !== this.brand){
    console.log('aaaaaaa')
    this.service.yearSearch(this.years).subscribe((data : any) =>{
      console.log(data)
      this.brands = 'Brands'
      this.allCars = data;
      this.currentPage=1
      this.setPagedCars()
    })
  }
  else if(this.years == this.years && this.brands == this.brands){
    this.service.getAllCars().subscribe((data : any) => {
      this.allCars = data.filter((car: any) => {
    car.brand === this.brands && car.year === Number(this.year);
    });
    })
  }
}


clear(){
  this.isVisible=false
  this.seeAll()
  this.brands="brand";
  this.setPagedCars()
   
}

  setPagedCars(){
     let start = (this.currentPage - 1) * this.itemsPerPage;
    let end = start + this.itemsPerPage;
    this.pagedCars = this.allCars.slice(start, end);
  };

  nextPage(){
    if ((this.currentPage * this.itemsPerPage) < this.allCars.length) {
      this.currentPage++;
      this.setPagedCars();
    }
  };

  prevPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedCars();
    }
  };
}
