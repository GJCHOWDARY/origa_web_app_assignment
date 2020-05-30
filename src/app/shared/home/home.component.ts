import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
import { pluck } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
const BACKEND_USER_URL = environment.apiUrl;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Name', 'Username', 'City', 'Pincode', 'Company Name'];
  userDate: any = [];
  chartData: any = [{ name: 'Latitude > 0', y: 0 }, { name: 'Latitude < 0', y: 0 }, { name: 'Longitude > 0', y: 0 }, { name: 'Longitude < 0', y: 0 }];
  isLoading: Boolean = true;
  Count: number;
  highcharts = Highcharts;

  chartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'User Location Info'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}'
        },
        showInLegend: true
      }
    },
    series: []
  };

  constructor(private http: HttpClient) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.http.get(BACKEND_USER_URL).subscribe((res: any) => {
      this.userDate = new MatTableDataSource(res)
      this.userDate.sort = this.sort;
      this.Count = (res.length / 100) * 100;
      const data = res.map((x, val) => {
        if (x.address && x.address.geo) {
          let lat = Number(x.address.geo.lat);
          let lng = Number(x.address.geo.lng);
          if (lat > 0) {
            this.chartData[0].y += 1;
          } else {
            this.chartData[1].y += 1;
          }
          if (lng > 0) {
            this.chartData[2].y += 1;
          } else {
            this.chartData[3].y += 1;
          }
        }
      })
      this.chartOptions.series.push({
        name: 'Location Info',
        colorByPoint: true,
        data: this.chartData
      })
      this.isLoading = false;
      console.log(res, '----', this.chartData)
    },
      error => {
      }
    );
  } a

}
