import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraphComponent } from './graph/graph.component';
import { TableComponent } from './table/table.component';
const routes: Routes = [
	{ path: '', redirectTo: '/graph', pathMatch: 'full' },
	{ path: 'graph', component: GraphComponent },
	{ path: 'table', component: TableComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
