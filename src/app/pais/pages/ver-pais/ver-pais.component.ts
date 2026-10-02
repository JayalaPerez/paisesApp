import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PaisService } from '../../services/pais.service';
import { Country, CountryObject } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-ver-pais',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  pais!: CountryObject;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private paisService: PaisService
    
  ) { }

  // ngOnInit(): void {

  //   this.activatedRoute.params
  //     .pipe(
  //       switchMap( ({ id }) => this.paisService.verPaisPorCodigo( id ) ),
  //       map(resp => resp.data.objects[0]), 
  //       tap( console.log )
  //     )
  //     .subscribe( pais => this.pais = pais );

  //     // TODO: se puede hacer de otra manera, pero es más largo y menos eficiente.

  //   // this.activatedRoute.params
  //   //   .subscribe( ({ id }) => {
  //   //     console.log( id );

  //   //     this.paisService.verPaisPorCodigo( id )
  //   //       .subscribe( pais => {
  //   //         console.log( pais );
  //   //       });

  //   //   });
  // }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.paisService.verPaisPorCodigo( id ) ),
        tap( console.log )
      )
      .subscribe( (resp: any) => {
        const resultado = resp.data?.objects?.[0];
        if ( resultado ) {
          this.pais = resultado;
        }
      });
  }

}
