import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private _cities = signal<City[]>([]);

  // Expose read-only signal
  readonly cities = this._cities.asReadonly();

  addAll(cities: City[]) {
    this._cities.set(cities);
  }

  addOne(city: City) {
    this._cities.set([...this._cities(), city]);
  }

  deleteOne(id: number) {
    this._cities.set(this._cities().filter((s) => s.id !== id));
  }
}
