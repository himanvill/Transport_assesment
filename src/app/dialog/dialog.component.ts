import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  chart!: Chart;
  
  data:any[] = []
  constructor(  @Inject(MAT_DIALOG_DATA) public showData: any 
  ) { }
  ngOnInit(): void {
    this.data = [this.showData.data.quarter1,this.showData.data.quarter2,this.showData.data.quarter3]

    this.init();
    
  }
  init() {
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: `Quarter Revenue(Rs.) for customer ${this.showData.data.company_name}`
      },
      credits: {
        enabled: false
      },
      
      series: [{
        name: `Quarter Revenue (0/March-May, 1/Jun-Aug, 2/ Sep-Nov) Total Revenue ${this.showData.data.total_rev}`,
        type:'line',  
        data: this.data
      }]
    });
    
    this.chart = chart;
    
    

    chart.ref$.subscribe(console.log);
  }
  // add point to chart serie
  add() {
    this.chart.addPoint([3,4]);
  }

}
