import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PorPaisComponent } from '../../pages/por-pais/por-pais.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pais-input',
  standalone: true,
  imports: [FormsModule, CommonModule , RouterModule],
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent {
  
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  termino: string = '';
  buscar (termino: string) {
    this.onEnter.emit(termino);
  } 
}
