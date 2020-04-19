import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinechartComponent } from './linechart/linechart.component';
import { HalfpiechartComponent } from './halfpiechart/halfpiechart.component';


const routes: Routes = [
  {
    path: 'linechart', component: LinechartComponent
  },
  {
    path: 'halfpiechart', component: HalfpiechartComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
