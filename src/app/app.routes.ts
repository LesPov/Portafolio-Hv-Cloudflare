import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivateWarningGuard } from './componets/foldersbloks/can-activate-warning.guard';

export const routes: Routes = [
    { path: 'sobremi', loadComponent: () => import('./componets/sobremi/sobremi.component').then(m => m.SobremiComponent) },
    { path: 'resumen', loadComponent: () => import('./componets/resumen/resumen.component').then(m => m.ResumenComponent) },
    { path: 'proyecto', loadComponent: () => import('./componets/proyect/proyect.component').then(m => m.ProyectComponent) },
    { path: 'blog', loadComponent: () => import('./componets/blog/blog.component').then(m => m.BlogComponent), canActivate: [CanActivateWarningGuard] },
    { path: 'contacto', loadComponent: () => import('./componets/contact/contact.component').then(m => m.ContactComponent) },
    { path: '', redirectTo: '/sobremi', pathMatch: 'full' },
    { path: '**', redirectTo: '/sobremi' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
