import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [LoaderComponent, BarChartComponent],
  imports: [CommonModule, MatProgressSpinnerModule, NgApexchartsModule],
  exports: [LoaderComponent],
})
export class ComponentsModule {}
