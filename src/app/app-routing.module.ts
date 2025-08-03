import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AddcarComponent } from './addcar/addcar.component';
import { CarComponent} from './car/car.component';
import { AllcarComponent } from './allcar/allcar.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'cars',component:AllcarComponent},
  {path:'cars/:id',component:CarComponent},
  {path:'contact',component:ContactComponent},
  {path:'login',component:LoginComponent},
  {path:'addcar',component:AddcarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
