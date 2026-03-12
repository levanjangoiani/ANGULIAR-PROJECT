
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../share/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-allcar',
  imports: [CommonModule, FormsModule,RouterModule ],
  templateUrl: './allcar.component.html',
  styleUrls: ['./allcar.component.css']
})
export class AllcarComponent implements OnInit {
  public allCars: any[] = [];
  public brands: any = [];
  public rowYear: any = [];

  public selectedBrand: string = '';
  public selectedYear: number | null = null;

  public pagedCars: any[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 20;
  public isVisible: boolean = false;

  constructor(private service: HttpService) {}

  ngOnInit() {
    this.seeAll();
  }

  seeAll() {
    this.service.getAllCars().subscribe((data: any) => {
      this.allCars = data;
      this.setPagedCars();

      // ბრენდების ჩამონათვალი
      this.brands = [...new Set(data.map((car: any) => car.brand))];

      // წლების ჩამონათვალი
      const years = [...new Set(data.map((car: any) => car.year))] as number[];
      this.rowYear = years.sort((a, b) => b - a);

    });
  }

  onBrandChange() {
  if (this.selectedBrand) {
    
    const years = this.allCars
      .filter((car: any) => car.brand === this.selectedBrand)
      .map((car: any) => Number(car.year));

    
    this.rowYear = [...new Set(years)].sort((a, b) => b - a);

    this.selectedYear = null;
  }
}


  yearChange(event: any) {
    this.selectedYear = Number(event.target.value);
  }

  search() {
    this.isVisible = true;

    if (this.selectedBrand && !this.selectedYear) {
      this.service.brendSearch(this.selectedBrand).subscribe((data: any) => {
        this.allCars = data;
        this.setPagedCars();
      });
    } else if (this.selectedYear && !this.selectedBrand) {
      this.service.yearSearch(this.selectedYear).subscribe((data: any) => {
        this.allCars = data;
        this.setPagedCars();
      });
    } else if (this.selectedBrand && this.selectedYear) {
      this.service.getAllCars().subscribe((data: any) => {
    this.allCars = data.filter((car: any) =>
      car.brand === this.selectedBrand && car.year === this.selectedYear
    );
    this.setPagedCars();
  });

      
    } else {
      this.seeAll();
    }
  }

  clear() {
    this.selectedBrand = '';
    this.selectedYear = null;
    this.rowYear = [];
    this.isVisible = false;
    this.seeAll();
  }

  setPagedCars() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedCars = this.allCars.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.allCars.length) {
      this.currentPage++;
      this.setPagedCars();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedCars();
    }
  }
}
