import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CountryObject } from '../../interfaces/pais.interfaces';



@Component({
  selector: 'app-pais-tabla',
  standalone: true,
  imports: [ FormsModule, CommonModule , RouterModule],
  templateUrl: './pais-tabla.component.html',
})
export class PaisTablaComponent {

  @Input() paises: CountryObject[] = [];
}
