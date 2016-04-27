'use strict';
import {Component, Input, OnInit} from 'angular2/core'

@Component({
  selector: 'health-counts-2',
  templateUrl: 'app/scripts/modules/core/healthCounts/healthCounts2.html'
})

export class HealthCount implements OnInit{
  @Input() container: any = {};
  legendPlacement: string = "top";
  healthPercent: any;
  healthPercentLabel: any;
  healthStatus: any;


  ngOnInit() {
    console.log('initializing the heath count component');
    this.calculateHealthPercent()
  }


  calculateHealthPercent() {
    var up = this.container.up || 0;
    var down = this.container.down || 0;
    var unknown = this.container.unknown || 0;
    var total = up + down + unknown;
    var healthRatio  = total ? (up * 100 / total)  : 0;

    this.healthPercent = healthRatio;
    this.healthPercentLabel = total ? '%' : '';
    this.healthStatus = healthRatio === 100 ? 'healthy'
      : healthRatio < 100 && healthRatio > 0 ? 'unhealthy'
      : healthRatio === 0 ? 'dead' : 'disabled';

  }
}


