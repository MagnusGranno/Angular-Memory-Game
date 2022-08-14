import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: '', redirectTo: 'Easy', pathMatch: 'full' },
  { path: 'Easy', component: BoardComponent },
  { path: 'Medium', component: BoardComponent },
  { path: 'Hard', component: BoardComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
