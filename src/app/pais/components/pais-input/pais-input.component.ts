import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PorPaisComponent } from '../../pages/por-pais/por-pais.component';


@Component({
  selector: 'app-pais-input',
  standalone: true,
  imports: [FormsModule, CommonModule , RouterModule],
  templateUrl: './pais-input.component.html',
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = '';
  
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(valor => {
        this.onDebounce.emit(valor);
      });
  }

  buscar (termino: string) {
    this.onEnter.emit(termino);
  } 

  teclaPresionada () {
    
  }

  
}
