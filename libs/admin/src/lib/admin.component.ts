import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PoiActions, PoiEntity, PoiSelectors } from '@packt/poi';
import { Subscription } from 'rxjs';
import { AdminService } from './admin.service';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'packt-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy{
  private subscription: Subscription|undefined;

  data: ChartDataset[] = [{data: []}];

  labels: string[] = [];

  constructor(
    private store: Store,
    private adminService: AdminService
    ) { }

  ngOnInit(): void {
    this.subscription = this.store.select(PoiSelectors.getAllPoi).subscribe(
      pois => {
        this.buildChart(pois);
      }
    );

    this.store.dispatch(PoiActions.initPoi());
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  buildChart(pois: PoiEntity[]) {
    this.labels = pois.map(poi => poi.name);

    this.adminService.getStatistics(pois).forEach(el => this.data[0].data.push(el));
  }
}
