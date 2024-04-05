import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanvasDrawingComponent } from './canvas-drawing/canvas-drawing.component';

const routes: Routes = [
  { path: '', component: CanvasDrawingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
