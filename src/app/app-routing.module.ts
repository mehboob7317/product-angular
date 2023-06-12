import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/products', pathMatch: 'full'
  },
  {
    path: 'products', loadChildren: () => import('./modules/product/product.module').then((mod) => mod.ProductModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
