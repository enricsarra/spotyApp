import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  // private tocken: any;

  constructor( private http: HttpClient) {

   }

   /* getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;
    const headers =  new HttpHeaders({
      'Authorization' : 'Bearer BQCveyq8-CibvXptsKkBQ5jP2-buNRRgWUUOglFM0d3V83FlM08nfSQi_hafm5TMQ9oe5Jyyj0pxJvZluag'
    });
    return this.http.get(url, { headers });
   } */

   getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;
    const headers =  new HttpHeaders({
      'Authorization' : sessionStorage.getItem('token')
    });
    return this.http.get(url, { headers });
   }


   getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
               .pipe(  map(data => data['albums'].items) )

   }

   getArtistas( termino: string ) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
               // tslint:disable-next-line: no-string-literal
               .pipe(  map(data => data['artists'].items) )
   }

   getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`)
   }

   getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks'] ));
   }

  getToken(): any {
    return this.http.get("https://spotiapp-get-token.herokuapp.com/spotifytoken").pipe(
      map((data: any) => {
        sessionStorage.setItem('token', `Bearer ${data.access_token}`);
      })
    );
  }



}
