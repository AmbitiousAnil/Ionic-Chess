import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {


  userProfile = {
    "name":"",
    "rating":"",
    "profileImage":""
  }

  winloseHistory = {
    "won":0,
    "lost":0,
    "draw":0
  }

  winningHistory = {
    "amountWon":200,
    "wins":[{
      "opponentName":"",
      "type":"",
      "date":"",
      "profileImage1":""
    }]
  }

  "medals" = [{
    "medalReward":"",
    "name":"",
    "type":"",
    "dateUnlocked":"",
    "medalImage":"",
    "unlockFlag":false
  }]

  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

  private lineChart: Chart;

  private doughnutChart: Chart;

  openTab:string = "Friends";

  constructor() { }

  ngOnInit() {
  }
  

  ngAfterViewInit() {
    console.log(this.lineCanvas);
    let doughnutChartLabels = ['Win', 'Lose', 'Draw'];
    let doughnutChartData = [55, 25, 20];
    let lineChartLabels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    let lineChartData = [12, 19, 3, 5, 2, 3];
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: lineChartLabels,
        datasets: [
          {
            label: "Rating",
            data: lineChartData,
            fill: true,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        chartArea: {
          backgroundColor: 'rgba(20, 85, 85, 0.4)'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    if(index == 0 || index == 4 || index == 2){
                      return  value;
                    }else{
                      return '';
                    }
                  }
              },
              gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }
          }],
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                    console.log(index);
                    console.log(value);
                    if(index == 0 || index == 4 || index == 2){
                      return  value;
                    }else{
                      return '';
                    }
                  }
              },
              gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }   
          }]
				}
      }
    });


    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: doughnutChartLabels,
        datasets: [
          {
            label: "# of Votes",
            data: doughnutChartData,
            backgroundColor: [
              "rgba(135, 176, 62, 1)",
              "rgba(173, 45, 75, 1)",
              "rgba(225, 225, 225, 1)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1,
            weight:0.5
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }


SelectTab(tab: string) {
  this.openTab = tab;
}

}

