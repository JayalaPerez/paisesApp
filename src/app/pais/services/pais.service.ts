import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = '/api-paises';

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country> {
    const url = `${this.apiUrl}/name?q=${encodeURIComponent(termino.trim())}`;
    return this.http.get<Country>(url);
  }

  buscarCapital(termino: string): Observable<Country> {
    const url = `${this.apiUrl}/capitals/${encodeURIComponent(termino.trim())}`;
    return this.http.get<Country>(url);
  }

  verPaisPorCodigo(codigo: string): Observable<Country[]> {
    const url = `${this.apiUrl}/codes.alpha_2/${encodeURIComponent(codigo.trim())}`;
    return this.http.get<Country[]>(url);
  }
}