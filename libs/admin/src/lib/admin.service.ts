import { Injectable } from '@angular/core';
import { PoiEntity } from '@packt/poi';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  getStatistics(pois: PoiEntity[]): number[] {
    return pois.map(poi => {
      const stat = localStorage.getItem('tour-' + poi.id) ?? 0;

      return +stat;
    });
  }
}
