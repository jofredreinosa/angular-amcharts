import { Component, OnDestroy, NgZone, AfterViewInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_annotation from "@amcharts/amcharts4/plugins/annotation";

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnDestroy, AfterViewInit {
  
  private chart: am4charts.XYChart;
  public  years: number[] = [2016,2017,2018,2019,2020]; 
  public  selectedYear: number = 2016;
  public  showScroll: boolean = false;
  public  showGuides: boolean = false;
  private valueAxis: any;
  private data: any = [];
  private colors = ['#6abf09','#fcfc02','#fc0213']

  constructor(private zone: NgZone) { }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngAfterViewInit():void {
    this.zone.runOutsideAngular(() => {
      this.createChart();
    });
  }

  createChart():void {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
  
    chart.paddingRight = 40;

    chart.data = [];

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 10;
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.title.text = 'Tiempo';
    dateAxis.skipEmptyPeriods = true;
    dateAxis.dateFormats.setKey("day", "dd-MM-yy");
    dateAxis.periodChangeDateFormats.setKey("day", "dd-MM-yy");
    dateAxis.tooltipDateFormat = "dd-MM-yy";

    this.valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    this.valueAxis.tooltip.disabled = true;
    this.valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    chart.scrollbarX.visible = this.showScroll;

    let scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY = scrollbarY;
    chart.scrollbarY.visible = this.showScroll;

    let annotation = chart.plugins.push(new am4plugins_annotation.Annotation());
    
    this.chart = chart;
    this.setData();
  }

  setData():void {
    this.data = [];
    this.chart.data = this.data;
    let visits = 10;
    for (let i = 1; i < 10; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      this.data.push({ date: new Date(this.selectedYear, 0, i), name: "name" + i, value: visits });
    }
    this.chart.data = this.data;
  }

  viewScrollBar():void {
    this.chart.scrollbarX.visible = !this.showScroll;
    this.chart.scrollbarY.visible = !this.showScroll;
  }

  viewGuides(): void {
    this.showGuides = !this.showGuides;
    if (  this.showGuides ) {
      let val = 13;
      for (let index = 0; index < 3; index++) {
        let index = Math.floor(Math.random() * 3);
        let color = this.colors[index];
        var axisRange = this.valueAxis.axisRanges.create();
        axisRange.value = val;
        axisRange.grid.stroke = am4core.color(color);
        axisRange.grid.strokeWidth = 1.2;
        axisRange.grid.strokeOpacity = 1;
        axisRange.label.inside = true;
        axisRange.label.text = "Guía " + axisRange.value;
        axisRange.label.fill = axisRange.grid.stroke;
        axisRange.label.fontSize = 12;
        axisRange.label.verticalCenter = "bottom";
        val += 5;
      }
    }
    else {
      this.valueAxis.axisRanges.clear();
    }
  }

}
