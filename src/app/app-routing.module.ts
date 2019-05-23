import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule',canActivate:[AuthGuard] },
  { path: 'form-details', loadChildren: './pages/form-details/form-details.module#FormDetailsPageModule',canActivate:[AuthGuard] },  { path: 'formulario-egreso', loadChildren: './pages/formulario-egreso/formulario-egreso.module#FormularioEgresoPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
