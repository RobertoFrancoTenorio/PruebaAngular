import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistroComponent } from './components/create-registro/create-registro.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {path: '', component: ListComponent, pathMatch: 'full'},
  {path: 'list', component: ListComponent},
  {path: 'create-registro', component: CreateRegistroComponent},  
  {path: 'editRegistro/:id', component: CreateRegistroComponent},
  {path: '**', component: ListComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
