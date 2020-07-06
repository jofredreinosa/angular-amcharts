import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-halfpiechart',
  templateUrl: './halfpiechart.component.html',
  styleUrls: ['./halfpiechart.component.css']
})
export class HalfpiechartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // crear gráfico
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.background.fill = am4core.color("black");
    chart.background.opacity = 0.5

    // Datos a mostrar en el gráfico
    chart.data = [{
      "type": 'Hombres',
      "quantity": 300,
    }, {
      "type": 'Mujeres',
      "quantity": 385,
    }];
    
    // Configuración de Media dona
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;

    // Crear serie
    let series = chart.series.push(new am4charts.PieSeries());
    //Eje de valores (Y)
    series.dataFields.value = "quantity";
    // Eje de categorías (X)
    series.dataFields.category = "type";
    
    // Mostrar la etiqueta de serie si hay datos, si no, no se muestra nada
    // Configurar tamaño y formato de la etiqueta de serie y tooltip de serie
    series.labels.template.adapter.add("text", function (text, target) {
      if (target.dataItem && (target.dataItem.values.value.percent < 1 || target.dataItem.values.value.percent == undefined))
        return "";
      else
        return "[bold font-size:12px]{value.percent.formatNumber('#.')}%  ({value})";
    })

    // Personalizar colores para las series    
    series.colors.list = [
      am4core.color("#77cbf4"),
      am4core.color("#ef779d"),
    ];

    // Realizar una acción al hacer click en una serie
    series.slices.template.events.on("hit", function (ev) {
      alert('Click en ' + ev.target.dataItem.properties.category)
    });

    // Configurar la etiqueta de total general
    let label = chart.seriesContainer.createChild(am4core.Label);
    label.textAlign = "middle";
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.y = -45; // posicionar la etiqueta en el centro del gráfico

    // función para configurar estilo y fuente de la etiqueta del total general
    label.adapter.add("text", function (text, target) {
      return "[bold font-size:18px]" + series.dataItem.values.value.sum + "[/]\n[ font-size:15px] Total";
    })
    
    // Crear título del gráfico
    let chartTitle = chart.createChild(am4core.Label);
    chartTitle.text = "Participantes";
    chartTitle.fontSize = 24;
    chartTitle.isMeasured = false;
    chartTitle.align = "left";
    chartTitle.y = 80;

    // Crear leyenda del gráfico
    chart.legend = new am4charts.Legend();
  }

}
