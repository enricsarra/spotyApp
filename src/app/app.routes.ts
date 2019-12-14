

/* no utilizamos:
import { RouterModule, Routes} from '@angular/router'; porque utilizaremos otra técnica más ordenada */

/* pasos:
1- importar solo Routes import { Routes} from '@angular/router';
2- De esta no utilizamos:
export const APP_ROUTING = RouterModule.forRoot( ROUTES );
3- ROUTES contiene de esta manera sólo las rutas que
utilizamos en nuestra app.
4- Modificamos app.module.ts para:
    - importar: import { } from '@angular/router';
    - importar: import { ROUTES } from './app.routes';
    - en 'imports' añadir: RouterModule.forRoot( ROUTES, { useHash: true } )
    -
*/




import { Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent} from './components/artista/artista.component';

export const ROUTES: Routes = [
{ path: 'home', component: HomeComponent },
{ path: 'search', component: SearchComponent },
{ path: 'artist/:id', component: ArtistaComponent },
{ path: '', pathMatch: 'full', redirectTo: 'home'},
{ path: '**', pathMatch: 'full', redirectTo: 'home'}
];
