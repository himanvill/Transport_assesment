import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { LoginService } from '../service/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';



export interface RevenueInterface {
  company_name: string;
  email: string;
  quarter1: number;
  quarter2: number;
  quarter3: number;
  total_rev:number;
  quarter_avg:number
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data!: any[];
  displayedColumns: string[] = ['company_name', 'email', 'quarter1', 'quarter2','quarter3','total_rev', 'quarter_avg', 'showChart' ];
  dataSource = new MatTableDataSource<RevenueInterface>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private revenue:LoginService,  private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.revenue.getRevenueData().subscribe(result=>{
      
      result.forEach( (el: any)=>{
      
        let total = el.quarter1+el.quarter2+el.quarter3
        let avg = Math.floor(total/3)
      Object.assign(el,{total_rev:total },{quarter_avg: avg})
      })
      this.data = result
      this.dataSource.data = result
    },err=>{
      this._snackBar.open(err.error.message, "ok", {
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      
    })
  }
  openDialog(i:number) {
      let dialogData = this.data[i]
    this.dialog.open(DialogComponent,  {
      data: {
        data: dialogData
      }, 
      height:'70%',
      width:'60%' 
     
    });
  }
}


