import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisInputComponent } from '../../components/pais-input/pais-input.component';
import { PaisTablaComponent } from '../../components/pais-tabla/pais-tabla.component';
import { PaisService } from '../../services/pais.service';
import { CountryObject } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-capital',
  standalone: true,
  imports: [CommonModule, PaisInputComponent, PaisTablaComponent],
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino : string = '';
  hayError: boolean = false;
  paises  : CountryObject[] = [];

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    if (!termino || termino.trim().length === 0) {
      this.hayError = false; // Se deja en false para no disparar la alerta roja si no hay texto
      this.paises = [];
      console.warn('El término de búsqueda está vacío.');
      return;
    }

    this.hayError = false;
    this.termino = termino.trim();

    this.paisService.buscarCapital(this.termino)
      .subscribe({
        next: (paises) => {
          const resultados = paises.data?.objects || []; 

          if (resultados.length === 0) {
            this.hayError = true;
            this.paises = [];
            console.warn('No se encontraron coincidencias para:', this.termino);
            return;
          }

          this.hayError = false;
          this.paises = resultados;
        },     
        error: (err) => {
          this.hayError = true;
          this.paises = [];
          console.error('Error en la petición:', err);
        }
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    // Aquí podrías implementar la lógica para mostrar sugerencias mientras el usuario escribe.
    console.log('Sugerencias para:', termino);
  }

} 