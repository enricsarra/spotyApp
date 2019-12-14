
 // URL del front: https://spotiappweb.herokuapp.com/#/home 
 // es la url de como obtener tocken automático
 // URL del backend: https://spotiapp-get-token.herokuapp.com/ 

import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensageError: string;

  /* constructor( private spotify: SpotifyService ) {
    this.spotify.getNewReleases()
      .subscribe(data => this.nuevasCanciones = data
      );
      this.loading = false;
  } */

  constructor( private spotify: SpotifyService ) {
    this.loading = true;
    this.error = false;
    if (!sessionStorage.getItem('token')) {
      this.getToken();
    } else {
      this.getNewReleases();
    }
      
  }

  ngOnInit() {
  }

  getToken() {
    this.spotify.getToken().subscribe(data => this.getNewReleases());
  }

  getNewReleases() {
    this.loading = true;
    this.spotify.getNewReleases()
      .subscribe(data => {
        this.nuevasCanciones = data;
        this.loading = false;
      }, ( errorServicio ) => {
            this.loading = false;
            this.error = true;
            console.log( errorServicio);
            this.mensageError = errorServicio.error.error.message;
      });
  }


}

// version 1
/* import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

    paises: any[] = [];
  constructor( private http: HttpClient ) { 
    this.http.get('https://restcountries.eu/rest/v2/lang/es')
          .subscribe( (resp:any) => {
            this.paises = resp;
            console.log(resp);
          });
  }

  ngOnInit() {
  }

}
 */
