import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];
  loadingArtist: boolean;

  constructor( private router: ActivatedRoute,
               private spotify: SpotifyService) {

    this.router.params.subscribe( params => {
      this.loadingArtist = true;
      // console.log('params: ', params);
      // console.log('parametro id ---->', params['id']);
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }
  getArtista( id: string ) {
       this.loadingArtist = true;
       this.spotify.getArtista( id )
            .subscribe( artista => {
             this.artista = artista;
             this.loadingArtist = false;
            });
  }

  getTopTracks( id: string) {
    this.spotify.getTopTracks( id )
        .subscribe( topTracks => {
          // console.log('topTracks es: ', topTracks);
          this.topTracks = topTracks;
        });  }



  ngOnInit() {
  }

}
