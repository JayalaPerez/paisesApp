import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

import { PaisTablaComponent } from '../../components/pais-tabla/pais-tabla.component';

import { PaisService } from '../../services/pais.service';
import { CountryObject } from '../../interfaces/pais.interfaces';
import { PaisInputComponent } from '../../components/pais-input/pais-input.component';

@Component({
  selector: 'app-por-pais',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, PaisTablaComponent, PaisInputComponent],
  templateUrl: './por-pais.component.html'
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: CountryObject[] = [];

  constructor( private paisService: PaisService ) { }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (paises) => {
          const resultados = paises.data?.objects || [];

          if (resultados.length === 0) {
            this.hayError = true;
            this.paises = [];
            console.warn('No se encontraron coincidencias para:', this.termino);
            return;
          }

          // Si encuentra resultados:
          this.hayError = false;
          this.paises = resultados;

          console.log(`Se encontraron ${resultados.length} países para "${this.termino}":`);
          
          // Muestra la lista completa formateada en tabla en la consola:
          console.table(resultados.map((pais: any) => ({
            Nombre: pais.names.common,
            Bandera: pais.flag.url_png,
            Código: pais.codes.alpha_2,
            Población: pais.population,
            Capital: pais.capitals?.[0]?.name || pais.capitals?.[0] || 'N/A'
          })));
        },
        error: (err) => {
          this.hayError = true;
          this.paises = [];
          console.error('Error en la petición:', err);
        }
      });
  }
}
